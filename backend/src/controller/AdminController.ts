/*import {Category} from "../entity/Category";
import {getConnection} from "typeorm";
import {Product} from "../entity/Product";
import {ResultVo} from "../vo/ResultVo";

export class AdminController {
    static addProduct = async (req, res) => {
        const {cate_id, cate_name, depth, upper_cate_ID, products} = req.body;

        const newCategory = new Category();
        newCategory.Cate_ID = cate_id;
        newCategory.Cate_Name = cate_name;
        newCategory.depth = depth;
        newCategory.upper_cate_ID = upper_cate_ID;

        await getConnection().getRepository(Category).save(newCategory);

        if (products && products.length > 0) {
            const newPowers = products.map(product => {
                const p = new Product();
                p.P_Name = product.P_Name;
                p.PID = product.PID;
                p.category = newCategory;  // relation key
                return p;
            })
            // bulk insert
            await getConnection().createQueryBuilder().insert().into(Product).values(newPowers).execute();
        }

        res.send(new ResultVo(0, 'success'));
    }
}*/

import {Category} from "../entity/Category";
import {Creator} from "../entity/Creator";
import {getConnection} from "typeorm";
import {Product} from "../entity/Product";
import {ResultVo} from "../vo/ResultVo";
import {s3} from "../config/aws";

export class AdminController {
    // Shi Ha Yeon : 2019.09.01 ----------------------------------------------------------------------
    static getAllProducts = async (req, res) => {
        const {start_index, page_size} = req.query;

        const options = {};
        // 관리자는 제품의 모든 정보를 다 볼 수 있으므로 select 조건빼고 모두 가져오게 함
        /*options['select'] = ["PID", "P_Name", "P_Date", "P_Price", "P_Extension",
            "P_Size","P_StarPoint","P_DetailIMG",
            "P_TitleIMG","categoryCateID", "creatorCID"];*/

        options['order'] = {PID: 'DESC'};
        if (start_index) {
            options['skip'] = start_index;
        }
        if (page_size) {
            options['take'] = page_size;
        }

        let products = await getConnection().getRepository(Product).find(options);

        const total = await getConnection().getRepository(Product).count();

        const categorys = await getConnection().getRepository(Category).find();

        const creators = await getConnection().getRepository(Creator).find();

        const products2 = products.map(product => {
            // Shi Ha Yeon : 2019.09.14 -----------------------------------------------
            let state = '';
            switch(product.State){
                case -1 : state = "미승인";
                    break;
                case 0 : state = "심사중";
                    break;
                case 1: state="승인";
                    break;
            }
            let date = product.P_Date.toLocaleString();
            let product2 = {StateName:state,
                Date:date,
                CreatorName:creators[(product.creatorCID-1)].C_Nickname,
                CateName:categorys[(product.categoryCateID-1)].Cate_Name,
                ...product};
            return product2;
            // Shi Ha Yeon : 2019.09.14 Fin--------------------------------------------
        });

        const result = new ResultVo(0, "success");
        result.data = products2;
        result.total = total;
        res.send(result);
    }
    // Shi Ha Yeon : 2019.09.01 11:31 Fin ---------------------------------------------------------------------
    static addProduct = async (req, res) => {
        const {PID, P_Name, P_Date, P_Price, P_Extension,
            P_Size,P_StarPoint,P_DetailIMG, P_TitleIMG, Cate_ID} = req.body;

        const newProduct = new Product();
        newProduct.PID = PID;
        newProduct.P_Name = P_Name;
        newProduct.P_Date = P_Date;
        newProduct.P_Price = P_Price;
        newProduct.P_Extension = P_Extension;
        newProduct.P_Size = P_Size;
        newProduct.P_StarPoint = P_StarPoint;
        newProduct.P_DetailIMG = P_DetailIMG;
        newProduct.P_TitleIMG = P_TitleIMG ;

        if (Cate_ID>0) {
            const options = {where:[{Cate_ID}],take:1};
            const c = await getConnection().getRepository(Category).findOne(options);
            newProduct.category = c;
            await getConnection().getRepository(Product).save(newProduct);
        }

        res.send(new ResultVo(0, 'success'));
    }
    static addCategory = async (req, res) => {
        const {cate_id, cate_name, depth, upper_cate_ID, products} = req.body;

        const newCategory = new Category();
        newCategory.Cate_ID = cate_id;
        newCategory.Cate_Name = cate_name;
        newCategory.depth = depth;
        newCategory.upper_cate_ID = upper_cate_ID;

        await getConnection().getRepository(Category).save(newCategory);

        if (products && products.length > 0) {
            const newPowers = products.map(product => {
                const p = new Product();
                p.P_Name = product.P_Name;
                p.PID = product.PID;
                p.category = newCategory;  // relation key
                return p;
            })
            // bulk insert
            await getConnection().createQueryBuilder().insert().into(Product).values(newPowers).execute();
        }

        res.send(new ResultVo(0, 'success'));
    }

