import { createStore } from 'redux'
import reducer from './reducer'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './state/counter/counterSlice'
// const store = createStore(reducer)

// export default store
export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch