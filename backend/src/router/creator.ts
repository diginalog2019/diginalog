import {Router} from 'express';
import {CreatorController} from "../controller/CreatorController";

const routes = Router();

routes.get('/creators',CreatorController.getAllCreators);

export default routes;