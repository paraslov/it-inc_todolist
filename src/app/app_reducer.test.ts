import {appReducer, initializeApp, setAppError, setAppStatus} from './app_reducer'

let startState: any

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isAppInitialized: false
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppError({error: 'some type of error occurred'}))

    expect(endState.error).toBe('some type of error occurred')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading')
})

test('isAppInitialized should be changed to true', () => {
    const endState = appReducer(startState, initializeApp.fulfilled({isAppInitialized: true}, 'requestId0'))

    expect(endState.isAppInitialized).toBeTruthy()
})