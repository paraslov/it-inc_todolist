import thunkMW from 'redux-thunk'
import {configureStore} from '@reduxjs/toolkit'
import {rootReducer} from './rootReducer'


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMW)
})

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
        store.replaceReducer(rootReducer)
    })
}