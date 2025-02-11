'use client'

import { ToDoList } from '@/types/to-do-list'
import { IconButton, TextField } from '@mui/material'

import { CirclePlus } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const ToDoItemForm = () => {
    const {
        register,
        control,
        formState: { errors },
        getValues,
        resetField,
    } = useFormContext<ToDoList>()

    const { fields, append, remove, ...fieldArray } = useFieldArray({
        control,
        name: 'items',
        keyName: 'id',
    })

    return (
        <>
            <div>
                <TextField
                    id="standard-basic"
                    label="Enter New Task Here"
                    placeholder="Enter New Task Here"
                    {...register(`itemName`)}
                />
                <IconButton
                    aria-label="delete"
                    disabled={Boolean(getValues('itemName')?.length)}
                    onClick={() => {
                        append({
                            name: getValues('itemName')!,
                        })

                        resetField('itemName')
                    }}>
                    <CirclePlus />
                </IconButton>
            </div>
            {fields.map((item, index) => (
                <div key={item.id}>
                    <TextField
                        id="standard-basic"
                        variant="standard"
                        error={Boolean(errors?.items?.[index])}
                        helperText={errors?.items?.[index]?.message}
                        {...register(`items.${index}.name`)}
                    />

                    <button
                        type="button"
                        onClick={() => remove(index)}>
                        Delete
                    </button>
                </div>
            ))}
        </>
    )
}

export default ToDoItemForm
