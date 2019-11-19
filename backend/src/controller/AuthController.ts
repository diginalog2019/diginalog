import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {ResultVo} from "../vo/ResultVo";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const config = require('../config/config');

export class AuthController {
    static register = async (req, res) => {
        const {id, password, email, name, tel, birth} = req.body;
        let userinfo = {id, password};
        let user = await getConnection().getRepository(User).findOne({where: {U_ID: id}});
        let newUser = new User();
        let profile = {id: id, admin: false};
        const result = new ResultVo(0, "success");
        const data = {user: profile, jwt: "", message:""};
        if (user) {
            console.log("exist user id");
            // 프론트에 어떻게 알려줘야 할까?
            data.message = "exist user id";
        } else {
            const encrypted = crypto.createHmac('sha1', config.secret).update(password).digest('base64');
            const newUser = new User();
            newUser.U_ID = id;
            newUser.U_PW = encrypted;
            newUser.admin = false;
            newUser.U_Email = email;
            newUser.U_Name = name;
            newUser.U_Tel = tel;
            newUser.U_Birth = birth;
            newUser.U_Date = new Date();
            await getConnection().getRepository(User).save(newUser);
            //let {user: newUser, jwt: jwt} = await AuthController.addUser(userinfo);
        }

        // let user = await getConnection().createQueryBuilder().select()
        //     .from(User,"user").where("U_ID = :id", {id})
        //     .execute();
        result.data = data;
        res.send(result);
    }
    // 2019.11.12 Shi Ha Yeon : 이거 이제 안씀
   /* static addUser = async (user) => {
        //const {id, password, email, name, tel, birth};
        const {id, password} = user;
        const encrypted = crypto.createHmac('sha1', config.secret).update(password).digest('base64');
        const newUser = new User();
        newUser.U_ID = id;
        newUser.U_PW = encrypted;
        newUser.admin = false;
        // newUser.U_Email = email;
        // newUser.U_Name = name;
        // newUser.U_Tel = tel;
        // newUser.U_Birth = birth;
        await getConnection().getRepository(User).save(newUser);
        return {user:newUser, jwt:encrypted};
    }*/
    static login = async (req, res) => {
        const {id, password} = req.body;
        const secret = req.app.get('jwt-secret');

        let user = await getConnection().getRepository(User).findOne({where: {U_ID: id}});
        const encrypted = crypto.createHmac('sha1', config.secret).update(password).digest('base64');
        let profile = {id: id, admin: false};
        const result = new ResultVo(0, "success");
        const data = {user: profile, jwt: "", message:""};
        const response = (msg) => {
            data.message = msg;
            result.data = data;
            console.log(result.data);
            res.send(result);
        }
        const appendToken = (token) => {
            //data.message = 'logged in successfully';
            //data.jwt = JSON.stringify(token);
            data.jwt = token;
            data.user.admin = user.admin;
            //console.log(data.jwt);
        }
        if (!user) {
            response('user does not exist');
            console.log("login failed. user does not exist");
        } else {
            if(user.U_PW == encrypted) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        //payload
                        {
                            UID: user.UID,
                            id: user.U_ID,
                            name: user.U_Name,
                            admin: user.admin
                        },
                        secret,
                        {
                            expiresIn: '1h',
                            issuer: 'diginalog',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if(err) reject(err);
                            resolve(token);
                        })
                    }).then(appendToken)
                    .then(response)
                    .catch((err) => {
                        console.error(err);
                        response(err);
                    });
                } else {
                console.log("pw not match");
                //data.message = 'pw not match';
                response('pw not match');
            }
        }

    }
    static check = async (req, res) => {
        res.json({
            success: true,
            info: req.decoded
        })
    }
}