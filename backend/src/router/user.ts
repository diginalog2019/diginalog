import {Router} from "express";
import {UserController} from "../controller/UserController"
const routes = Router();

routes.get('/products', UserController.getProduct);
routes.get('/product/:Cate_ID([0-9]+)', UserController.getProduct);
routes.get('/product/', UserController.getProduct);

export default routes;
