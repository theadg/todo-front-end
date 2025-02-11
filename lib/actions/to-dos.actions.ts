'use server'

import { ToDoList } from '@/types/to-do-list'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { LIST_ITEMS_TABLE, TODO_LIST_TABLE } from '../constants/to-dos'
import { QueryData } from '@supabase/supabase-js'

export const getList = async (): Promise<ToDoList | null> => {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from(TODO_LIST_TABLE)
            .select(
                `
                *,
                items:list_items!list_id(
                    id,
                    list_id,
                    name,
                    created_at
                ) 
            `
            )
            .order('created_at', { ascending: true }).single()

        if (error) {
            throw error
        }

        return data as ToDoList ?? null
    } catch (error) {
        console.error(error)

        return null
    }
}

export const createList = async (list: ToDoList) => {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase.from(TODO_LIST_TABLE).insert({
            name: list?.name,
        }).select().single()

        if (error) throw error

        list.items?.forEach(async (item) => {
            await supabase.from(LIST_ITEMS_TABLE).insert({
                id: data?.id,
                ...item
            })
        })


        return data
    } catch (error) {
        console.error('Error creating todo list:', error)
        return { data: null, error }
    } finally {
        revalidatePath('/protected/todos')
    }
}

export const updateList = async (id: number | string, list: ToDoList) => {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from(TODO_LIST_TABLE)
            .update({
                name: list.name
            })
            .eq('id', id)

        await supabase
            .from(LIST_ITEMS_TABLE)
            .delete()
            .eq('list_id', id)

        list.items?.forEach(async (item) => {
            await supabase.from(LIST_ITEMS_TABLE).insert({
                list_id: id,
                ...item
            })
        })

        if (error) throw error

        return data

    } catch (error) {
        console.error('Error updating list:', error)

        return { data: null, error }
    } finally {
        revalidatePath('/protected/todos')
    }
}


