import express from 'express';
import router from './router';
import bodyParser from 'body-parser';
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Product} from "./entity/Product";
import {Hashtag} from "./entity/Hashtag";
import {Category} from "./entity/Category";
import {Hash} from "crypto";

import cors from "cors";

const app = express();
app.use(cors());

createConnection().then(async connection => {

    /*//let test = new Category();

    //test.Cate_Name = "yy";


    //await connection.manager.save(test);
    //console.log("TEST has been saved");

    //test data JuhuiKim(Basket) --------------------------
    console.log("Inserting a new product into the database..");

    let hash2 = new Hashtag();
    hash2.HID = 2;
    hash2.H_Name = "hash 2";

    let product1 = new Product();
    product1.PID = 1;
    product1.P_Name = "test product 1";
    product1.hashtags = [hash2];
    await connection.manager.save(product1);

    let product2 = new Product();
    product2.PID = 2;
    product2.P_Name = "test product 2";

    console.log("Inserting a new user into the database..");

    let user1 = new User();
    user1.UID = 1;
    user1.U_Name = "eastflag";
    user1.products = [product1];
    await connection.manager.save(user1);

    let user2 = new User();
    user2.UID = 2;
    user2.U_Name = "GGOBOOGI";
    user2.products = [product2];
    await connection.manager.save(user2);

    let user3 = new User();
    user3.UID = 3;
    user3.U_Name = "siragi";
    user3.products = [product1,product2];
    await connection.manager.save(user3);

    let hash1 = new Hashtag();
    hash1.H_Name = "test hash name 1";
    hash1.HID = 1;
    hash1.products = [product1,product2];
    //await connection.manager.save(hash1);

    /!*let cate1 = new Category();
    cate1.Cate_ID = 1;
    cate1.Cate_Name = "Shopping";
    cate1.depth = 0;
    cate1.upper_cate_ID = -1;
    cate1.products = [product1];
    await connection.manager.save(cate1);

    let cate2 = new Category();
    cate1.Cate_ID = 2;
    cate1.Cate_Name = "hehehe";
    cate1.depth = 1;
    cate1.upper_cate_ID = 0;
    cate1.products = [product1,product2];
    await connection.manager.save(cate2);*!/

    const result = await connection.getRepository(Product).find({relations:["hashtags"]});
    console.log("Loaded findHero: ",result);*/

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
