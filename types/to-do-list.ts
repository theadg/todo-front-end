import { ToDoListSchema } from '@/lib/schemas/to-do-list-schema'
import { z } from 'zod'

export type ToDoList = z.infer<typeof ToDoListSchema>
