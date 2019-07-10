export const initialState = {
    info: {
        id: 0,
        nickname: '준영',
    }, // 로그인 정보
};


const reducer = (state = initialState, action) => {
    switch (action) {
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;
