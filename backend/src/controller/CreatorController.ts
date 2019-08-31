import {Category} from "../entity/Category";
import {Creator} from "../entity/Creator";
import {getConnection} from "typeorm";
import {Product} from "../entity/Product";
import {Hashtag} from "../entity/Hashtag";
import {ResultVo} from "../vo/ResultVo";
import {s3} from "../config/aws";

export class CreatorController {
    static addCreator = async (req, res) => {
        const {nickname, email, page, products} = req.body;

        const newCreator = new Creator();
        newCreator.C_Nickname = nickname;
        newCreator.C_Email = email;
        newCreator.C_Page = page;

        await getConnection().getRepository(Creator).save(newCreator);


        if (products && products.length > 0) {
            const newPowers = products.map(product => {
                const p = new Product();
                p.P_Name = product.P_Name;
                p.PID = product.PID;
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
            await getConnection().createQueryBuilder().insert().into(Product).values(newPowers).execute();
        }

        res.send(new ResultVo(0, 'success'));
    }
}