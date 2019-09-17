import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {ResultVo} from "../vo/ResultVo";
import {Category} from "../entity/Category";
import {Product} from "../entity/Product";
import {Creator} from "../entity/Creator";
import {s3} from "../config/aws";

export class UserController {
    // Kim Ju Hui : 2019.09.13 Sat--------------------------------------------
    static getProduct = async (req, res) => {

        console.log(req.query);
        const {id} = req.query;

        console.log("pid = "+id);

        const options = {relation:["category"], where: {PID: id}};
        let product = await getConnection().getRepository(Product).findOne(options);

        const category = await getConnection().getRepository(Category).findOne({where:{Cate_ID:product.categoryCateID}});
        const creator = await getConnection().getRepository(Creator).findOne({where:{CID:product.creatorCID}});

        product = {...product,category,creator};

        const result = new ResultVo(0,"success");
        result.data = product;
        res.send(result);
    }
    // Kim Ju Hui : 2019.09.13 Sat Fin-------------------------------------------
    // Kim Ju Hui : 2019.08.30 Fri-------------------------------------------
    static getAllProduct = async(req,res) => {

        const {start_index, page_size} = req.query;

        const options = { relation:["category"],where: { State: 1 }};

        options['select'] = ["PID", "P_Name", "P_Price", "P_StarPoint", "P_TitleIMG","categoryCateID","creatorCID"];

        if (start_index) {
            options['skip'] = start_index;
        }
        if (page_size) {
            options['take'] = page_size;
        }

        const products = await getConnection().getRepository(Product).find(options);

        // Shi Ha Yeon : 2019.08.30 Fri-----------------------------------------------------------------------
        const categorys = await getConnection().getRepository(Category).find();
        // Kim Ju Hui : 2019.08.30 18:24 Fri-----------------------------------------------------------------------
        const creators = await getConnection().getRepository(Creator).find();
        const total = products.length;
        const products2 = products.map(product => {
            let product2 = {CreatorName: creators[(product.creatorCID-1)].C_Nickname,CateName:categorys[(product.categoryCateID-1)].Cate_Name, ...product};
         // Kim Ju Hui : 2019.08.30 18:24 Fin----------------------------------------------------------------------
            return product2;
        });

        // Shi Ha Yeon : 2019.08.30 Fri Fin ---------------------------------------------------------------------

        const result = new ResultVo(0,"success");

        result.data = products2;
        result.total = total;
        res.send(result);
    }
    // Kim Ju Hui : 2019.08.30 Fri Fin-------------------------------------------
    // Kim Ju Hui : 2019.09.17 Tue-------------------------------------------
    static downloadFile = async(req,res) => {

        console.log(req.query);
        const {id, extension} = req.query;

        //const file = require('fs').createWriteStream('test.png');

        // let prefix = 'P_File/';
        // let key = '1.png';

        console.log('P_File/'+id+'.'+extension);

        let getParams = {
            Bucket : 'diginalog-s3',
            Key : 'P_File/'+id+'.'+extension,
            Expires : 60 * 5
        }

        /*let fileStream = s3.getObject(getParams).createReadStream();
        res.attachment(name+'.'+extension);
        fileStream.pipe(res);*/

        const url = s3.getSignedUrl('getObject',getParams);
        console.log(url);
        res.send(url);
    }
    // Kim Ju Hui : 2019.09.17 Tue Fin-------------------------------------
}