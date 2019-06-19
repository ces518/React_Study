const passport = require('passport');
const { Strategy, LocalStrategry } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
    passport.use(new LocalStrategry({
        usernameField: 'userId',
        passwordField: 'password',
    }, async (userId, password, done) => {
        try {
            const user = await db.User.findOne({
                where: {
                    userId,
                }
            });

            if (!user) {
                // done의 1번 인자 : 서버에러 , 서버에러발생시 1을 넣어줌
                // 2번 인자: 성공여부
                // 3번 인자: 로직상에 에러가 나는경우.. 강제로 중단해야할때 3번인자 사용
                return done(null, false, { reason: '존재하지않는 사용자입니다.' });
            }

            const result = await bcrypt.compare(password, user.password); // 패스워드 비교
            if (result) {
                return done(null, user); // 성공시 2번째 인수를 사용한다.
            }
            return done(null, false, { reason: '비밀번호가 올바르지 않습니다.' }); // 로그인 실패
        } catch (e) {
            console.error(e);
            return done(e);
        }
    }));
};
