import { all, fork, takeLatest, throttle, put, call } from 'redux-saga/effects';
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
    LOAD_USER_POSTS_FAILURE,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_FAILURE,
    LOAD_COMMENTS_REQUEST,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UNLIKE_POST_FAILURE,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    RETWEET_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POST_FAILURE
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
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
        yield put({
            type: ADD_POST_TO_ME,
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
function loadMainPostsAPI(lastId = 0, limit = 10) {
    return axios.get(`/posts?lastId=${lastId}&limit=${limit}`);
}

function* loadMainPosts (action) {
    try {
        const result = yield call(loadMainPostsAPI, action.lastId);
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
    yield throttle(2000, LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}
////////////

//////////// loadHashtagPosts
function loadHashtagPostsAPI(tag, lastId = 0, limit = 10) {
    return axios.get(`/hashtag/${encodeURIComponent(tag)}?lastId=${lastId}&limit=${limit}`);
}

function* loadHashtagPosts(action) {
    try {
        const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
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
    yield throttle(2000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}
////////////////

//////////////// loadUserPosts
function loadUserPostsAPI(id) {
    return axios.get(`/users/${id || 0}/posts`);
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

///////////////////// imageUpload
function uploadImagesAPI(formData) {
    return axios.post('/posts/images', formData, {
        withCredentials: true,
    });
}

function* uploadImages(action) {
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data, // 서버에 저장된 이미지 주소들을 받음.
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: e,
        });
    }
}

function* watchUploadImages () {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
//////////////////////////////
////////////////////////////// LikePost
function likePostAPI(postId) {
    return axios.post(`/posts/${postId}/like`, {}, {
        withCredentials: true,
    });
}

function* likePost(action) {
    try {
        const result = yield call(likePostAPI, action.data);
        yield put({
            type: LIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: result.data.userId,
            }
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LIKE_POST_FAILURE,
            error: e,
        });
    }
}

function* watchLikePost () {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}
/////////////////////////////
////////////////////////////// UnLikePost
function unLikePostAPI(postId) {
    return axios.delete(`/posts/${postId}/like`, {
        withCredentials: true,
    });
}

function* unLikePost(action) {
    try {
        const result = yield call(unLikePostAPI, action.data);
        yield put({
            type: UNLIKE_POST_SUCCESS,
            data: {
                postId: action.data,
                userId: result.data.userId,
            }
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: UNLIKE_POST_FAILURE,
            error: e,
        });
    }
}

function* watchUnLikePost () {
    yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}
/////////////////////////////
///////////////////////////// Retweet
function retweetAPI(postId) {
    return axios.post(`/posts/${postId}/retweet`, {}, {
        withCredentials: true,
    });
}

function* retweet(action) {
    try {
        const result = yield call(retweetAPI, action.data);
        yield put({
            type: RETWEET_SUCCESS,
            data: result.data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: RETWEET_FAILURE,
            error: e,
        });
    }
}

function* watchRetweet () {
    yield takeLatest(RETWEET_REQUEST, retweet);
}
////////////////////////////
///////////////////////////// RemovePost
function removePostAPI(postId) {
    return axios.delete(`/posts/${postId}`, {
        withCredentials: true,
    });
}

function* removePost(action) {
    try {
        const result = yield call(removePostAPI, action.data);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: result.data
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: result.data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: e,
        });
    }
}

function* watchRemovePost () {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
////////////////////////////
///////////////////////////// LoadPost
function loadPostAPI(postId) {
    return axios.get(`/posts/${postId}`);
}

function* loadPost(action) {
    try {
        const result = yield call(loadPostAPI, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_POST_FAILURE,
            error: e,
        });
    }
}

function* watchLoadPost () {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
////////////////////////////
export default function* postSaga() {
    yield all([
        fork(watchLoadUserPosts),
        fork(watchLoadHashtagPosts),
        fork(watchLoadMainPosts),
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchLoadComments),
        fork(watchUploadImages),
        fork(watchLikePost),
        fork(watchUnLikePost),
        fork(watchRetweet),
        fork(watchRemovePost),
        fork(watchLoadPost),
    ]);
};
