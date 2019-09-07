import {Category} from "../entity/Category";
import {Creator} from "../entity/Creator";
import {getConnection} from "typeorm";
import {Product} from "../entity/Product";
import {ResultVo} from "../vo/ResultVo";
import {s3} from "../config/aws";

export class CreatorController{
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
    static searchCreatorCID = async (req, res) => {
        //C_ID 를 CID로 바꿔서 product에서 찾기 
    }
}