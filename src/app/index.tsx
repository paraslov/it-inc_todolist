import * as appSelectors from './selectors'
import {appAsyncActions} from './app_reducer'
import {slice} from './app_reducer'

const appActions = {
    ...appAsyncActions,
    ...slice.actions
}

export {
    appSelectors,
    appActions
}