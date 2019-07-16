import {Router} from 'express';
import {AdminController} from "../controller/AdminController";

var multer = require('multer');
const routes = Router();

const storage = multer.memoryStorage();
const upload = multer({storage});

routes.post('/hero', AdminController.addHero);
routes.put('/modifyCategory', AdminController.modifyCategory);
routes.put('/modifyCreator',AdminController.modifyCreator);
routes.post('/photo',upload.single('photo'),AdminController.addPhoto);

export default routes;