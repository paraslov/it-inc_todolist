import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newSpanTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newSpanTitle, setNewSpanTitle] = useState('')

    function onInputChange(e: ChangeEvent<HTMLInputElement>) {
        setNewSpanTitle(e.currentTarget.value)
    }

    function onSpanDblClick() {
        setNewSpanTitle(props.title)
        setEditMode(true)
    }

    function onInputBlur() {
        props.onChange(newSpanTitle)
        setEditMode(false)
    }

    return (
        <>
            {editMode ?
                <input type="text"
                       value={newSpanTitle}
                       onBlur={onInputBlur}
                       onChange={onInputChange}
                       autoFocus/> :
                <span onDoubleClick={onSpanDblClick}>{props.title}</span>
            }
        </>
    )
}