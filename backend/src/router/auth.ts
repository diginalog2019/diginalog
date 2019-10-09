import {Router} from "express";
import {AuthController} from "../controller/AuthController"
const routes = Router();
const authMiddleware = require('../controller/auth');

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);
routes.use('/check', authMiddleware);
routes.get('/check', AuthController.check);

export default routes;
