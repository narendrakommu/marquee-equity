import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { TodoContext } from '../contexts/TodoContext';
import { sanitize } from 'dompurify';
import '../styles/Dashboard.scss';

const Dashboard = () => {
    const { logout } = useContext(AuthContext);
    const { todos, addTodo, addNestedTodo } = useContext(TodoContext);
    const [todoInput, setTodoInput] = useState('');
    const [subTaskInputs, setSubTaskInputs] = useState([]);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    const handleAddTodo = (e) => {
        e.preventDefault();
        if (todoInput.trim() === '') return;
        const sanitizedTodoInput = sanitize(todoInput);
        const newTodo = {
            id: Date.now(),
            title: sanitizedTodoInput,
            subtasks: [],
        };
        addTodo(newTodo);
        setTodoInput('');
    };

    const handleAddSubtask = (e) => {
        e.preventDefault();
        const selectedSubTaskIndex = subTaskInputs.findIndex(ele => ele.todoId === selectedTodoId);
        if (selectedSubTaskIndex > -1) {
            const selectedSubTaskInput = subTaskInputs[selectedSubTaskIndex].subTaskInput || '';
            if (selectedSubTaskInput.trim() === '' || !selectedTodoId) return;
            const sanitizedSubtaskInput = sanitize(selectedSubTaskInput);
            const newSubtask = {
                id: Date.now(),
                title: sanitizedSubtaskInput,
            };
            addNestedTodo(selectedTodoId, newSubtask);
            setSubTaskInputs(prevVals => {
                prevVals.splice(selectedSubTaskIndex, 1);
                return [...prevVals];
            })
        }
    };

    const onSubTaskChange = (subTaskValue, todoId) => {
        setSubTaskInputs(prevVals => {
            const subTaskIndex = prevVals.findIndex(ele => ele.todoId === todoId);
            if (subTaskIndex > -1) {
                prevVals[subTaskIndex].subTaskInput = subTaskValue;
                return [...prevVals];
            }
            return [...prevVals, { subTaskInput: subTaskValue, todoId }];
        })
    }

    return (
        <div className="dashboard-container">
            <div className='dashboard-header'>
                <h2 className="dashboard-heading">Dashboard</h2>
                <button className="logout-button" onClick={logout}>Logout</button>
            </div>
            <h3>Todos</h3>
            <form className="todo-form" onSubmit={handleAddTodo}>
                <input
                    className="todo-input"
                    type="text"
                    placeholder="Enter a new todo"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                />
                <button className="todo-button" type="submit">Add Todo</button>
            </form>

            <ul className="todo-list">
                {todos.map((todo) => (
                    <li className="todo-item" key={todo.id}>
                        {todo.title}
                        <ul>
                            {todo.subtasks.map((subtask) => (
                                <li style={{ margin: 5 }} key={subtask.id}>{subtask.title}</li>
                            ))}
                        </ul>
                        <form className="subtask-form" onSubmit={handleAddSubtask}>
                            <input
                                className="subtask-input"
                                type="text"
                                placeholder="Enter a new subtask"
                                value={subTaskInputs.find(ele => ele.todoId === todo.id)?.subTaskInput || ''}
                                onChange={(e) => onSubTaskChange(e.target.value, todo.id)}
                            />
                            <button
                                className="subtask-button"
                                type="submit"
                                onClick={() => setSelectedTodoId(todo.id)}
                            >
                                Add Subtask
                            </button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    );


};

export default Dashboard;