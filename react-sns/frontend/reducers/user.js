export const initialState = {
    isLoggedIn: false,
    user: null
};

export const LOG_IN = 'LOG_IN'; // action의 이름
export const LOG_OUT = 'LOG_OUT';

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
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;
