import {Router} from "express";
import {UserController} from "../controller/UserController"
const routes = Router();

/*routes.get('/heroes', (req, res) => {
    res.send('heroes list');
});*/

/*routes.get('/heroes',(req, res) => {
    res.send('sibal');
});*/
routes.get('/heroes', UserController.getHeroes);

export default routes;
