import {Router} from 'express';
import {AdminController} from "../controller/AdminController";
import {Admin} from "typeorm";

var multer = require('multer');
const routes = Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

routes.post('/addProduct', AdminController.addProduct);
routes.post('/addCategory', AdminController.addCategory);
routes.put('/modifyCategory', AdminController.modifyCategory);
routes.put('/modifyCreator',AdminController.modifyCreator);
routes.post('/photo',upload.single('photo'),AdminController.addPhoto);
routes.delete('/removeCategory', AdminController.removeCategory);
routes.delete('/removeCreator', AdminController.removeCreator);
routes.get('/products', AdminController.getAllProducts);
// Shi Ha Yeon : 2019.09.15 -----------------------------------------------
routes.get('/waitingProducts', AdminController.getWaitingProducts);
routes.put('/setState', AdminController.setState);
routes.delete('/removeProduct', AdminController.removeProduct);
routes.get('/creators', AdminController.getAllCreators);
routes.get('/product', AdminController.getProduct);
// Shi Ha Yeon : 2019.09.16 Fin --------------------------------------------
export default routes;