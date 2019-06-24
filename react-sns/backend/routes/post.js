const express = require('express');
const db = require('../models');
const router = express.Router();

// 게시글 목록조회
router.get('/', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include:[{
                model: db.User,
                attribute: ['id', 'nickname'],
            }],
            order: [['createdAt', 'DESC']] // 등록일로 내림차순 정렬
        }); // 모든 게시글조회
        return res.json(posts); // 기본적으로는 .toJSON() 을 안붙여도됨
            // DB객체를 변형할경우 toJSON() 으로 변형해주어야한다.
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

// 게시글 등록
router.post('/', async (req, res, next) => {
    try {
        const hashTags = req.body.content.match(/#[^\s]+/g);
        // 보통 정규식으로 해시태그를 뽑아냄

        const newPost = await db.Post.create({
            content: req.body.content, // 컨텐츠 내용
            UserId: req.user.id, // 작성자
        });

        if (hashTags) { // 해시태그가 존재한다면 newPost와 관계를 이어준다.
            const result = await Promise.all(hashTags.map(tag => db.Hashtag.findOrCreate(
                {
                    where: {
                        name: tag.slice(1).toLowerCase() // 해당 해시태그가 없다면 생성, 있다면 아무일도 하지않음.
                        // slice(1) : # 제거
                    },
            }))); // 저장된 해시태그들이 RESult에 담긴다.
            console.log(result);
            await newPost.addHashtags(result.map(r => r[0] )); // post에 해시태그 생성된걸 연결해준다.
        }
        // 방법은 두가지
        // 관계함수를 사용해서 가져온다.
        //const User = await newPost.getUser();
        // newPost.User = User;
        // res.json(newPost);

        // 새롭게 관계엔티티까지 함께 가져옴
        const fullPost = await db.Post.findOne({
                where: { id: newPost.id },
                include: [{
                    model: db.User,
                }],
        });
        res.json(fullPost);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

// 이미지 등록
router.post('/images', (req, res) => {

});


module.exports = router;