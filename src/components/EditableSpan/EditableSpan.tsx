import React, {ChangeEvent, useCallback, useState} from 'react';
import {TextField} from '@material-ui/core';

export type EditableSpanPropsType = {
    title: string
    onChange: (newSpanTitle: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo(({onChange, title, disabled = false}: EditableSpanPropsType) => {
    console.log('ES R')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newSpanTitle, setNewSpanTitle] = useState('')

    const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewSpanTitle(e.currentTarget.value)
    }, [])

    const onSpanDblClick = useCallback(() => {
        if(disabled) return
        setNewSpanTitle(title)
        setEditMode(true)
    }, [title, disabled])

    const onInputBlur = useCallback(() => {
        onChange(newSpanTitle)
        setEditMode(false)
    }, [onChange, newSpanTitle])

    return (
        <>
            {editMode ?
                <TextField
                    value={newSpanTitle}
                    onBlur={onInputBlur}
                    onChange={onInputChange}
                    autoFocus/> :
                <span onDoubleClick={onSpanDblClick} style={{opacity: disabled ? '0.5' : undefined, wordBreak: 'break-word'}}>
                    {title}
                </span>
            }
        </>
    )
})