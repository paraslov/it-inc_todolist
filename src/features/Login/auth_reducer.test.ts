import {authReducer, setIsAuth} from './auth_reducer'

let startState: any
beforeEach(() => {
    startState = {
        isAuth: false,
    }
})

test('should change isAuth prop', () => {
    const endState = authReducer(startState, setIsAuth({isAuth: true}))

    expect(endState.isAuth).toBeTruthy()
    expect(startState.isAuth).toBeFalsy()
})