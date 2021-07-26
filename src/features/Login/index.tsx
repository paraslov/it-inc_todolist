import * as authSelectors from './selectors'
import {Login} from './Login'
import {authAsyncActions} from './auth_reducer'
import {slice} from './auth_reducer'

const authActions = {
    ...authAsyncActions,
    ...slice.actions
}

export {
    authActions,
    authSelectors,
    Login,
}