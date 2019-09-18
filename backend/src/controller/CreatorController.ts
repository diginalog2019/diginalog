import {Category} from "../entity/Category";
import {Creator} from "../entity/Creator";
import {getConnection} from "typeorm";
import {Product} from "../entity/Product";
import {Hashtag} from "../entity/Hashtag";
import {ResultVo} from "../vo/ResultVo";
import {s3} from "../config/aws";

export class CreatorController {
    /* Kwon Na Hyun : 2019.09.01 && 2019.09.15 ------------------------------------------*/
    static uploadFile = async (req, res) => {
        console.log(req.file);
        //let products = await getConnection().getRepository(Product).find(options);
        /*"products[products.length()-1].PID"*/
        // s3 upload configuring parameters
        const params = {
            Bucket: 'diginalog-s3',
            Body: req.file.buffer,
            Key: "P_File/" + req.file.originalname,
            ContentType: req.file.mimetype,
            ACL: 'private'
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
    }
    static uploadDetailIMG = async (req, res) => {
        console.log(req.file);
        //let products = await getConnection().getRepository(Product);
        //let total = await getConnection().getRepository(Product).count();
        /*"products[products.length()-1].PID"*/
        // s3 upload configuring parameters
        const params = {
            Bucket: 'diginalog-s3',
            Body: req.file.buffer,
            Key: "P_DetailIMG/" + 2,
            ContentType: req.file.mimetype,
            ACL: 'private'
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
        //result.total = total;
        res.send(result);
    }
    static uploadTitleIMG = async (req, res) => {
        console.log(req.file);
        let products = await getConnection().getRepository(Product);
        //let total = SELECT COUNT(*) FROM products;

        //const options = {where:[{cid}],take:1};
        //const c = await getConnection().getRepository(Creator).findOne(options);

        //products[count(*)-1].PID
        // s3 upload configuring parameters
        const params = {
            Bucket: 'diginalog-s3',
            Body: req.file.buffer,
            Key: "P_TitleIMG/" + req.file.originalname,
            ContentType: req.file.mimetype,
            ACL: 'private'
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
    }
    /* Kwon Na Hyun : 2019.09.01 fin------------------------------------------*//*
    static registerProduct = async (req, res) => {
        const {CID, C_ID, C_Nickname, C_Email, C_Page, products} = req.body;

        const newCreator = new Creator();
        //newCreator.CID = CID;
        newCreator.C_ID = C_ID;
        newCreator.C_Nickname = C_Nickname;
        //newCreator.C_Email = C_Email;
        //newCreator.C_Page = C_Page;

        await getConnection().getRepository(Creator).save(newCreator);


        if (products && products.length > 0) {
            const newProducts = products.map(product => {
                const p = new Product();
                //p.PID = product.PID;
                p.P_Name = product.P_Name;
                p.P_Date = product.P_Date;
                p.P_Price = product.P_Price;
                p.P_Extension = product.P_Extension;
                p.P_Size = product.P_Size;
                p.P_File = product.P_File;
                //p.P_StarPoint = product.P_StarPoint;
                p.P_DetailIMG = product.P_DetailIMG;
                p.P_TitleIMG = product.P_TitleIMG;
                p.creator = newCreator;  // relation key
                return p;
            })
            // bulk insert
            await getConnection().createQueryBuilder().insert().into(Product).values(newProducts).execute();
        }

        res.send(new ResultVo(0, 'success'));
    }

*/
    static registerProduct = async (req, res) => {
    const {productName, date, price, extension, size, starPoint, file, detailIMG, titleIMG, cid} = req.body;
        const newProduct = new Product();
        //newProduct.PID = PID;
        newProduct.P_Name = productName;
        newProduct.P_Date = date;
        newProduct.P_Price = price;
        newProduct.P_Extension = extension;
        newProduct.P_Size = size;
        newProduct.P_StarPoint = 0;
        newProduct.P_DetailIMG =  2;
        newProduct.P_TitleIMG = 1;
        newProduct.P_File = 0;


        if (cid>0) {
            const options = {where:[{cid}],take:1};
            const c = await getConnection().getRepository(Creator).findOne(options);
            newProduct.creator = c;
            await getConnection().getRepository(Product).save(newProduct);
        }

        res.send(new ResultVo(0, 'success'));
    }


}

/* Kwon Na Hyun : 2019.09.13 fin------------------------------------------*/