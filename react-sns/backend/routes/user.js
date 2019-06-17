const express = require('express');
const router = express.Router();

// 유저목록 조회
router.get('/', (req, res) => {

});

// 유저 상세조회
router.get('/:id', (req, res) => { // :id 은 파라메터를 의미한다. pathvariable개념

});

// 회원가입
router.post('/', (req, res) => {

});

// 로그아웃
router.post('/logout', (req, res) => {

});

// 로그인
router.post('/login', (req, res) => {

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
