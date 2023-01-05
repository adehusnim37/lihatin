import api from '../../services/api'
import toast from 'react-hot-toast';
import { GET_LINKS_LIST, CREATE_LINK, GET_LINK, UPDATE_LINK, LINK_LOADING } from '../../constants/links';

export const getLinks = () => {
    return async dispatch => {
        try {
            dispatch({ type: LINK_LOADING })
            const res = await api.get("/links")
            dispatch({
                type: GET_LINKS_LIST,
                payload: {
                    links: res.data.data,
                    loading: false,
                    errMsg: false,
                    errField: null
                },
            });
        } catch (error) {
            dispatch({
                type: GET_LINKS_LIST,
                payload: {
                    links: [],
                    loading: false,
                    errMsg: error.message
                },
            });
        }
    }
}

export const getLinkByShort = (short) => {
    return async dispatch => {
        try {
            dispatch({ type: LINK_LOADING })
            const res = await api.get(`/links/${short}`)
            dispatch({
                type: GET_LINK,
                payload: {
                    links: res.data.data,
                    loading: false,
                    errMsg: false
                }
            })
        } catch (error) {
            dispatch({
                type: GET_LINK,
                payload: {
                    links: null,
                    loading: false,
                    errMsg: error.message
                }
            })
        }
    }
}

export const createLink = (data) => {
    return async dispatch => {
        try {
            dispatch({ type: LINK_LOADING })
            const res = await api.post("/links", data)
            dispatch({
                type: CREATE_LINK,
                payload: {
                    links: res.data.data,
                    loading: false,
                    errMsg: false
                }
            })

            toast.success("Link created successfully")
            return res.data.data
        } catch (error) {
            dispatch({
                type: CREATE_LINK,
                payload: {
                    links: [],
                    loading: false,
                    errMsg: error.message,
                    errField: error.response.data.message
                }
            })
            toast.error("Failed to create link")
            throw Error("I'm an error")
        }
    }
}

export const updateLink = (data, id) => {
    return async dispatch => {
        try {
            dispatch({ type: LINK_LOADING })
            await api.put(`/links/${id}`, data)
            dispatch({
                type: UPDATE_LINK,
                payload: {
                    loading: false,
                    errMsg: false
                }
            })
            toast.success('Short link berhasil diupdate')
        } catch (error) {
            console.log(error.response.data.message);
            dispatch({
                type: UPDATE_LINK,
                payload: {
                    loading: false,
                    errMsg: error.message,
                    errField: error.response.data.message
                }
            })
            toast.error('Gagal untuk update data short link.')
            throw Error("I'm an error")
        }
    }
}