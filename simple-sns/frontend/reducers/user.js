export const initialState = {
    info: null, // 로그인 정보
    isLoggingIn: false, //로그인 시도중 상태값

};

const dummyUser = {
    id: 0,
    nickname: '준영',
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                isLoggingIn: true,
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                isLoggingIn: false,
                info: dummyUser,
            }
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                isLoggingIn: false,
            }
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                info: null,
            }
        }
        case LOGOUT_FAILURE: {
            return {
                ...state,
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
