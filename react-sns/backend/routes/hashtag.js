const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:tag', async (req, res, next) => {
    try {
        console.log(req.params.tag);
        const posts = await db.Post.findAll({
            include: [{
                model: db.Hashtag,
                where: {
                    name: decodeURIComponent(req.params.tag), // 한글, 특수문자는 URIComponent 로 변형되서넘어오기때문에 처리가필요
                },
            }, {
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        console.log(posts);
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
