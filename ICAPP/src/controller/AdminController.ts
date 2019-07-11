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

import {Creator} from "../entity/Creator";
import {getConnection} from "typeorm";
import {Product} from "../entity/Product";
import {ResultVo} from "../vo/ResultVo";

export class AdminController {
    static addHero = async (req, res) => {
        const {id, email, nick, page, products} = req.body;

        const newCreator = new Creator();
        newCreator.CID = id;
        newCreator.C_Email = email;
        newCreator.C_Nickname = nick;
        newCreator.C_Page = page;
        await getConnection().getRepository(Creator).save(newCreator);

        if (products && products.length > 0) {
            const newProducts = products.map(product => {
                const p = new Product();
                p.PID = product.PID;
                p.P_Name = product.P_Name;
                p.creator = newCreator;  // relation key
                return p;
            })
            // bulk insert
            await getConnection().createQueryBuilder().insert().into(Product).values(newProducts).execute();
        }

        res.send(new ResultVo(0, 'success'));
    }
}