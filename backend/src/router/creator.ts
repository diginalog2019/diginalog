import {Router} from 'express';
import {CreatorController} from "../controller/CreatorController";

const routes = Router();

routes.get('/creators',CreatorController.getAllCreators);
routes.get('/searchCID',CreatorController.searchCreatorCID);
export default routes;