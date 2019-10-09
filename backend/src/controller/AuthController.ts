import {getConnection} from "typeorm";
import {User} from "../entity/User";
import {ResultVo} from "../vo/ResultVo";
import jwt from "jsonwebtoken";

export class AuthController {
    static register = async (req, res) => {
        const {id, password} = req.body;
        let userinfo = {id, password};
        let user = await getConnection().getRepository(User).findOne({where: {U_ID: id}});
        if(user) {
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

    }
}