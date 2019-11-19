import {Router} from "express";
import {UserController} from "../controller/UserController"
const routes = Router();

routes.get('/products', UserController.getAllProduct);
routes.get('/product/', UserController.getProduct);
routes.get('/download',UserController.getFileUrl);
routes.get('/hashtags',UserController.getAllHashtag);
routes.get('/productsByHashtag', UserController.getProductsByHashtag);

export default routes;
