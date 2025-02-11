'use client'

import ToDoForm from '@/components/forms/to-do-form'
import { useGetToDoList } from '@/hooks/api/to-dos/useGetToDoList'
import { Box, Button, CircularProgress, TextField } from '@mui/material'
import React from 'react'

const Page = () => {
    const { isLoading, isError, data, isSuccess } = useGetToDoList()

    if (isLoading) {
        return <CircularProgress />
    }

    if (isError || data === undefined) {
        return <p>Oops. Something went wrong</p>
    }

    return <ToDoForm list={data!} />
}

export default Page
