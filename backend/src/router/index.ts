import {Router} from 'express';
import user from "./user";
import admin from "./admin";
import creator from "./creator";

const routes = Router();

routes.use('/user', user);
routes.use('/admin', admin);
routes.use('/creator',creator);

export default routes;
