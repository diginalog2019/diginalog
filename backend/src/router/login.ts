import {Router} from "express";
const routes = Router();

const passport = require('passport')
// naver 로그인
routes.get('/auth/naver',
    passport.authenticate('naver')
);
// naver 로그인 연동 콜백
routes.get('/',
    passport.authenticate('naver', {
        successRedirect: '/',
        failureRedirect: '/'
    })
);

export default routes;