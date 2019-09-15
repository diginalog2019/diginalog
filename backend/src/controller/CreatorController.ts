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

        const params = {
            Bucket: 'diginalog-s3',
            Key : "P_File/" + Date.now() + "_" + req.file.originalname,
            Body : req.file.buffer,
            ACL: 'public-read'
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
        res.send('success');
    }
    /* Kwon Na Hyun : 2019.09.01 fin------------------------------------------*/
    static registerProduct = async (req, res) => {
        const {CID, C_ID, C_Nickname, C_Email, C_Page, products} = req.body;

        const newCreator = new Creator();
        //newCreator.CID = CID;
        //newCreator.C_ID = C_ID;
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
                //p.P_DetailIMG = product.P_DetailIMG;
               // p.P_TitleIMG = product.P_TitleIMG ;
                p.creator = newCreator;  // relation key
                return p;
            })
            // bulk insert
            await getConnection().createQueryBuilder().insert().into(Product).values(newProducts).execute();
        }

        res.send(new ResultVo(0, 'success'));
    }
}

/* Kwon Na Hyun : 2019.09.13 fin------------------------------------------*/