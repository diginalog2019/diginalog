import {Router} from 'express';
import user from "./user";
import admin from "./admin";
import creator from "./creator";
const routes = Router();

routes.use('/user', user);
routes.use('/admin', admin);
/* Kwon Na Hyun : 2019.08.31 -------------------------------------------*/
routes.use('/creator', creator);
/* Kwon Na Hyun : 2019.08.31 fin------------------------------------------*/

export default routes;
