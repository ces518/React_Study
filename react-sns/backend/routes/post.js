const express = require('express');
const db = require('../models');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { isLoggedIn } = require('./middleware');


// multer 설정
const upload = multer({
    storage: multer.diskStorage({ // 파일 스토리지 지정 옵션, 추후에 S3 스토리지 등 으로 변경이가능함.
        destination(req, file, done) {
            done(null, 'uploads') // cb는
        },
        filename(req, file, done) { // 실제 저장파일명을 변경해줌
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            done(null, basename + new Date().valueOf() + ext);
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 }, // 파일사이즈 설정. 파일개수제한도 가능하다.
});

// 게시글 목록조회
router.get('/', async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include:[{
                model: db.User,
                attribute: ['id', 'nickname'],
            }, {
                model: db.Image,
            }, {
                model: db.User,
                through: 'Like',
                as: 'Likers',
                attributes: ['id'],
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
// upload.none() 을 사용하면
// 이미지는 req.files, 텍스트는 req.body 로 보내준다.
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
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
            await newPost.addHashtags(result.map(r => r[0] )); // post에 해시태그 생성된걸 연결해준다.
        }


        // multer의 단점
        // 단수와 다수를 구분해주어야함
        // 이미지 다수: 배열
        // 이미지 단수: 배열X
        if (req.body.image) { // 이미지가 있는경우
            if (Array.isArray(req.body.image)) { // 다수인경우
                const images = await Promise.all(req.body.image.map((image) => { // Promise.all 로 묶어주면 한번에 처리됨.
                    return db.Image.create({ src: image });
                }));
                await newPost.addImages(images);
            } else {
                const image = await db.Image.create({ src: req.body.image });
                await newPost.addImage(image);
            }
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
                }, {
                    model: db.Image,
                }],
        });
        res.json(fullPost);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});


// 이미지 등록
// upload.array('name')이 폼에서 넘기는 명을 지정해준다.
// 단일일경우 single
// upload.files([{ name: 'test1'}, { name: 'test2' } ])// 각 이미지를넘길때 폼이넘기는 이름이 각각 다른경우
router.post('/images', isLoggedIn, upload.array('image'), (req, res) => {
    //req.file // 단일파일
    console.log('이미지 업로드');
    res.json(req.files.map(v => v.filename)); // 업로드된 이미지를 프론트로 돌려준다.
});

// 댓글 조회
router.get('/:id/comments', async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지않습니다.');
        }
        const comments = await db.Comment.findAll({
           where: {
               PostId: req.params.id,
           },
           order: [['createdAt', 'DESC']],
           include: [{
               model: db.User,
               attributes: ['id', 'nickname']
           }],
        });
        return res.json(comments);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});


// 댓글 등록
router.post('/:id/comments', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } }); // 포스트가 존재하는지 검증
        if (!post) {
            return res.status(404).send('포스트가 존재하지않습니다.');
        }
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content,
        });

        await post.addComment(newComment.id); // 시퀄라이즈에서 제공하는 post와 comment간의 관계 정의
        const comment = await db.Comment.findOne({ // 등록된 댓글 조회해서 전달
            where: {
                id: newComment.id,
            },
            include: [{
                model: db.User,
                attributes: ['id', 'nickname'],
            }],
        });
        return res.json(comment);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.addLiker(req.user.id);
        res.json({ userId: req.user.id });
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.delete('/:id/like', isLoggedIn, async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        await post.removeLiker(req.user.id);
        res.json({ userId: req.user.id });
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;
