import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';

export type AddItemFormPropsType = {
    label: string
    addNewItem: (newTaskTitle: string) => void
}

export const AddItemForm = React.memo(({label, addNewItem}: AddItemFormPropsType) => {
    console.log('AIF R')
    //* useState ===============================================================================================>
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState('')

    //* Callbacks for adding new task, onChange and keyPress events  ===========================================>
    const addNewItemCallback = useCallback(() => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required!')
            return
        }
        addNewItem(newTaskTitle.trim())
        setNewTaskTitle('')
    }, [newTaskTitle, addNewItem])
    const onTaskTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        setNewTaskTitle(e.currentTarget.value), [])
    const onTaskTitleKeyEnterPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError('') // any key press to clear error
        if (e.key === 'Enter') addNewItemCallback()
    }, [error, addNewItemCallback])

    return (
        <div>
            <TextField value={newTaskTitle}
                       label={label}
                       variant={'outlined'}
                       error={!!error}
                       helperText={error}
                       onChange={onTaskTitleChange}
                       onKeyPress={onTaskTitleKeyEnterPress}/>
            <IconButton onClick={addNewItemCallback}>
                <AddCircle fontSize={'large'}/>
            </IconButton>
        </div>
    )
})