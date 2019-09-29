import {Router} from 'express';
import user from "./user";
import admin from "./admin";
import creator from "./creator";
import login from "./login";
const routes = Router();

routes.use('/user', user);
routes.use('/admin', admin);
/* Kwon Na Hyun : 2019.08.31 -------------------------------------------*/
routes.use('/creator', creator);
/* Kwon Na Hyun : 2019.08.31 fin------------------------------------------*/

//Shi Ha Yeon : 2019.09.29 --------------------------------------------
routes.use('/login', login);
//Shi Ha Yeon : 2019.09.29 Fin --------------------------------------------
export default routes;
