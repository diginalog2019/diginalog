import {Category} from "../entity/Category";
import {Creator} from "../entity/Creator";
import {getConnection} from "typeorm";
import {Product} from "../entity/Product";
import {File} from "../entity/File";
import {ResultVo} from "../vo/ResultVo";
import {s3} from "../config/aws";

export class CreatorController {
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
            Key: "P_DetailIMG/" + req.file.originalname,
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

        const params = {
            Bucket: 'diginalog-s3',
            Body: req.file.buffer,
            Key: "P_TitleIMG/" + req.file.originalname ,
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
    static registerProduct = async (req, res) => {
        const {productName, date, price, extension, size, files, detailIMG, titleIMG, cid, cate_id} = req.body;
        const newProduct = new Product();
        //newProduct.PID = PID;
        newProduct.P_Name = productName;
        newProduct.P_Date = new Date();
        newProduct.P_Price = price;
        newProduct.P_Size = size;
        newProduct.State = -1;
        newProduct.P_StarPoint = 0;

        await getConnection().getRepository(Product).save(newProduct);

        if (cid>0) {
            const options = {where:[{cid}],take:1};
            const c = await getConnection().getRepository(Creator).findOne(options);
            newProduct.creator = c;
            await getConnection().getRepository(Product).save(newProduct);
        }

        if (cate_id>0) {
            const options = {where:[{cate_id}],take:1};
            const c = await getConnection().getRepository(Category).findOne(options);
            newProduct.category = c;
            await getConnection().getRepository(Product).save(newProduct);
        }
        if (files && files.length > 0) {
            const newFiles = files.map(file => {
                const f = new File();
                //f.F_Extension = req.file.originalname.slice((req.file.originalname.lastIndexOf('.')-1 >>> 0));
                f.F_Extension = "png";
                f.F_Name = req.file.originalname;
                //f.F_Type = 타입을 따로 저장하지 않고 이름 마지막에 숫자로 표시되면 안되나? 0,1,2
                f.product = newProduct;
                return f;
            })
            // bulk insert
            await getConnection().createQueryBuilder().insert().into(File).values(newFiles).execute();
        }

        res.send(new ResultVo(0, 'success'));
    }


    /* Kwon Na Hyun fin------------------------------------------*/
    /*jua*/
    static getAllCreators = async (req, res) => {
        const {start_index, page_size} = req.query;

        const options = {};
        /*options['select'] = ["CID", "C_Email","C_Page","C_Nickname"];*/
        options['order'] = {creatorCID: 'ASC'};
        if (start_index) {
            options['skip'] = start_index;
        }
        if (page_size) {
            options['take'] = page_size;
        }

        let products = await getConnection().getRepository(Product).find(options);

        const total = await getConnection().getRepository(Product).count();

        const creators = await getConnection().getRepository(Creator).find();

        const products2 = products.map(product => {
            let product2 = {CreatorNick:creators[(product.creatorCID-1)].C_Nickname, ...product};
            return product2;
        });
        const result = new ResultVo(0, "success");
        result.data = products2;
        result.total = total;
        res.send(result);
    }
    static getAllCreatorsInfo = async (req, res) => {
        let creators = await  getConnection().getRepository(Creator).find();

        console.log(creators);
        const result = new ResultVo(0,"success");
        result.data = creators;
        res.send(result);
    }
    static getCreatorProduct = async (req,res) => {
        const {start_index, page_size} = req.query;
        const {creatorCID} = req.params;

        const options = {};
        /*options['select'] = ["CID", "C_Email","C_Page","C_Nickname"];*/
        options['order'] = {creatorCID: 'ASC'};
        if (start_index) {
            options['skip'] = start_index;
        }
        if (page_size) {
            options['take'] = page_size;
        }

        let products = await getConnection().getRepository(Product).find(options);

        const creators = await getConnection().getRepository(Creator).find();

        let products2 = products.filter(product => {
            return product.creatorCID == creatorCID;
        });

        const result = new ResultVo(0, "success");
        result.data = products2;
        result.total = products2.length;
        res.send(result);
    }
    static getSingleProduct = async(req,res) => {
        console.log(req.query);
        const {id} = req.query;

        const options = {where: {PID: id}};
        let product = await getConnection().getRepository(Product).findOne(options);
        const category = await getConnection().getRepository(Category).findOne({where:{Cate_ID:product.categoryCateID}});
        const creator = await getConnection().getRepository(Creator).findOne({where:{CID:product.creatorCID}});

        product = {...product,category,creator};
        const result = new ResultVo(0,"success");
        result.data = product;
        res.send(result);

    }
}

