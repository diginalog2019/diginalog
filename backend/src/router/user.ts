import {Router} from "express";
import {UserController} from "../controller/UserController"
const routes = Router();

routes.get('/products', UserController.getAllProduct);
routes.get('/product/', UserController.getProduct);
routes.get('/download',UserController.downloadFile);

export default routes;
