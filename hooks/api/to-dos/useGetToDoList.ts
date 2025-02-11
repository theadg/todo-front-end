import { getList } from "@/lib/actions/to-dos.actions";
import { TODO_LIST_QUERY_KEY } from "@/lib/constants/to-dos";
import { ToDoList } from "@/types/to-do-list";
import { useQuery } from "@tanstack/react-query";

export const useGetToDoList = () => (
    useQuery<ToDoList | null>({
        queryKey: TODO_LIST_QUERY_KEY,
        queryFn: getList
    })
)