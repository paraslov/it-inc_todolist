import {appReducer, AppReducerStateType, setError, setStatus} from './app_reducer';

let startState: AppReducerStateType

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setError('some type of error occurred'))

    expect(endState.error).toBe('some type of error occurred')
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setStatus('loading'))

    expect(endState.status).toBe('loading')
})