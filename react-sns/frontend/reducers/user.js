export const initialState = {
    isLoggedIn: false,
    user: null,
    signUpData: null,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; // action의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const INCREMENT_NUMBER = ''; // 동기요청은 바로 응답이 되기때문

const dummyUser = {
    nickname: '박준영',
    post: [],
    following: [],
    follower: [],
}

export const loginAction = {
    type: LOG_IN_REQUEST,
    data: {

    }
};

export const logoutAction = {
    type: LOG_OUT_REQUEST,
}

export const signupAction = (data) => ({ // 바로 리턴하는함수는 소괄호로 사용
    type: SIGN_UP_REQUEST,
    data: data
});

export const signupSuccess = {
    type: SIGN_UP_SUCCESS,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST: {
            return {
                ...state,
                loginData: action.data,
                isLoading: true,
            }
        }
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,
                isLoading: false,
            }
        }
        case LOG_OUT_REQUEST: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
        case SIGN_UP_REQUEST: {
            return {
               ...state,
                signUpData: action.data,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;
