import React, {useEffect, useState} from 'react'
import {Meta} from '@storybook/react';
import axios from 'axios';

export default {
    title: 'API/todo lists'
} as Meta

const settings = {
    withCredentials: true,
    headers: {
        'api-key': '00162dc2-204e-4559-bcf6-6384570c4ef5'
    }
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        console.log('get todo lists')
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return (
        <div>
            {state ? state.map((tl: any) => {
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
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: title}, settings)
            .then(res => {
                setState(res.data.data.item)
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
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
            .then(res => {
                setState(res.data)
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
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, settings)
            .then(res => {
                console.log(res)
                setState(res.data)
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