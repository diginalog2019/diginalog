import {Router} from 'express';
import {CreatorController} from "../controller/CreatorController";

const routes = Router();

routes.get('/creatorsProduct',CreatorController.getAllCreators);
routes.get('/creatorsInfo',CreatorController.getAllCreatorsInfo);
routes.get('/creatorsProduct/:creatorCID([0-9]+)',CreatorController.getCreatorProduct);
routes.get('/product/',CreatorController.getSingleProduct);

export default routes;