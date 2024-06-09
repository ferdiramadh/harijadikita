import { createStore } from 'redux'
import reducer from './reducer'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './state/counter/counterSlice'
import rinperReducer from './state/rinper/rinperSlice'
// const store = createStore(reducer)

// export default store
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        rinper: rinperReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch