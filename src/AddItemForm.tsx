import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';

type AddItemFormPropsType = {
    label: string
    addNewItem: (newTaskTitle: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    //* useState ===============================================================================================>
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState('')

    //* Callbacks for adding new task, onChange and keyPress events  ===========================================>
    const addNewItem = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required!')
            return
        }
        props.addNewItem(newTaskTitle.trim())
        setNewTaskTitle('')
    }
    const onTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const onTaskTitleKeyEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('') // any key press to clear error
        if (e.charCode === 13) addNewItem()
    }

    return (
        <div>
            <TextField value={newTaskTitle}
                       label={props.label}
                       variant={'outlined'}
                       error={!!error}
                       helperText={error}
                       onChange={onTaskTitleChange}
                       onKeyPress={onTaskTitleKeyEnterPress}/>
            <IconButton onClick={addNewItem}>
                <AddCircle fontSize={'large'}/>
            </IconButton>
        </div>
    )
}