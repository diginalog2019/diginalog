import express from 'express';
import router from './router';
import cors from 'cors';
import bodyParser from 'body-parser';
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Product} from "./entity/Product";
import {Hashtag} from "./entity/Hashtag";
import {Category} from "./entity/Category";
import {Hash} from "crypto";

const app = express();
app.use(cors());

createConnection().then(async connection => {

    // start express server --------------------------------
    //app.use(bodyParser());
    const bodyParser = require('body-parser');
    app.use(bodyParser.json({limit: "50mb"}));
    app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

    app.get('/api/hello', (req, res) => {
        res.send('hello world');
    });

    app.use('/api', router);

    app.listen(8000, () => {
        console.log('server is listening 8000');
    });

}).catch(error => console.log(error));
