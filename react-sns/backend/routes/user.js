const express = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
// 유저목록 조회
router.get('/', (req, res) => {

});

// 유저 상세조회
router.get('/:id', (req, res) => { // :id 은 파라메터를 의미한다. pathvariable개념

});

// 회원가입
router.post('/', async (req, res, next) => {
    try {
        const exUser = await db.User.findOne({ // 하나만 찾는 api
            where: {
                userId: req.body.userId,
            },
        }); // 비동기 프로미스기때문에 await로 잡아주어야함.

        if (exUser) { // 해당 사용자가 있을경우
            return res.status(400).send('이미 사용중인 아이디입니다.');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12); // 보통 10 ~ 12 사이로 많이 설정함. salt가 증가할수록 찾기힘들어지지만 해시화하는데 시간이 더오래걸림
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });// 유저 생성

        console.log(newUser);
        return res.status(200).json(newUser); // json으로 생성된 유저객체를 응답
    } catch (e) {
        console.error(e);
        /*

        에러처리 위치

        * */
        return next(e); // 에러가 났을경우 많이사용한다.
    }
});

// 로그아웃
router.post('/logout', (req, res) => {

});

// 로그인
router.post('/login', (req, res) => { // 로그인 전략을 실행해주어야한다.
    // 로컬전략으로 실행
    passport.authenticate('local', (err, user, info) => { // passport에서 done으로 넘긴정보를 인자로받음.
        // err: 서버에러
        // user: 로그인성공시 유저정보
        // info: 로직실패 정보
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user ,(loginErr) => {
            if (loginErr) { // 로그인 실패시
                return next(loginErr);
            }
            // 로그인 유저정보에는 패스워드가포함되어 있기 때문에 보안상 위험하다.
            const filteredUser = Object.assign({}, user); // 얕은복사후
            delete filteredUser.password; // 패스워드 부분삭제
            return res.json(filteredUser); // 클라이언트로 전송
        });
    });
});
// 팔로우목록
router.get('/:id/follow', (req, res) => {

});
// 팔로우등록
router.post('/:id/follow', (req, res) => {

});
// 팔로우 취소
router.delete('/:id/follow', (req, res) => {

});
// 팔로워 취소
router.delete('/:id/follower', (req, res) => {

});
// 게시글 가져오기
router.get('/:id/posts', (req, res) => {

});

module.exports = router;
