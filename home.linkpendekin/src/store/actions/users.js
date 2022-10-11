import api from '../../services/api'
import toast from "react-hot-toast"
import { RESET_LINKS } from "../../constants/links"
import { LOGOUT_USER, SET_USER, LOADING_USER } from "../../constants/users"

export const login = (data) => {
    return async dispatch => {
        try {
            dispatch({ type: LOADING_USER })
            let res = await api.post("/auth/login", data)
            localStorage.setItem("token", JSON.stringify({ ...res.data.data, email: data.email }))
            dispatch({
                type: SET_USER,
                payload: {
                    data: res.data.data.user,
                    loading: false,
                    errMsg: null,
                    errField: null
                }
            })
            toast.success("Login berhasil")
        } catch (error) {
            dispatch({
                type: SET_USER,
                payload: {
                    data: null,
                    loading: false,
                    errMsg: error.message,
                    errField: error.response.data.message
                }
            })
            toast.error("Login gagal")
            throw Error("I'm an error")
        }
    }
}

export const register = (data) => {
    return async dispatch => {
        try {
            dispatch({ type: LOADING_USER })
            const res = await api.post("/auth/register", data)
            localStorage.setItem("token", JSON.stringify({ ...res.data.data, email: data.email }))
            dispatch({
                type: SET_USER,
                payload: {
                    data: res.data.data.user,
                    loading: false,
                    errMsg: null,
                    errField: null
                }
            })
            toast.success("Register berhasil")
        } catch (error) {
            console.log(error);
            dispatch({
                type: SET_USER,
                payload: {
                    data: null,
                    loading: false,
                    errMsg: error.message,
                    errField: error.response.data.message
                }
            })
            toast.error("Register gagal")
            throw Error("I'm an error")
        }
    }
}

export const setUser = () => {
    return async dispatch => {
        try {
            dispatch({ type: LOADING_USER })
            const res = await api.get("/auth/me")
            dispatch({
                type: SET_USER,
                payload: {
                    data: res.data.data,
                    loading: false,
                    errMsg: null,
                    errField: null
                }
            })
        } catch (error) {
            dispatch({
                type: SET_USER,
                payload: {
                    data: null,
                    loading: false,
                    errMsg: error.message,
                    errField: error.response.data.message
                }
            })
            throw Error("I'm an error")
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        try {
            dispatch({ type: LOADING_USER })
            await api.post("/auth/logout")
            dispatch({
                type: LOGOUT_USER,
                payload: {
                    data: null,
                    loading: false,
                    errMsg: null
                }
            })
            dispatch({ type: RESET_LINKS })
            toast.success("Logout berhasil")
        } catch (error) {
            dispatch({
                type: LOGOUT_USER,
                payload: {
                    data: null,
                    loading: false,
                    errMsg: error.message
                }
            })
            toast.error("Logout gagal")
            throw Error("I'm an error")
        }
    }
}