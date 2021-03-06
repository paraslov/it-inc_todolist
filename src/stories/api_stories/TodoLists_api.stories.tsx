import React, {useEffect, useState} from 'react'
import {Meta} from '@storybook/react';
import {todoListsAPI, TTodoList} from '../../api/todoLists_api';

export default {
    title: 'API/todo lists'
} as Meta


export const GetTodoLists = () => {
    const [state, setState] = useState<TTodoList[] | null>(null)

    useEffect(() => {
        todoListsAPI.fetchTodoLists()
            .then(data => {
                setState(data)
            })
    }, [])

    return (
        <div>
            {state ? state.map(tl => {
                return <div>
                    <div>title: {tl.title}</div>
                    <div>todolistId: {tl.id}</div>
                    <div>added date: {tl.addedDate}</div>
                    <div>order: {tl.order}</div>
                    <div>::====================================::</div>
                </div>
            }) : <div>loading...</div>}
        </div>
    )
}

export const PostTodoList = () => {
    const [state, setState] = useState<any>(null)
    const [newTitle, setNewTitle] = useState('')

    const postTodoList = (title: string) => {
        todoListsAPI.addTodoList(title)
            .then(data => {
                setState(data.data.item)
            })
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                type="text"
                placeholder={'enter new todo list title'}
                value={newTitle}
                onChange={(e) => setNewTitle(e.currentTarget.value)}/>
            <div>
                <button onClick={() => postTodoList(newTitle)}>Post todo list</button>
            </div>
        </div>

    )
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState('')

    const deleteTL = (id: string) => {
        todoListsAPI.removeTodoList(id)
            .then(data => {
                setState(data)
            })
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input
                    type="text"
                    placeholder={'id of TL u want to delete'}
                    value={todoListId}
                    onChange={(e) => setTodoListId(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={() => deleteTL(todoListId)}>Delete todo list</button>
            </div>
        </div>
    )
}

export const UpdateTodoList = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState('')
    const [updatedTitle, setUpdatedTitle] = useState('')

    const updateTL = (id: string, title: string) => {
        todoListsAPI.updateTodoList(id, title)
            .then(data => {
                console.log(data)
                setState(data)
            })
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input
                    type="text"
                    placeholder={'id of TL u want to update'}
                    value={todoListId}
                    onChange={(e) => setTodoListId(e.currentTarget.value)}/>
                <input
                    type="text"
                    placeholder={'updated TL title'}
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={() => updateTL(todoListId, updatedTitle)}>Update todo list</button>
            </div>
        </div>
    )
}