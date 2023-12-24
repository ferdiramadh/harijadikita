import { combineReducers } from 'redux'


const initialUserState = {}


const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'REGISTER':
            return action.results
        case 'LOGIN':
            return action.results
        case 'LOGOUT':
            return state = {}
        default: return state
    }
}

const reducer = combineReducers(
    {
        userReducer
    }
)
export default reducer