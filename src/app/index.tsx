import * as appSelectors from './selectors'
import {appAsyncActions} from './app_reducer'
import {slice} from './app_reducer'

const appActions = {
    ...appAsyncActions,
    ...slice.actions
}

const appReducer = slice.reducer

export {
    appReducer,
    appSelectors,
    appActions
}