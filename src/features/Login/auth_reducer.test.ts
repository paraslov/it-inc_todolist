import {authReducer, setIsAuth, TAuthReducerStateType} from './auth_reducer';

let startState: TAuthReducerStateType
beforeEach(() => {
    startState = {
        isAuth: false,
    }
})

test('should change isAuth prop', () => {
    const endState = authReducer(startState, setIsAuth(true))

    expect(endState.isAuth).toBeTruthy()
    expect(startState.isAuth).toBeFalsy()
})