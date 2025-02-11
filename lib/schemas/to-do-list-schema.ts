import { array, number, object, string, union } from 'zod'

export const ToDoItemSchema = object({
    id: union([string(), number()]).optional(),
    name: string().min(2, {
        message: 'Title is required',
    }),
})

export const ToDoListSchema = object({
    id: union([string(), number()]).optional(),
    name: string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    items: array(ToDoItemSchema),
    itemName: string().min(2, {
        message: 'Item Name must be at least 2 characters.',
    }).optional()
})

