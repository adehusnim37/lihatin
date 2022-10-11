import { CREATE_LINK, GET_LINK, GET_LINKS_LIST, LINK_LOADING, RESET_LINKS, UPDATE_LINK } from '../../constants/links'

const initialState = {
    data: [],
    loading: false,
    errMsg: null,
    errField: null,
}

export default function links (state = initialState, action) {
    switch (action.type) {
        case GET_LINKS_LIST:
        case GET_LINK:
            return {
                ...state,
                data: action.payload.links,
                loading: action.payload.loading,
                errMsg: action.payload.errMsg,
                errField: action.payload.errField
            }

        case CREATE_LINK:
            return {
                ...state,
                data: action.payload.links,
                loading: action.payload.loading,
                errMsg: action.payload.errMsg,
                errField: action.payload.errField
            }

        case UPDATE_LINK:
            return {
                ...state,
                loading: action.payload.loading,
                errMsg: action.payload.errMsg,
                errField: action.payload.errField
            }

        case RESET_LINKS:
            return {
                ...state,
                data: [],
                loading: false,
            }

        case LINK_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }
}