import { all, fork, takeLatest, delay, put, call } from 'redux-saga/effects';
import {
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    LOAD_MAIN_POSTS_REQUEST,
    LOAD_MAIN_POSTS_SUCCESS,
    LOAD_MAIN_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST,
    LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_USER_POSTS_REQUEST,
    LOAD_USER_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE, LOAD_COMMENTS_REQUEST
} from "../reducers/post";
import axios from 'axios';

/////////// addPost
function addPostAPI(postData) {
    return axios.post('/posts', postData, { // 로그인한 사용자만 글을 쓸수있다.
        withCredentials: true,
    });
}

function* addPost (action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        });
    }
}

function* watchAddPost () {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
////////////

//////////// addComment
function addCommentAPI (data) {
    return axios.post(`/posts/${data.postId}/comments`, { content: data.content }, {
        withCredentials: true,
    });
}

function* addComment (action) {
    // REQUEST action을 받을 수 있다.
    try {
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: {
                postId: action.data.postId,
                comment: result.data,
            }
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e,
        });
    }
}

function* watchAddComment () {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
////////////

//////////// loadComment
function loadCommentsAPI (postId) {
    return axios.get(`/posts/${postId}/comments`);
}

function* loadComments (action) {
    // REQUEST action을 받을 수 있다.
    try {
        const result = yield call(loadCommentsAPI, action.data);
        yield put({
            type: LOAD_COMMENTS_SUCCESS,
            data: {
                postId: action.data,
                comments: result.data,
            }
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_COMMENTS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadComments () {
    yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}
////////////

//////////// loadMainPosts
function loadMainPostsAPI() {
    return axios.get('/posts');
}

function* loadMainPosts () {
    try {
        const result = yield call(loadMainPostsAPI);
        yield put({
            type: LOAD_MAIN_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_MAIN_POSTS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadMainPosts () {
    yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}
////////////

//////////// loadHashtagPosts
function loadHashtagPostsAPI(tag) {
    return axios.get(`/hashtag/${tag}`);
}

function* loadHashtagPosts(action) {
    try {
        const result = yield call(loadHashtagPostsAPI, action.data);
        yield put({
            type: LOAD_HASHTAG_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_HASHTAG_POSTS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadHashtagPosts () {
    yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}
////////////////

//////////////// loadUserPosts
function loadUserPostsAPI(id) {
    return axios.get(`/users/${id}/posts`);
}

function* loadUserPosts(action) {
    try {
        const result = yield call(loadUserPostsAPI, action.data);
        yield put({
            type: LOAD_USER_POSTS_SUCCESS,
            data: result.data,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_USER_POSTS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadUserPosts () {
    yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
/////////////////////

export default function* postSaga() {
    yield all([
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
        fork(watchLoadMainPosts),
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadComments)
    ]);
};
