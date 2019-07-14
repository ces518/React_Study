export const initialState = {
    posts: [],
    uploadImages: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;
