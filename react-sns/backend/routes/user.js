const express = require('express');
const db = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('./middleware');

// 내 정보 조회
router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        const user = req.user;
        const fullUser = await db.User.findOne({
            where: { id: user.id },
            include: [{ // include로 관계를 정의해둔 엔티티까지 가져올 수 있음.
                model: db.Post, // 엔티티타입
                as: 'Posts',     // as 알리아스명
                attributes: ['id'], // 모든 정보를 노출하면 보안상 위협이되기때문에 id속성만 가져온다.
            }, {
                model: db.User,
                as: 'Followings',
            }, {
                model: db.User,
                as: 'Followers',
                attributes: ['id'],
            }],
            attributes: ['id', 'nickname', 'userId']
        });
        return res.json(fullUser);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

// 유저 상세조회
router.get('/:id', async (req, res, next) => { // :id 은 파라메터를 의미한다. pathvariable개념
    try {
        const user = await db.User.findOne({
            where: { id: parseInt(req.params.id, 10)},
            include: [{
                model: db.Post,
                as: 'Posts',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followings',
                attributes: ['id'],
            }, {
                model: db.User,
                as: 'Followers',
                attributes: ['id'],
            }],
            attributes: ['id', 'nickname'],
        });
        const jsonUser = user.toJSON();
        jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
        jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
        jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
        res.json(jsonUser);
    } catch (e) {
        console.error(e);
        next(e);
    }
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
    req.logout();
    req.session.destroy();
    res.send('로그아웃 성공');
});

// 로그인
router.post('/login', (req, res, next) => { // 로그인 전략을 실행해주어야한다.
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
        return req.login(user , async (loginErr) => {
            if (loginErr) { // 로그인 실패시
                return next(loginErr);
            }
            const fullUser = await db.User.findOne({
                where: { id: user.id },
                include: [{ // include로 관계를 정의해둔 엔티티까지 가져올 수 있음.
                    model: db.Post, // 엔티티타입
                    as: 'Posts',     // as 알리아스명
                    attributes: ['id'], // 모든 정보를 노출하면 보안상 위협이되기때문에 id속성만 가져온다.
                }, {
                    model: db.User,
                    as: 'Followings',
                }, {
                    model: db.User,
                    as: 'Followers',
                    attributes: ['id'],
                }],
                attributes: ['id', 'nickname', 'userId']
            });
            console.log(fullUser);
            return res.json(fullUser); // 클라이언트로 전송
        });
    })(req, res, next);
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
router.get('/:id/posts', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include: [{
                model: db.User,
                where: {
                    id: req.params.id,
                },
                attributes: ['id', 'nickname']
            }],
            order: [['createdAt', 'DESC']],
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
