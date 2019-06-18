const passport = require('passport');
const db = require('../models');

module.exports = () => {
    // 사용자 정보가 너무많기때문에 id값만 가지고있음.
  passport.serializeUser((user ,done) => { // 서버쪽에 [{ id: 3, cookie: `asdfgh` }] 형태로 저장해둔다.
      return done(null, user.id);
  });

  passport.deserializeUser(async (id ,done) => { // cookie를 프론트에서 보내면 해당 쿠키와 연관된 id를 기반으로 유저정보를 조회해온다.
     try {
         const user = await db.User.findOne({
             where: { id },
         });
        return done(null, user);
     } catch (e) {
         console.error(e);
         return done(e);
     }
  });
};
