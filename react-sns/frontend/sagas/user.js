import { all, fork, takeLatest, takeEvery, call, put, take, delay } from 'redux-saga/effects';
import { LOG_IN, LOG_IN_FAILURE, LOG_IN_SUCCESS } from "../reducers/user";


const HELLO_SAGA = 'HELLO_SAGA';

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

// LOG_IN 을 받으면 LOG_IN_SUCCESS를 자동적으로 실행한다
// 반복문 내에 존재하지 않기때문에 1회만 받게됨.
function* watchLogin () {
    while (true) {
        yield take(LOG_IN);
        yield delay(2000);
        yield put({ // redux의 dispatch와 동일
            type: LOG_IN_SUCCESS,
        });
    }
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

function* watchSignup() {

}

export default function* userSaga() {
    // yield all([
    //     fork(watchLogin),
    //     fork(helloSaga),
    // ]);

    // 여러개 등록할때 all을 사용함.
    yield all([
        watchLogin(),
        // watchHello(),
        watchSignup(),
    ]);
};
