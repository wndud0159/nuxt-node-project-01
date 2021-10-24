const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../mongoose/model");

// 로그인 요청
router.post("/user/login", async (req, res) => {
    console.log("request check : ", req.body);
    const { email, password } = req.body;
    console.log("body checked : ", email, password);

    const loginUser = await User.findOne({ email: email });
    console.log("user check : ", loginUser);
    if (!loginUser._id) {
        return res.send({
            error: true,
            msg: "존재하지 않는 이메일",
        });
    }
    const currentPassword = await loginUser.authenticate(password);
    if (!currentPassword) {
        return res.send({
            error: true,
            msg: "비밀번호 불일치",
        });
    }

    const secret = req.app.get("jwt-secret");
    const token = jwt.sign(
        {
            id: loginUser._id,
            email: loginUser.email,
            nickname: loginUser.nickname,
        },
        secret,
        {
            expiresIn: "7d",
            issuer: "blind",
            subject: "auth",
        }
    );

    res.send({ error: false, email: loginUser.email, nickname: loginUser.nickname, token: token });
});

// 사용자 추가
router.post("/user/create", async (req, res) => {
    const { nickname, company, email, password } = req.body;
    const newUser = await User({
        email,
        nickname,
        password,
        company,
    }).save();

    console.log(newUser);

    res.send(newUser._id ? true : false);
});

// 사용자 토큰 체크
router.get("/user/token", (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.send({
            error: true,
            msg: "사용자 토큰 정보가 없습니다.",
        });
    }
    const token = authorization.split(" ")[1];
    const secret = req.app.get("jwt-secret");
    const verify = jwt.verify(token, secret, (err, data) => {
        if (err) {
            return res.send(err);
        }
        res.send({
            error: false,
            email: data.email,
            nickname: data.nickname,
        });
    });
});

// 사용자 정보 변경

// 사용자 삭제

// 프로필 이미지 추기

module.exports = router;
