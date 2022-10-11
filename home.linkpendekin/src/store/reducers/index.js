import { combineReducers } from 'redux'

import links from './links'
import users from './users'

export default combineReducers({
    links, users
})