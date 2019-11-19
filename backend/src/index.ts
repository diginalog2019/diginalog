import express from 'express';
import router from './router';
import cors from 'cors';
import bodyParser from 'body-parser';
import {createConnection} from "typeorm";
import {Hash} from "crypto";
// Shi Ha Yeon : 2019.10.09 -------------------------------
import morgan from 'morgan';
const config = require('./config/config');
// Shi Ha Yeon : 2019.10.09 Fin -------------------------------
const app = express();
app.use(cors());

createConnection().then(async connection => {

    // start express server --------------------------------
    //app.use(bodyParser());
    const bodyParser = require('body-parser');
    app.use(bodyParser.json({limit: "50mb"}));
    app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

    // Shi Ha Yeon : 2019.10.09 -------------------------------
    // print the request log on console
    app.use(morgan('dev'));
    // set the secret key variable for jwt
    app.set('jwt-secret',config.secret);
    // Shi Ha Yeon : 2019.10.09 Fin -------------------------------
    app.get('/api/hello', (req, res) => {
        res.send('hello world');
    });

    app.use('/api', router);

    app.listen(8000, () => {
        console.log('server is listening 8000');
    });

}).catch(error => console.log(error));