    static addPhoto = async (req, res) => {
        console.log(req.file);
        // s3 upload configuring parameters

        const params = {
            Bucket: 'diginalog-s3',
            Body : req.file.buffer,
            Key : "photo/" + Date.now() + "_" + req.file.originalname,
            ContentType: req.file.mimetype,
            ACL: 'public-read-write'
        };

        let response, result;
        try {
            response = await s3.upload(params).promise();
            console.log(response);
        } catch (err) {
            console.log(err);
            result = new ResultVo(500, 'S3 error');
            res.send(result);
        }

        result = new ResultVo(0, 'success');
        result.data = response.Location;

        res.send(result);
        //res.send('success');
    }

    static modifyCategory = async (req, res) => {
        const {cate_id, cate_name, depth, upper_cate_ID, products} = req.body;

        const updateOption = {};
        if (cate_id) updateOption['Cate_ID'] = cate_id;
        if (cate_name) updateOption['Cate_Name'] = cate_name;
        if (depth) updateOption['depth'] = depth;
        if (upper_cate_ID) updateOption['upper_cate_ID'] = upper_cate_ID;

        // Hero update
        await getConnection().createQueryBuilder().update(Category)
            .set(updateOption)
            .where("Cate_ID = :cate_id", {cate_id})
            .execute()
        // await getConnection().createQueryBuilder().update(Category)
        //     .set({
        //         "Cate_ID" : cate_id,
        //         "Cate_Name":cate_name,
        //         "depth":depth,
        //         "upper_cate_ID" : upper_cate_ID
        //     })
        //     .where("Cate_ID = :cate_id", {cate_id})
        //     .execute()
        //delete old powers
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Product)
            .where("categoryCateID = :cate_id", { cate_id })
            .execute();

