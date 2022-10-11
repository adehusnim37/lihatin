import { LOADING_USER, LOGOUT_USER, SET_USER } from '../../constants/users';

const initialState = {
    data: {},
    loading: false,
    errMsg: null,
    errField: null,
}

export default function users (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                data: action.payload.data,
                loading: action.payload.loading,
                errMsg: action.payload.errMsg,
                errField: action.payload.errField
            }

        case LOGOUT_USER:
            return {
                ...state,
                data: {},
                loading: false,
                errMsg: action.payload.errMsg,
            }

        case LOADING_USER:
            return {
                ...state,
                loading: !state.loading
            }

        default:
            return state
    }
}