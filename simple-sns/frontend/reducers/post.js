export const initialState = {
    posts: [{
        id: 1,
        title: '제목',
        content: '내용',
        User: {
            nickname: '박준영'
        },
        Images: [{
            src: 'http://mblogthumb3.phinf.naver.net/20120221_222/5mydolls_1329784981589aMA4A_JPEG/2012-02-14_13%3B34%3B42.jpg?type=w2'
        }],
        liked: false,
    }],
    uploadImages: [],
    addingPost: false, // 포스트 등록중
    postAdded: false, // 포스트 등록 완료
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST: {
            return {
                ...state,
                addingPost: true,
                postAdded: false,
            }
        }
        case ADD_POST_SUCCESS: {
            const maxId = state.posts[state.posts.length - 1].id;
            const nextId = maxId + 1;
            return {
                ...state,
                addingPost: false,
                postAdded: true,
                posts: [...state.posts, {
                    id: nextId,
                    title: `제목${nextId}`,
                    content: `내용${nextId}`,
                    User: {
                        nickname: '박준영'
                    },
                    Images: [{
                        src: 'http://mblogthumb3.phinf.naver.net/20120221_222/5mydolls_1329784981589aMA4A_JPEG/2012-02-14_13%3B34%3B42.jpg?type=w2'
                    }],
                    liked: false,
                }]
            }
        }
        case ADD_POST_FAILURE: {
            return {
                ...state,
                addingPost: false,
                postAdded: false,
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
