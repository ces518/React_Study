export const initialState = {
    isLoggedIn: false,
    user: null,
    signUpData: null,
};

export const LOG_IN = 'LOG_IN'; // action의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_SUCCESS = 'SIGN_SUCCESS';

const dummyUser = {
    nickname: '박준영',
    post: [],
    following: [],
    follower: [],
}

export const loginAction = {
    type: LOG_IN,
    data: {

    }
};

export const logoutAction = {
    type: LOG_OUT,
}

export const signupAction = (data) => {
    return {
        type: SIGN_UP,
        data: data,
    }
};

export const signupSuccess = {
    type: SIGN_UP_SUCCESS,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: dummyUser,
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
        case SIGN_UP: {
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
