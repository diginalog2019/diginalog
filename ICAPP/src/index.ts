import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import {createConnection} from "typeorm";
import {Category} from "./entity/Category";

const app = express();

createConnection().then(async connection => {

    //let test = new Category();

    //test.Cate_Name = "yy";


    //await connection.manager.save(test);
    //console.log("TEST has been saved");

    // start express server --------------------------------
    app.use(bodyParser());

    app.use('/api', router);

    app.listen(8000, () => {
        console.log('server is listening 8000');
    });

}).catch(error => console.log(error));