import React, { createContext, useState } from 'react';

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    const addNestedTodo = (parentTodoId, newSubtask) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === parentTodoId) {
                return {
                    ...todo,
                    subtasks: [...todo.subtasks, newSubtask],
                };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, addNestedTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export { TodoContext, TodoProvider };