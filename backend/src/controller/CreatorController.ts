import {Category} from "../entity/Category";
import {Creator} from "../entity/Creator";
import {getConnection} from "typeorm";
import {Product} from "../entity/Product";
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
    static registerProduct = async (req, res) => {
        const {productName, date, price, extension, size, starPoint, file, detailIMG, titleIMG, cid, cate_id} = req.body;
        const newProduct = new Product();
        //newProduct.PID = PID;
        newProduct.P_Name = productName;
        newProduct.P_Date = date;
        newProduct.P_Price = price;
        newProduct.P_Extension = extension;
        newProduct.P_Size = size;
        newProduct.State = -1;
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

        if (cate_id>0) {
            const options = {where:[{cate_id}],take:1};
            const c = await getConnection().getRepository(Category).findOne(options);
            newProduct.category = c;
            await getConnection().getRepository(Product).save(newProduct);
        }

        res.send(new ResultVo(0, 'success'));
    }
    /* Kwon Na Hyun : 2019.09.13 fin------------------------------------------*/
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
        console.log(products2);
        const result = new ResultVo(0, "success");
        result.data = products2;
        result.total = total;
        res.send(result);
    }
    static getAllCreatorsInfo = async (req, res) => {
        const options = {};
        options['order'] = {CID: 'ASC'};

        let creators = await  getConnection().getRepository(Creator).find(options);
        const total = await getConnection().getRepository(Product).count();

        console.log(creators);
        const result = new ResultVo(0,"success");
        result.data = creators;
        result.total = total;
        res.send(result);
    }
    static getCreatorProduct = async (req,res) => {
        console.log(req.params);
        const {creatorCID} = req.params;

        const options = {relations: ["creator"], where: [{creatorCID}]};

        const products = await getConnection().getRepository(Product).find(options);
        res.send(products);
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

