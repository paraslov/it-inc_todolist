import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddCircle} from '@material-ui/icons';

export type TAddItemFormHelpers = {
    setNewTaskTitle: (title: string) => void
    setError: (error: string) => void
}

export type TAddItemFormProps = {
    disabled?: boolean
    label: string
    addNewItem: (newTaskTitle: string, helpers: TAddItemFormHelpers) => void
}

export const AddItemForm = React.memo(({label, addNewItem, disabled = false}: TAddItemFormProps) => {
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
        addNewItem(newTaskTitle.trim(), {setNewTaskTitle, setError})
    }, [newTaskTitle, addNewItem])
    const onTaskTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        setNewTaskTitle(e.currentTarget.value), [])
    const onTaskTitleKeyEnterPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError('') // any key press to clear error
        if (e.key === 'Enter') addNewItemCallback()
    }, [error, addNewItemCallback])

    return (
        <div style={{position: 'relative', width: '280px'}}>
            <TextField
                style={{width: '230px'}}
                disabled={disabled}
                value={newTaskTitle}
                label={label}
                variant={'outlined'}
                error={!!error}
                helperText={error}
                onChange={onTaskTitleChange}
                onKeyPress={onTaskTitleKeyEnterPress}/>
            <IconButton onClick={addNewItemCallback}
                        style = {{position: 'absolute', top: '0', right: '-10px', marginLeft: '5px'}}
                        disabled={disabled}>
                <AddCircle fontSize={'large'}/>
            </IconButton>
        </div>
    )
})