import * as AuthApi from '../api/AuthRequest'

export const logIn = (FormData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" })
    try {
        const { data } = await AuthApi.logIn(FormData)
        dispatch({ type: "AUTH_SUCCESS", data: data })
    } catch (error) {
        dispatch({ type: "AUTH_FAIL", data: error.data })
    }
}

export const signUp = (FormData) => async (dispatch) => {
    dispatch({ type: "AUTH_START" })
    try {
        const { data } = await AuthApi.signUp(FormData)
        dispatch({ type: "AUTH_SUCCESS", data: data })
    } catch (error) {
        dispatch({ type: "AUTH_FAIL", data: error.data })
    }
}