        // insert powers
        if (products && products.length > 0) {
            const category = new Category();
            category.Cate_ID = cate_id;
            const newProducts = products.map(product => {
                const p = new Product();
                p.P_Name = product.P_Name;
                p.PID = product.PID;
                p.category = category;  // relation key
                return p;
            })
            // bulk insert
            await getConnection().createQueryBuilder().insert().into(Product).values(newProducts).execute();
        }
        const result = new ResultVo(0, 'success');
        res.send(result);
    }

    static modifyCreator = async (req, res) => {
        const {id, email, nick, page, products} = req.body;

        const updateOption = {};
        if (id) updateOption['CID'] = id;
        if (email) updateOption['C_Email'] = email;
        if (nick) updateOption['C_Nickname'] = nick;
        if (page) updateOption['C_Page'] = page;

        // Hero update
        await getConnection().createQueryBuilder().update(Creator)
            .set(updateOption)
            .where("CID = :id", {id})
            .execute()

        // delete old powers
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Product)
            .where("creatorCID = :id", { id })
            .execute();

        // insert powers
        if (products && products.length > 0) {
            const creator = new Creator();
            creator.CID = id;
            const newProducts = products.map(product => {
                const p = new Product();
                p.PID = product.PID;
                p.P_Name = product.P_Name;
                p.creator = creator;  // relation key
                return p;
            })
            // bulk insert
            await getConnection().createQueryBuilder().insert().into(Product).values(newProducts).execute();
        }
        const result = new ResultVo(0, 'success');
        res.send(result);
    }
    static removeCategory = async (req, res) => {
        console.log(req);
        const {id} = req.query;

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Category)
            .where("Cate_ID = :id", { id })
            .execute();
        const result = new ResultVo(0, 'success');
        res.send(result);
    }
    static removeCreator = async (req, res) => {
        console.log(req);
        const {id} = req.query;

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Creator)
            .where("CID = :id", { id })
            .execute();

        const result = new ResultVo(0, 'success');
        res.send(result);
    }

    // Shi Ha Yeon : 2019.09.01 11:18 ----------------------------------------------------------------------
    static getWaitingProducts = async (req, res) => {
        const {start_index, page_size} = req.query;
        const options = {};
        options['order'] = {P_Date: 'ASC'};
        if (start_index) {
            options['skip'] = start_index;
        }
        if (page_size) {
            options['take'] = page_size;
        }

        const state = -1;
        let products = await getConnection().createQueryBuilder().select()
            .from(Product,"product").where("State = :state", {state})
            .execute();

        const total = Object.keys(products).length;
        const categorys = await getConnection().getRepository(Category).find();

        const creators = await getConnection().getRepository(Creator).find();

        const products2 = products.map(product => {
            // Shi Ha Yeon : 2019.09.14 -----------------------------------------------
            let state = '';
            switch(product.State){
                case -1 : state = "미승인";
                    break;
                case 0 : state = "심사중";
                    break;
                case 1: state="승인";
                    break;
            }
            let date = product.P_Date.toLocaleString();
            let product2 = {StateName:state,
                Date:date,
                CreatorName:creators[(product.creatorCID-1)].C_Nickname,
                CateName:categorys[(product.categoryCateID-1)].Cate_Name,
                ...product};
            return product2;
            // Shi Ha Yeon : 2019.09.14 Fin--------------------------------------------
        });

        const result = new ResultVo(0, "success");
        result.data = products2;
        result.total = total;
        res.send(result);
    }
    static setState = async (req, res) => {
        const {pid, state} = req.body;
        const updateOption = {};
        if (state) updateOption['State'] = state;

        await getConnection().createQueryBuilder().select()
            .from(Product,"product").where("PID = :pid", {pid})
            .execute();

        await getConnection().createQueryBuilder().update(Product)
            .set(updateOption)
            .where("PID = :pid", { pid })
            .execute();

        const result = new ResultVo(0, 'success');
        res.send(result);
    }
    static removeProduct = async (req, res) => {
        console.log(req);
        const {id} = req.query;
        const options = {relation:["products"], where: [{id}], take: 1};
        const product = await getConnection().getRepository(Product).findOne(options);

        // 삭제할 파일 개수 : 나중에 반복문으로 여러개의 파일 삭제 처리해야함
        const titleNum = product.P_TitleIMG;
        const detailNum = product.P_DetailIMG;
        const fileNum = product.P_File;

        // s3 upload configuring parameters
        let params = {
            Bucket: 'diginalog-s3',
            Key: "P_TitleIMG/" + id + ".png"
        };
        let response, result;
        try {
            response = await s3.deleteObject(params).promise();
            console.log(response);
        } catch (err) {
            console.log(err);
            result = new ResultVo(500, 'S3 error');
            res.send(result);
        }

        params = {
            Bucket: 'diginalog-s3',
            Key: "P_DetailIMG/" + id + ".png",
        };
        try {
            response = await s3.deleteObject(params).promise();
            console.log(response);
        } catch (err) {
            console.log(err);
            result = new ResultVo(500, 'S3 error');
            res.send(result);
        }

        params = {
            Bucket: 'diginalog-s3',
            Key: "P_File/" + id + ".pdf",
        };
        try {
            response = await s3.deleteObject(params).promise();
            console.log(response);
        } catch (err) {
            console.log(err);
            result = new ResultVo(500, 'S3 error');
            res.send(result);
        }

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Product)
            .where("PID = :id", { id })
            .execute();

        const result2 = new ResultVo(0, 'success');
        res.send(result2);
    }
    static getAllCreators = async (req, res) => {
        const {start_index, page_size} = req.query;
        const options = {};

        options['order'] = {CID: 'DESC'};
        if (start_index) {
            options['skip'] = start_index;
        }
        if (page_size) {
            options['take'] = page_size;
        }

        let creators = await getConnection().getRepository(Creator).find(options);

        const total = await getConnection().getRepository(Creator).count();

        const result = new ResultVo(0, "success");
        result.data = creators;
        result.total = total;
        res.send(result);
    }
    // Shi Ha Yeon : 2019.09.16 Fin ----------------------------------------------------------------------
}