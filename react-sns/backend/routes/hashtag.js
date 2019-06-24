const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:tag', async (req, res, next) => {
    try {
        const posts = db.Post.findAll({
            include: [{
                model: db.Hashtag,
                where: {
                    name: decodeURIComponent(req.params.name), // 한글, 특수문자는 URIComponent 로 변형되서넘어오기때문에 처리가필요
                },
            }],
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
