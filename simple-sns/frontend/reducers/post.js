export const initialState = {
    posts: [],
    uploadImages: [],
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
