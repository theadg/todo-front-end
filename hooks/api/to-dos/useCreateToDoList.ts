import { createList } from "@/lib/actions/to-dos.actions";
import { TODO_LIST_QUERY_KEY } from "@/lib/constants/to-dos";
import { ToDoList } from "@/types/to-do-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Get QueryClient from the context
const queryClient = useQueryClient()

export const useCreateList = (list: ToDoList) => (
    useMutation({
        mutationFn: () => createList(list),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: TODO_LIST_QUERY_KEY })
    })
)