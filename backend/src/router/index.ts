import {Router} from 'express';
import user from "./user";
import admin from "./admin";
import creator from "./creator";
import auth from "./auth";
const routes = Router();
const authMiddleware = require('../controller/auth');

routes.use('/user', user);
//routes.use('/admin', admin);
/* Kwon Na Hyun : 2019.08.31 -------------------------------------------*/
routes.use('/creator', creator);
/* Kwon Na Hyun : 2019.08.31 fin------------------------------------------*/
// Shi Ha Yeon : 2019.10.09 -------------------------
routes.use('/auth', auth);
routes.use('/admin', authMiddleware);
routes.use('/admin', admin);
// Shi Ha Yeon : 2019.10.09 fin-------------------------
export default routes;
