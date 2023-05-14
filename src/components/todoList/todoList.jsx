import React from 'react';
import { useSelector } from 'react-redux';
import {Button} from "@mui/material";

import TodoItem from '../todoItem/todoItem';

import './todolist.css';

const TodoList = ({currentTodo, setCurrentTodo, setIsModalOpen, deletedIds, setDeletedIds, deleteSelectedHandler}) =>{
    const todos = useSelector((state) => state.todos);
    const activeBtnStatus = useSelector((state) => state.activeBtnStatus);

    return (
        <div className= 'todoList'>
            <div>
                <div className="to-do-list">
                <ul className='list-group'>
                    {todos.filter(todo =>
                            activeBtnStatus !== "all"?
                                activeBtnStatus === "todo"?
                                    todo.status === "todo"
                                    :activeBtnStatus === "inprogress"?
                                        todo.status === "inprogress"
                                        :todo.status === "completed"
                                :todo)
                        .map((todo) => (
                            <TodoItem
                                key = {todo.id}
                                id={todo.id}
                                currentTodo={currentTodo}
                                setCurrentTodo={setCurrentTodo}
                                title={todo.title}
                                description={todo.description}
                                status={todo.status}
                                setIsModalOpen={setIsModalOpen}
                                deletedIds={deletedIds}
                                setDeletedIds={setDeletedIds}
                            />
                        ))}
                </ul>
            </div>
                <div>
                    <Button variant="contained" onClick={deleteSelectedHandler}>Delete selected</Button>
                </div>
            </div>
        </div>
  );
}

export default TodoList;