import { useContext } from "react";
import { createContext } from "react";


export const TodoContext = createContext({
    todos: [],
    addTodo: (todo) => {},
    removeTodo: (id) => {},
    toggleTodo: (id) => {},
    editTodo: (id, todo) => {}
});

export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;