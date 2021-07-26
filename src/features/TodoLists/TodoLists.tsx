import {useSelector} from 'react-redux'
import React, {useCallback, useEffect} from 'react'
import {TTodoListDomain} from './todolists_reducer'
import {Grid} from '@material-ui/core'
import {AddItemForm} from '../../components'
import {TodoList, todoListsActions} from './index'
import {Redirect} from 'react-router-dom'
import {selectTasks, selectTodoLists} from './selectors'
import {authSelectors} from '../Login'
import {useActions} from '../../app/store'

type PropsType = {
    demo?: boolean
}
export function TodoLists({demo = false}: PropsType) {
    console.log('TodoLists R')
    const isAuth = useSelector(authSelectors.selectIsAuth)

    const {fetchTodoLists, addTodoList} = useActions(todoListsActions)

    useEffect(() => {
        if(demo || !isAuth) return
        debugger
        fetchTodoLists()
    }, [])

    //* TodoLists data declaration section  =============================================================>
    const todoLists = useSelector(selectTodoLists)

    //* Tasks data declaration section =====================================================================>
    const tasks = useSelector(selectTasks)

    //* Callbacks for TodoLists management  ====================================================================>

    const addNewTodolist = useCallback((newTodolistTitle: string) => {
        addTodoList({title: newTodolistTitle})
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