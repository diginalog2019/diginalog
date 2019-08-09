/*import {Category} from "../entity/Category";
import {getConnection} from "typeorm";
import {Product} from "../entity/Product";
import {ResultVo} from "../vo/ResultVo";

export class AdminController {
    static addHero = async (req, res) => {
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
    static addHero = async (req, res) => {
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