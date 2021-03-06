import { all, fork, takeLatest, takeEvery, call, put, take, delay } from 'redux-saga/effects';
import {
    LOG_IN_REQUEST,
    LOG_IN_FAILURE,
    LOG_IN_SUCCESS,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE,
    LOAD_USER_INFO_REQUEST,
    LOAD_USER_INFO_SUCCESS,
    LOAD_USER_INFO_FAILURE,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAILURE,
    UNFOLLOW_USER_REQUEST,
    UNFOLLOW_USER_SUCCESS,
    UNFOLLOW_USER_FAILURE,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWINGS_SUCCESS,
    LOAD_FOLLOWINGS_FAILURE,
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS,
    REMOVE_FOLLOWER_FAILURE,
    EDIT_NICKNAME_SUCCESS,
    EDIT_NICKNAME_FAILURE,
    EDIT_NICKNAME_REQUEST
} from "../reducers/user";
import axios from 'axios';

const HELLO_SAGA = 'HELLO_SAGA';

function loginAPI (data) {
    // 서버에 요청을 보내는 부분
    return axios.post('/users/login', data, {
        withCredentials: true, // 서로 쿠키를 주고받는 통신을 한다.
    });
}

function logger () {
    // ...
}

function* login (action) {
    try {
        const result = yield call(loginAPI, action.data); // axios의 결과는 result.data에 존재한다.
        yield put({ // put 은 dispatch와 동일
            type: LOG_IN_SUCCESS,
            data: result.data,
        })
    } catch (e){ // 로그인 실패시
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
            error: e.response.data,
        });
    }
}

// LOG_IN 을 받으면 LOG_IN_SUCCESS를 자동적으로 실행한다
// 반복문 내에 존재하지 않기때문에 1회만 받게됨.
function* watchLogin () {
    yield takeEvery(LOG_IN_REQUEST, login);
}

function* watchHello () {
    console.log('before saga');
    while (true) { // while true 문에 넣음으로써 무한으로 action에 대해 처리가가능
        yield take(HELLO_SAGA); // take내부에 아무액션을 넣어줄수있다.
        // HELLO_SAGA 라는 액션이 들어왔을때 yield가 재개된다.
        // take내부에 next()가 존재하기때문에 재개됨.

        console.log('after saga');
        // 비동기요청, 타이머작업 등..
    }

}

// takeEvery 가 while(true)를 대체한다.
// ACTION 과 generator함수를 정의
function* watchHelloTakeEvery () {
    yield takeLatest(HELLO_SAGA, function* () {
        yield delay(1000);
        yield put({
            type: 'BYE_SAGA'
        });
    });
}

function signUpApi(signUpData) {
    return axios.post('http://localhost:3065/api/users/', signUpData); // axios가 post 요청을 보낸다.
}

function* signUp (action) {
    try {
        yield call(signUpApi, action.data);// id, password, nickname이 들어있음.
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        });
    }
}



function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}


function logoutApi() {
    return axios.post('/users/logout', {},{
        withCredentials: true,
    }); // 로그아웃시엔 데이터가 필요없음
}

function* logout (action) {
    try {
        yield call(logoutApi);
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error: e,
        });
    }
}


function* watchLogout() {
    yield takeEvery(LOG_OUT_REQUEST, logout);
}


function loadUserApi() {
    return axios.get('/users/', {
        withCredentials: true,
    }); // 로그아웃시엔 데이터가 필요없음
}

function* loadUser () {
    try {
        const result = yield call(loadUserApi);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e,
        });
    }
}



function* watchLoadUser() {
    yield takeEvery(LOAD_USER_REQUEST, loadUser);
}


function loadUserInfoApi(id) {
    return axios.get(`/users/${id}`);
}

function* loadUserInfo (action) {
    try {
        const result = yield call(loadUserInfoApi, action.data);
        yield put({
            type: LOAD_USER_INFO_SUCCESS,
            data: result.data,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: LOAD_USER_INFO_FAILURE,
            error: e,
        });
    }
}

function* watchLoadUserInfo() {
    yield takeEvery(LOAD_USER_INFO_REQUEST, loadUserInfo);
}

function followApi (id) {
    return axios.post(`/users/${id}/follow`, {}, {
        withCredentials: true,
    });
}

function* follow (action) {
    try {
        const result = yield call(followApi, action.data);
        yield put({
            type: FOLLOW_USER_SUCCESS,
            data: result.data,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: FOLLOW_USER_FAILURE,
            error: e,
        });
    }
}

function* watchFollow () {
    yield takeEvery(FOLLOW_USER_REQUEST, follow);
}

function unFollowApi (id) {
    return axios.delete(`/users/${id}/follow`, {
        withCredentials: true,
    });
}

function* unFollow (action) {
    try {
        const result = yield call(unFollowApi, action.data);
        yield put({
            type: UNFOLLOW_USER_SUCCESS,
            data: result.data,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: UNFOLLOW_USER_FAILURE,
            error: e,
        });
    }
}

function* watchUnFollow () {
    yield takeEvery(UNFOLLOW_USER_REQUEST, unFollow);
}


function loadFollowersAPI (id, offset = 0, limit = 3) {
    return axios.get(`/users/${id || 0}/followers?offset=${offset}&limit=${limit}`, {
        withCredentials: true,
    });
}

function* loadFollowers (action) {
    try {
        const result = yield call(loadFollowersAPI, action.data, action.offset);
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadFollowers () {
    yield takeEvery(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function loadFollowingsAPI (id, offset = 0, limit = 3) {
    return axios.get(`/users/${id || 0}/followings?offset=${offset}&limit=${limit}`, {
        withCredentials: true,
    });
}

function* loadFollowings (action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data, action.offset);
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: e,
        });
    }
}

function* watchLoadFollowings () {
    yield takeEvery(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function removeFollowerAPI (id) {
    return axios.delete(`/users/${id}/follower`, {
        withCredentials: true,
    });
}

function* removeFollower (action) {
    try {
        const result = yield call(removeFollowerAPI, action.data);
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: e,
        });
    }
}

function* watchRemoveFollower () {
    yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function editNicknameAPI (nickname) {
    return axios.patch(`/users/nickname`, { nickname },  {
        withCredentials: true,
    });
}

function* editNickname (action) {
    try {
        const result = yield call(editNicknameAPI, action.data);
        yield put({
            type: EDIT_NICKNAME_SUCCESS,
            data: result.data,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: EDIT_NICKNAME_FAILURE,
            error: e,
        });
    }
}

function* watchEditNickname () {
    yield takeEvery(EDIT_NICKNAME_REQUEST, editNickname);
}

export default function* userSaga() {
    // yield all([
    //     fork(watchLogin),
    //     fork(helloSaga),
    // ]);

    // 여러개 등록할때 all을 사용함.
    // 기능상 문제가 되지는 않지만
    // 이 이벤트리스너는 순서가 있지않기때문에 fork를 사용한다.
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchLoadUser),
        fork(watchLoadUserInfo),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchRemoveFollower),
        fork(watchEditNickname),
    ]);
};
