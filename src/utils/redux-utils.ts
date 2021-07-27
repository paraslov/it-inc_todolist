import {useDispatch} from 'react-redux'
import {ActionCreatorsMapObject, bindActionCreators} from 'redux'
import {useMemo} from 'react'
import {TAppDispatch} from '../app/store'

export const useAppDispatch = () => useDispatch<TAppDispatch>()

// useActions hook to use actions without dispatch
export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
    const dispatch = useDispatch()

    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}