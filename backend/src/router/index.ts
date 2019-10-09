import {Router} from 'express';
import user from "./user";
import admin from "./admin";
import creator from "./creator";
import auth from "./auth";
const routes = Router();

routes.use('/user', user);
routes.use('/admin', admin);
/* Kwon Na Hyun : 2019.08.31 -------------------------------------------*/
routes.use('/creator', creator);
/* Kwon Na Hyun : 2019.08.31 fin------------------------------------------*/
// Shi Ha Yeon : 2019.10.09 -------------------------
routes.use('/auth', auth);
// Shi Ha Yeon : 2019.10.09 fin-------------------------
export default routes;
