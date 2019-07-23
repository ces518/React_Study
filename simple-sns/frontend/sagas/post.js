import { all, call, fork, put, takeEvery, delay } from 'redux-saga/effects';
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS } from "../reducers/post";

/////////// ADD_POST
function addPostAPI (data) {

}

function* addPost (action) {
    try {
        const result = yield call(addPostAPI, action.data);
        yield delay(3000);
        yield put({
            type: ADD_POST_SUCCESS,
        })
    } catch (e){
        console.error(e);
        yield put({
            type: ADD_POST_FAILURE,
            error: e,
        });
    }
}

function* watchAddPost () {
    yield takeEvery(ADD_POST_REQUEST, addPost);
}
///////////


export default function* postSaga() {
    yield all([
        fork(watchAddPost),
    ]);
};
