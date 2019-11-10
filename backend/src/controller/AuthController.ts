import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {ResultVo} from "../vo/ResultVo";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const config = require('../config/config');

export class AuthController {
    static register = async (req, res) => {
        const {id, password} = req.body;
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
            //{id, password, email, name, tel, birth} 다 받아야함
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
            //let {user: newUser, jwt: jwt} = await AuthController.addUser(userinfo);
        }

        // let user = await getConnection().createQueryBuilder().select()
        //     .from(User,"user").where("U_ID = :id", {id})
        //     .execute();
        result.data = data;
        res.send(result);
    }
    static addUser = async (user) => {
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
    }
    static login = async (req, res) => {
        const {id, password} = req.body;
        const secret = req.app.get('jwt-secret');

        let user = await getConnection().getRepository(User).findOne({where: {U_ID: id}});
        const encrypted = crypto.createHmac('sha1', config.secret).update(password).digest('base64');

        const response = (token) => {
            res.json({
                message: 'logged in successfully',
                token
            })
        }
        if (!user) {
            console.log("login failed. user does not exist");
        } else {
            if(user.U_PW == encrypted) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        //payload
                        {
                        id: user.U_ID,
                        name: user.U_Name,
                        admin: user.admin
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'diginalog',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if(err) reject(err); //reject가 언제 일어나는지, 어떻게 실행되는지 모르겠음.
                            resolve(token);
                        })
                    }).then(response);
                } else {
                console.log("pw not match");
                res.json({
                    message: 'pw not match'
                })
            }
        }
        // console.log 대신 result에 에러메시지를 넘겨주면 좋을듯? 프론트에 어떻게..
        //const result = new ResultVo(0, "success");
    }
    static check = async (req, res) => {
        res.json({
            success: true,
            info: req.decoded
        })
    }
}