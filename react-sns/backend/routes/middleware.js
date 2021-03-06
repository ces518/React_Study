const db = require('../models');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) { // passport에서 제공하는 함수 로그인여부 판단
        next();
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
      next();
  } else {
    res.status(401).send('로그인한 사용자는 접근이 불가능합니다.');
  }
};


exports.existsPost = async (req, res, next) => {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
        return res.status(404).send('포스트가 존재하지 않습니다.');
    } else {
        req.Post = post;
        next();
    }
};
