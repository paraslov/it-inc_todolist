import {useSelector} from 'react-redux'
import React, {useCallback, useEffect} from 'react'
import {TTodoListDomain} from './todolists_reducer'
import {Grid} from '@material-ui/core'
import {AddItemForm} from '../../components'
import {TodoList, todoListsActions} from './index'
import {Redirect} from 'react-router-dom'
import {selectTasks, selectTodoLists} from './selectors'
import {authSelectors} from '../Login'
import {TAddItemFormHelpers} from '../../components/AddItemForm/AddItemForm'
import {useActions, useAppDispatch} from '../../utils/redux-utils'

type PropsType = {
    demo?: boolean
}
export function TodoLists({demo = false}: PropsType) {
    console.log('TodoLists R')
    const dispatch = useAppDispatch()
    const isAuth = useSelector(authSelectors.selectIsAuth)

    const {fetchTodoLists} = useActions(todoListsActions)

    useEffect(() => {
        if(demo || !isAuth) return
        fetchTodoLists()
    }, [])

    //* TodoLists data declaration section  =============================================================>
    const todoLists = useSelector(selectTodoLists)

    //* Tasks data declaration section =====================================================================>
    const tasks = useSelector(selectTasks)

    //* Callbacks for TodoLists management  ====================================================================>

    const addNewTodolist = useCallback(async (newTodolistTitle: string, helpers: TAddItemFormHelpers) => {
        let res = await dispatch(todoListsActions.addTodoList({title: newTodolistTitle}))

        if(todoListsActions.addTodoList.rejected.match(res)) {
            if(res.payload?.errors?.length) {
                const error = res.payload.errors[0]
                helpers.setError(error)
            } else {
                helpers.setError('Some error occurred')
            }
        } else {
            helpers.setNewTaskTitle('')
        }

    }, [])

    if(!isAuth) return <Redirect to={'/login'} />

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm label={'Add TODO list'} addNewItem={addNewTodolist}/>
            </Grid>

            <Grid container spacing={2} style = {{flexWrap: 'nowrap', overflowX: 'scroll'}}>
                {todoLists.map((tl: TTodoListDomain) => {
                        return <Grid item key={tl.id}>
                            <div style={{width: '300px'}}>
                                <TodoList
                                    demo = {demo}
                                    todoList={tl}
                                    tasks={tasks[tl.id]}
                                />
                            </div>
                        </Grid>
                    }
                )}
            </Grid>
        </>
    )
}