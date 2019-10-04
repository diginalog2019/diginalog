import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {ResultVo} from "../vo/ResultVo";
import {Category} from "../entity/Category";
import {Product} from "../entity/Product";
import {Creator} from "../entity/Creator";
import {File} from "../entity/File";
import {s3} from "../config/aws";

export class UserController {
    // Kim Ju Hui : 2019.09.13 Sat--------------------------------------------
    static getProduct = async (req, res) => {

        const {id} = req.query;

        let product = await getConnection().getRepository(Product).createQueryBuilder("product").where("product.PID = :pid", {pid: id}).leftJoinAndSelect("product.creator","creator").leftJoinAndSelect("product.category","category").leftJoinAndSelect("product.files", "file").getOne();

        const result = new ResultVo(0, "success");
        result.data = product;
        res.send(result);
    }
    // Kim Ju Hui : 2019.09.13 Sat Fin-------------------------------------------
    // Kim Ju Hui : 2019.08.30 Fri-------------------------------------------
    static getAllProduct = async (req, res) => {

        const {start_index, page_size} = req.query;

        let products = await getConnection().getRepository(Product).createQueryBuilder("product").where("product.State = :state", {state: 1}).leftJoinAndSelect("product.creator","creator").leftJoinAndSelect("product.category","category").leftJoinAndSelect("product.files", "file").skip(start_index).take(page_size).getMany();

        const total = products.length;
        const result = new ResultVo(0,"success");
        result.data = products;
        result.total = total;
        res.send(result);
    }
    // Kim Ju Hui : 2019.08.30 Fri Fin-------------------------------------------
    // Kim Ju Hui : 2019.09.17 Tue-------------------------------------------
    static getFileUrl = async (req, res) => {

        console.log(req.query);
        const {fileName, fileExtension, fileType} = req.query;
        // Kim Ju Hui : 2019.09.29 Sun ------------------------------------------
        let folderName = '';

        switch (fileType) {
            case '0':
                folderName = 'P_TitleIMG/';
                break;
            case '1':
                folderName = 'P_DetailIMG/';
                break;
            case '2':
                folderName = 'P_File/';
        }

        let params = {
            Bucket: 'diginalog-s3',
            Key: folderName + fileName + '.' + fileExtension
        }

        s3.headObject(params, function (err, matadata) {
            if (err && err.code == 'NotFound') {
                const url = 'error';
                res.send(url);
            } else {
                const url = s3.getSignedUrl('getObject', params);
                res.send(url);
            }
        })
        // Kim Ju Hui : 2019.09.29 Sun Fin-------------------------------------
    }
    // Kim Ju Hui : 2019.09.17 Tue Fin-------------------------------------
}