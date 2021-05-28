import React, {useEffect, useState} from 'react'
import {Meta} from '@storybook/react';
import {todoListsAPI, TodoListType} from '../../api/todoLists_api';

export default {
    title: 'API/todo lists'
} as Meta


export const GetTodoLists = () => {
    const [state, setState] = useState<TodoListType[] | null>(null)

    useEffect(() => {
        todoListsAPI.getTodoLists()
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

export const PostTodoLists = () => {
    const [state, setState] = useState<any>(null)
    const [newTitle, setNewTitle] = useState('')

    const postTodoList = (title: string) => {
        todoListsAPI.postTodoList(title)
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

export const DeleteTodoLists = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState('')

    const deleteTL = (id: string) => {
        todoListsAPI.deleteTodoList(id)
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
                <button onClick={() => deleteTL(todoListId)}>delete TL</button>
            </div>
        </div>
    )
}

export const PutTodoLists = () => {
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
                    placeholder={'id of TL u want to delete'}
                    value={todoListId}
                    onChange={(e) => setTodoListId(e.currentTarget.value)}/>
                <input
                    type="text"
                    placeholder={'updated TL title'}
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={() => updateTL(todoListId, updatedTitle)}>update TL</button>
            </div>
        </div>
    )
}