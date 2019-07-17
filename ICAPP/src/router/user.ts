import {Router} from "express";
import {UserController} from "../controller/UserController"
const routes = Router();


routes.get('/heroes', UserController.getHero);
routes.get('/hero/:Cate_ID([0-9]+)', UserController.getHero);

export default routes;
