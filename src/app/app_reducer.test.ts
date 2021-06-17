import {appReducer, TAppReducerState, setAppError, setAppInitialized, setAppStatus} from './app_reducer';

let startState: TAppReducerState

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isAppInitialized: false
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppError('some type of error occurred'))

    expect(endState.error).toBe('some type of error occurred')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatus('loading'))

    expect(endState.status).toBe('loading')
})

test('isAppInitialized should be changed to true', () => {
    const endState = appReducer(startState, setAppInitialized(true))

    expect(endState.isAppInitialized).toBeTruthy()
})