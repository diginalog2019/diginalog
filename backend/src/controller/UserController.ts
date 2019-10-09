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

        let product = await getConnection().getRepository(Product).createQueryBuilder("product").where("product.PID" +
            " = :pid", {pid: id}).leftJoinAndSelect("product.creator","creator").leftJoinAndSelect("product.category","category").leftJoinAndSelect("product.files", "file").getOne();

        let productDetail = [], productTitle = [], productFile = [];

       await Promise.all(product.files.map(async(file) => {

           let F_Url = await UserController.getUrl(file.F_Name,file.F_Extension,file.F_Type);
           file['F_Url'] = F_Url;

            switch(file.F_Type) {
                case 0:
                    productTitle.push(file);
                    console.log("push");
                    break;
                case 1:
                    productDetail.push(file);
                    console.log("push");
                    break;
                case 2:
                    productFile.push(file);
                    console.log("push");

            }
        }))

       product['productDetail'] = productDetail;
       product['productTitle'] = productTitle;
       product['productFile'] = productFile;

       delete product.files;

        const result = new ResultVo(0, "success");
        result.data = product;
        res.send(result);
    }
    // Kim Ju Hui : 2019.09.13 Sat Fin-------------------------------------------
    // Kim Ju Hui : 2019.08.30 Fri-------------------------------------------
    static getAllProduct = async (req, res) => {

        const {start_index, page_size} = req.query;

        let products = await getConnection().getRepository(Product).createQueryBuilder("product").where("product.State = :state", {state: 1}).leftJoinAndSelect("product.creator","creator").leftJoinAndSelect("product.category","category").leftJoinAndSelect("product.files", "file").skip(start_index).take(page_size).getMany();

        await Promise.all(products.map(async(product) => {
            let productDetail = [], productTitle = [], productFile = [];

            await Promise.all(product.files.map(async(file) => {

                let F_Url = await UserController.getUrl(file.F_Name,file.F_Extension,file.F_Type);
                file['F_Url'] = F_Url;

                switch(file.F_Type) {
                    case 0:
                        productTitle.push(file);
                        console.log("push");
                        break;
                    case 1:
                        productDetail.push(file);
                        console.log("push");
                        break;
                    case 2:
                        productFile.push(file);
                        console.log("push");

                }
            }))

            product['productDetail'] = productDetail;
            product['productTitle'] = productTitle;
            product['productFile'] = productFile;

            delete product.files;
        }))

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

        res.send(await UserController.getUrl(fileName,fileExtension,fileType));
    }

    static getUrl = async(fileName,fileExtension,fileType) => {

        if(typeof(fileType)=="string")
            fileType = parseInt(fileType);

        let folderName = '';

        switch (fileType) {
            case 0:
                folderName = 'P_TitleIMG/';
                break;
            case 1:
                folderName = 'P_DetailIMG/';
                break;
            case 2:
                folderName = 'P_File/';
        }

        let params = {
            Bucket: 'diginalog-s3',
            Key: folderName + fileName + '.' + fileExtension
        }

        return new Promise(function(resolve, reject){
            s3.headObject(params).promise()
                .then(function (data) {
                    console.log('s3 File exists' + data);
                    resolve(s3.getSignedUrl('getObject',params));
                }).catch(function (err) {
                console.log('Generating Presigned Link ... Failed' + err);
                resolve('error');
            });
        });
    }
    // Kim Ju Hui : 2019.09.17 Tue Fin-------------------------------------
}