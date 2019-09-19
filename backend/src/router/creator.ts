/* Kwon Na Hyun : 2019.08.31 -------------------------------------------*/
import {Router} from 'express';
import {CreatorController} from "../controller/CreatorController";
import multer from 'multer'

const multer = require('multer');
const routes = Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

routes.post('/register' , CreatorController.registerProduct);
routes.post('/file', upload.single('file'), CreatorController.uploadFile);
routes.post('/detailIMG', upload.single('detailIMG'), CreatorController.uploadDetailIMG);
routes.post('/titleIMG', upload.single('titleIMG'), CreatorController.uploadTitleIMG);
routes.get('/creatorsProduct',CreatorController.getAllCreators);
routes.get('/creatorsInfo',CreatorController.getAllCreatorsInfo);
routes.get('/creatorsProduct/:creatorCID([0-9]+)',CreatorController.getCreatorProduct);
routes.get('/product/',CreatorController.getSingleProduct);

export default routes;
/* Kwon Na Hyun : 2019.08.31 fin-------------------------------------------*/
