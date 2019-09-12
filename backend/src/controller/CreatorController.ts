import {Category} from "../entity/Category";
import {Creator} from "../entity/Creator";
import {getConnection} from "typeorm";
import {Product} from "../entity/Product";
import {Hashtag} from "../entity/Hashtag";
import {ResultVo} from "../vo/ResultVo";
import {s3} from "../config/aws";

export class CreatorController {
    /* Kwon Na Hyun : 2019.09.01 ------------------------------------------*/
    static addPhoto = async (req, res) => {
        console.log(req.file);
        // s3 upload configuring parameters
        const params = {
            Bucket: 'diginalog-s3',
            Body : req.file.buffer,
            Key : "photo/" + Date.now() + "_" + req.file.originalname,
            ContentType: req.file.mimetype,
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
    }
    /* Kwon Na Hyun : 2019.09.01 fin------------------------------------------*/
    static addCreator = async (req, res) => {
        const {nickname, email, page, products} = req.body;

        const newCreator = new Creator();
        newCreator.C_Nickname = nickname;
        newCreator.C_Email = email;
        newCreator.C_Page = page;

        await getConnection().getRepository(Creator).save(newCreator);


        if (products && products.length > 0) {
            const newProducts = products.map(product => {
                const p = new Product();
                p.P_Name = product.P_Name;
                p.P_Date = product.P_Date;
                p.P_Price = product.P_Price;
                p.P_Extension = product.P_Extension;
                p.P_Size = product.P_Size;
                p.P_StarPoint = product.P_StarPoint;
                p.P_DetailIMG = product.P_DetailIMG;
                p.P_TitleIMG = product.P_TitleIMG ;
                p.creator = newCreator;  // relation key
                return p;
            })
            // bulk insert
            await getConnection().createQueryBuilder().insert().into(Product).values(newProducts).execute();
        }

        res.send(new ResultVo(0, 'success'));
    }
}