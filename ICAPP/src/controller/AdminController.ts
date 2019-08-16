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

    // Shi Ha Yeon : 2019.08.14 Wed----------------------------------------------------------------------
    static getAllProducts = async (req, res) => {
        const {start_index, page_size} = req.query;

        const options = {};
       /* options['select'] = ["PID", "P_Name", "P_Date", "P_Price", "P_Extension",
            "P_Size","P_StarPoint","P_DetailIMG",
            "P_TitleIMG","Cate_ID","CID"];*/
        options['select'] = ["PID", "P_Name", "P_Price", "P_Extension", "P_StarPoint",
            "P_TitleIMG"];
        options['order'] = {PID: 'DESC'};
        if (start_index) {
            options['skip'] = start_index;
        }
        if (page_size) {
            options['take'] = page_size;
        }

        const products = await getConnection().getRepository(Product).find(options);

        const total = await getConnection().getRepository(Product).count();

        const result = new ResultVo(0, "success");
        result.data = products;
        result.total = total;
        res.send(result);
    }
    // Shi Ha Yeon : Fin ---------------------------------------------------------------------
    static addProduct = async (req, res) => {
        const {PID, P_Name, P_Date, P_Price, P_Extension,
            P_Size,P_StarPoint,P_DetailIMG, P_TitleIMG,Cate_ID} = req.body;

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
        newProduct.category = Cate_ID;

        //await getConnection().getRepository(Product).save(newProduct);

        if (Cate_ID && Cate_ID.length > 0) {
            const newCategory = Cate_ID.map(category => {
                const c = new Category();
                c.Cate_ID = category.Cate_ID;
                c.Cate_Name = category.Cate_Name;
                c.depth = category.depth;
                c.upper_cate_ID = category.upper_cate_ID;
                //c.products = [newProduct]; // relation key
                newProduct.category = c;

                return c;
            })
            // bulk insert
            await getConnection().getRepository(Product).save(newProduct);
            await getConnection().createQueryBuilder().insert().into(Category).values(newCategory).execute();
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
}