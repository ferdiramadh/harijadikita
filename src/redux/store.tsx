import { createStore } from 'redux'
import reducer from './reducer'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './state/counter/counterSlice'
import rinperReducer from './state/rinper/rinperSlice'
import desainUndanganReducer from './state/desainundangan/desainUndanganSlice'
import userReducer from './state/userCredential/userCredentialSlice'
// const store = createStore(reducer)

// export default store
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        rinper: rinperReducer,
        desainUndangan: desainUndanganReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch