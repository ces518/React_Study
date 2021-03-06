import produce from 'immer';

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '준영',
        },
        content: '첫번째 게시글',
        Images: ['data:image/jpeg;base64,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'],
        comments: [],
    }], // 화면출력 포스트
    imagePaths: [], // 미리보기 이미지경로
    addPostErrorReason: '', // 포스틑 업로드 실패 사유
    isAddingPost: false, // 포스트 업로드중
    postAdded: false, // 포스트 업로드 성공
    isAddingComment: false, // 댓글 작성중
    addCommentErrorReason: '', // 댓글 작성실패 이유
    commentAdded: false, // 댓글 작성 성공
    hasMorePost: false,
    singlePost: null,
};

export const LOAD_MAIN_POSTS_REQUEST = 'LOAD_MAIN_POSTS_REQUEST';
export const LOAD_MAIN_POSTS_SUCCESS = 'LOAD_MAIN_POSTS_SUCCESS';
export const LOAD_MAIN_POSTS_FAILURE = 'LOAD_MAIN_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_POST_REQUEST: {
                draft.isAddingPost = true;
                draft.addPostErrorReason = '';
                draft.postAdded = false;
                break;
            }
            case ADD_POST_SUCCESS: {
                draft.isAddingPost = false;
                draft.mainPosts.unshift(action.data);
                draft.postAdded = true;
                draft.imagePaths = [];
                break;
            }
            case ADD_POST_FAILURE: {
                return {
                    ...state,
                    isAddingPost: false,
                    addPostErrorReason: action.error,
                    postAdded: false,
                }
            }
            case ADD_COMMENT_REQUEST: {
                return {
                    ...state,
                    isAddingComment: true,
                    addCommentErrorReason: '',
                    commentAdded: false,
                }
            }
            case ADD_COMMENT_SUCCESS: {
                /*
                * 불변성을 지켜줘야하기 때문에 로직이 복잡해짐
                * */
                const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
                draft.mainPosts[postIndex].Comments.push(action.data.comment);
                draft.isAddingComment = false;
                draft.commentAdded = true;
                break;
            }
            case ADD_COMMENT_FAILURE: {
                return {
                    ...state,
                    isAddingComment: false,
                    addCommentErrorReason: action.error,
                    commentAdded: false,
                }
            }
            case LOAD_COMMENTS_SUCCESS: {
                const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
                draft.mainPosts[postIndex].Comments = action.data.comments;
                break;
            }
            case LOAD_COMMENTS_REQUEST: {
                break;
            }
            case LOAD_USER_POSTS_REQUEST:
            case LOAD_HASHTAG_POSTS_REQUEST:
            case LOAD_MAIN_POSTS_REQUEST: {
                draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
                draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
                break;
            }
            case LOAD_USER_POSTS_SUCCESS:
            case LOAD_HASHTAG_POSTS_SUCCESS:
            case LOAD_MAIN_POSTS_SUCCESS: {
                return {
                    ...state,
                    mainPosts: state.mainPosts.concat(action.data),
                    hasMorePost: action.data.length === 10,
                }
            }
            case LOAD_COMMENTS_FAILURE:
            case LOAD_USER_POSTS_FAILURE:
            case LOAD_HASHTAG_POSTS_FAILURE:
            case LOAD_MAIN_POSTS_FAILURE: {
                return {
                    ...state,
                }
            }
            case UPLOAD_IMAGES_REQUEST: {
                break;
            }
            case UPLOAD_IMAGES_SUCCESS: {
                action.data.forEach((p) => {
                    draft.imagePaths.push(p);
                });
                break;
            }
            case UPLOAD_IMAGES_FAILURE: {
                break;
            }
            case REMOVE_IMAGE: {
                const index = draft.imagePaths.findIndex((v, i) => i === action.index);
                draft.imagePaths.splice(index, 1);
                break;
            }
            case LIKE_POST_REQUEST: {
                break;
            }
            case LIKE_POST_SUCCESS: {
                const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
                draft.mainPosts[postIndex].Likers.unshift({ id: action.data.userId });
                break;
            }
            case LIKE_POST_FAILURE: {
                return {
                    ...state,
                }
            }
            case UNLIKE_POST_REQUEST: {
                return {
                    ...state,
                }
            }
            case UNLIKE_POST_SUCCESS: {
                const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
                const likeIndex = draft.mainPosts[postIndex].Likers.findIndex(v => v.id !== action.data.userId);
                draft.mainPosts[postIndex].Likers.splice(likeIndex, 1);
                break;
            }
            case UNLIKE_POST_FAILURE: {
                return {
                    ...state,
                }
            }
            case RETWEET_REQUEST: {
                return {
                    ...state,
                }
            }
            case RETWEET_SUCCESS: { // 게시글 맨앞에 추가
                return {
                    ...state,
                    mainPosts: [action.data, ...state.mainPosts],
                }
            }
            case RETWEET_FAILURE: {
                return {
                    ...state,
                }
            }
            case REMOVE_POST_REQUEST: {
                return {
                    ...state,
                }
            }
            case REMOVE_POST_SUCCESS: { // 게시글 맨앞에 추가
                return {
                    ...state,
                    mainPosts: state.mainPosts.filter(post => post.id !== action.data),
                }
            }
            case REMOVE_POST_FAILURE: {
                return {
                    ...state,
                }
            }
            case LOAD_POST_REQUEST: {
                break;
            }
            case LOAD_POST_SUCCESS: {
                draft.singlePost = action.data;
                break;
            }
            case LOAD_POST_FAILURE: {
                break;
            }
            default: {
                return {
                    ...state,
                }
            }
        }
    });

};

export default reducer;
