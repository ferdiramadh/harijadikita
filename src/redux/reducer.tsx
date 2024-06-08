import { combineReducers } from 'redux'
import { UserProps, UserReducer } from './UserRedux'

export interface RootStatex {
   USER: UserProps
}

const reducer = combineReducers(
    {
        USER: UserReducer
    }
)
export default reducer