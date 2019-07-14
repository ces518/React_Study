import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS
} from "../reducers/user";

//////// LOGIN
function loginAPI (nickname) {
}

function* login (action) {
    try {
        const result = yield call(loginAPI, action.data);
        yield put({
            type: LOGIN_SUCCESS,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: LOGIN_FAILURE,
            error: e,
        });
    }
}

function* watchLogin () {
    yield takeEvery(LOGIN_REQUEST, login);
}
///////////

/////////// LOGOUT
function logoutAPI (nickname) {
}

function* logout (action) {
    try {
        const result = yield call(logoutAPI, action.data);
        yield put({
            type: LOGOUT_SUCCESS,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: LOGOUT_FAILURE,
            error: e,
        });
    }
}

function* watchLogout () {
    yield takeEvery(LOGOUT_REQUEST, logout);
}
///////////


export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
    ]);
};
