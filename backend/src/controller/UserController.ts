import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {ResultVo} from "../vo/ResultVo";
import {Category} from "../entity/Category";
import {Product} from "../entity/Product";
import {Creator} from "../entity/Creator";

export class UserController {
    static getProduct = async (req, res) => {

        console.log(req.params);
        const {Cate_ID} = req.params;

        const options = {relation:["products"], where: [{Cate_ID}], take: 1};

        const result = await getConnection().getRepository(Category).findOne(options);
        res.send(result);
    }
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

        // Shi Ha Yeon : 2019.08.30 Fri----------------------------------------------------------------------
        const categorys = await getConnection().getRepository(Category).find();
        // Kim Ju Hui : 2019.08.30 18:24 Fri-----------------------------------------------------------------------
        const creators = await getConnection().getRepository(Creator).find();

        const products2 = products.map(product => {
            let product2 = {CreatorName: creators[(product.creatorCID-1)].C_Nickname,CateName:categorys[(product.categoryCateID-1)].Cate_Name, ...product};
         // Kim Ju Hui : 2019.08.30 18:24 Fin----------------------------------------------------------------------
            return product2;
        });

        // Shi Ha Yeon : 2019.08.30 Fin ---------------------------------------------------------------------

        const total = await getConnection().getRepository(Product).count();

        const result = new ResultVo(0,"success");

        result.data = products2;
        result.total = total;
        res.send(result);
    }
    // Kim Ju Hui : 2019.08.30 Fin-------------------------------------------
}