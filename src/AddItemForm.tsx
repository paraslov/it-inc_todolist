import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
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
            <input value={newTaskTitle}
                   className={error ? 'error' : ''}
                   onChange={onTaskTitleChange}
                   onKeyPress={onTaskTitleKeyEnterPress}/>
            <button onClick={addNewItem}>+</button>
            {/*//* error message checking =================================>*/}
            {error ? <div className={'error'}>{error}</div> : false}
        </div>
    )
}