const initialState = {
    authData: null,
    loading: false,
    error: null,
    message: ''
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_START":
            return { ...state, loading: true, error: null };
        case "AUTH_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({ ...action.data }));
            return { ...state, authData: action.data, loading: false, error: null };
        case "AUTH_FAIL":
            return { ...state, loading: false, error: action.data };
        default:
            return state;
    }
};

export default authReducer;
