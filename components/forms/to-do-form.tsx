'use client'

import {
    EMPTY_LIST_LABEL,
    TODO_CANCEL_LABEL,
    TODO_MODES,
    TODO_SAVE_LABEL,
} from '@/lib/constants/to-dos'
import { ToDoList } from '@/types/to-do-list'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, TextField } from '@mui/material'

import { createList, updateList } from '@/lib/actions/to-dos.actions'
import { ToDoListSchema } from '@/lib/schemas/to-do-list-schema'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import ToDoItemForm from './to-do-item-form'

interface ToDoFormProps {
    list: ToDoList
}

const ToDoForm = ({ list }: ToDoFormProps) => {
    // for viewing of form
    const [mode, setMode] = useState(TODO_MODES.VIEW)

    // use form hooks
    const methods = useForm<ToDoList>({
        defaultValues: {
            id: list?.id ?? undefined,
            name: list?.name ?? '',
            items: list?.items ?? [],
        },
        resolver: zodResolver(ToDoListSchema),
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods

    const onSubmit: SubmitHandler<ToDoList> = (data: ToDoList) => {
        try {
            data?.id ? updateList(data?.id, data) : createList(data)
            toast.success(
                `Successfully ${data?.id ? 'updated' : 'created'} list`
            )
            setMode(TODO_MODES.VIEW)
        } catch (error) {
            toast.error('Oops! Something went wrong')
        }
    }

    return (
        <FormProvider {...methods}>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col">
                <TextField
                    id="standard-basic"
                    placeholder="TO DO LIST TITLE"
                    disabled={mode === TODO_MODES.VIEW}
                    variant="standard"
                    error={Boolean(errors?.name)}
                    helperText={errors?.name?.message}
                    {...register('name')}
                />

                {list?.items && mode !== TODO_MODES.EDIT ? (
                    <>
                        {list?.items?.map((item) => {
                            return (
                                <TextField
                                    key={item?.id}
                                    disabled
                                    label={item?.name}
                                />
                            )
                        })}
                    </>
                ) : mode === TODO_MODES.VIEW ? (
                    <p>{EMPTY_LIST_LABEL}</p>
                ) : (
                    <ToDoItemForm />
                )}

                {/* Form Buttons */}
                {mode === TODO_MODES.EDIT ? (
                    <>
                        <Button onClick={() => setMode(TODO_MODES.VIEW)}>
                            {TODO_CANCEL_LABEL}
                        </Button>
                        <Button type="submit">{TODO_SAVE_LABEL}</Button>
                    </>
                ) : (
                    <Button
                        type="button"
                        onClick={() => {
                            setMode(
                                mode === TODO_MODES.VIEW
                                    ? TODO_MODES.EDIT
                                    : TODO_MODES.VIEW
                            )
                        }}>
                        Edit
                    </Button>
                )}
            </Box>
        </FormProvider>
    )
}

export default ToDoForm
