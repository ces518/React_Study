const dummyUser = {
    nickname: '박준영',
    post: [],
    following: [],
    follower: [],
};

export const initialState = {
    isLoggedIn: false, // 로그인여부
    isLoggingOut: false, // 로그아웃 시도중
    isLoggingIn: false, // 로그인 시도중
    loginErrorReason: '', // 로그인실패 이유
    signedUp: false, // 회원가입 성공 여부
    isSigningUp: false, // 회원가입 시도중
    signUpErrorReason: '', //회원가입실패사유
    me: null,
    followingList: [], // 팔로잉 목록
    followerList: [], // 팔로워목록
    userInfo: null, // 다른사람의 정보
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

export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'; // 중요한 액션, reducer의 단점때문에 어쩔수 없이 만든 액션

export const loginAction = {
    type: LOG_IN_REQUEST,
    data: {

    }
};

export const logoutAction = {
    type: LOG_OUT_REQUEST,
};

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
                me: dummyUser,
                isLoading: false,
            }
        }
        case LOG_IN_FAILURE: {
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            }
        }
        case LOG_OUT_REQUEST: {
            return {
                ...state,
                isLoggedIn: false,
                me: null,
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
