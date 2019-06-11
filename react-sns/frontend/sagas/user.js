import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_FAILURE, LOG_IN_SUCCESS } from "../reducers/user";


function loginAPI () {
    // 서버에 요청을 보내는 부분
}

function* login () {
    try {
        yield call(loginAPI); // 로그인 성공시
        yield put({ // put 은 dispatch와 동일
            type: LOG_IN_SUCCESS,
        })
    } catch (e){ // 로그인 실패시
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
        });
    }
}

function* watchLogin () {
    yield takeLatest(LOG_IN, login);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
    ]);
};
