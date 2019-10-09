import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {ResultVo} from "../vo/ResultVo";
import jwt from "jsonwebtoken";

export class AuthController {
    static register = async (req, res) => {
        const {id, password} = req.body;
        let userinfo = {id, password};
        let user = await getConnection().getRepository(User).findOne({where: {U_ID: id}});
        if (user) {
            console.log("exist user id");
        } else {
            user = await AuthController.addUser(userinfo);
        }

        // let user = await getConnection().createQueryBuilder().select()
        //     .from(User,"user").where("U_ID = :id", {id})
        //     .execute();
        const result = new ResultVo(0, "success");
        result.data = user;
        res.send(result);
    }
    static addUser = async (user) => {
        //const {id, password, email, name, tel, birth};
        const {id, password} = user;
        const newUser = new User();
        newUser.U_ID = id;
        newUser.U_PW = password;
        // newUser.U_Email = email;
        // newUser.U_Name = name;
        // newUser.U_Tel = tel;
        // newUser.U_Birth = birth;

        await getConnection().getRepository(User).save(newUser);
        return newUser;
    }
    static login = async (req, res) => {
        const {id, password} = req.body;
        const secret = req.app.get('jwt-secret');

        let user = await getConnection().getRepository(User).findOne({where: {U_ID: id}});

        const response = (token) => {
            res.json({
                message: 'logged in successfully',
                token
            })
        }
        if (!user) {
            console.log("login failed. user does not exist");
        } else {
            if(user.U_PW == password) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign({
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
                            if(err) reject(err);
                            resolve(token);
                        })
                }).then(response);
            } else {
                console.log("pw not match");
            }
        }
        // console.log 대신 result에 에러메시지를 넘겨주면 좋을듯?
        //const result = new ResultVo(0, "success");

    }
    static check = async (req, res) => {
        res.json({
            success: true,
            info: req.decoded
        })
    }
}