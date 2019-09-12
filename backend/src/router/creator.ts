/* Kwon Na Hyun : 2019.08.31 -------------------------------------------*/
import {Router} from 'express';
import {CreatorController} from "../controller/CreatorController";
import multer from 'multer'

var multer = require('multer');
const routes = Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

routes.post('/addCreator' , CreatorController.addCreator);
routes.post('/photo', upload.single('photo'), CreatorController.addPhoto);
/*
routes.post('/addProduct', AdminController.addProduct);
routes.post('/addCategory', AdminController.addCategory);
routes.put('/modifyCategory', AdminController.modifyCategory);
routes.put('/modifyCreator',AdminController.modifyCreator);
routes.post('/photo',upload.single('photo'),AdminController.addPhoto);
routes.delete('/removeCategory', AdminController.removeCategory);
routes.delete('/removeCreator', AdminController.removeCreator);
routes.get('/products', AdminController.getAllProducts);
*/

export default routes;
/* Kwon Na Hyun : 2019.08.31 fin-------------------------------------------*/