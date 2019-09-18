import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {ResultVo} from "../vo/ResultVo";
import {Category} from "../entity/Category";
import {Product} from "../entity/Product";
import {Creator} from "../entity/Creator";

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
}