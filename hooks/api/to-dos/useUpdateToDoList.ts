import { updateList } from "@/lib/actions/to-dos.actions";
import { ToDoList } from "@/types/to-do-list";
import { useMutation } from "@tanstack/react-query";

export const useCreateList = (list: ToDoList, id: string) => (
    useMutation({
        mutationFn: () => updateList(id, list)
    })
)