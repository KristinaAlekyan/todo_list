import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import TodoList from './components/todoList/todoList';
import AddTodo from './components/addTodo/addTodo';
import TodoListStatus from './components/todoListStatus/todoListStatus';
import TodoModal from './components/modal/modal';
import {addTodo, deleteTodo, editTodo} from "./redux/todoSlice";

import './App.css';

const App = () =>{
    const [currentTodo, setCurrentTodo] = useState({title:"", description:"", status:""});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deletedIds, setDeletedIds]= useState([]);
    const [errorMessage,setErrorMessage]= useState({title:"", description:"", status:""});
    const todos = useSelector((state) => state.todos);

    const isCurrentTodoExist = !!currentTodo.id;

    const dispatch = useDispatch();

    const currentTodoChangeHandler = (type, value) => {
        let error ;
        switch (type) {
            case 'title':
                error = currentTodo.title.length > 3 && validItemRegex.test(currentTodo.title)
                        ? ''
                        : 'Title must be at least 5 characters long and start with capital letter!';
                break;
            case 'description':
                error = currentTodo.description.length > 3 && validItemRegex.test(currentTodo.description)
                        ? ''
                        : 'Description must be at least 5 characters long and start with capital letter!';
                break;
            case 'status':
                error = currentTodo.length < 8
                        ? 'Status is required'
                        : '';
                break;
            default:
                break;
        }
        setErrorMessage({...errorMessage, [type]: error});
        setCurrentTodo(prev => ({...prev, [type]: value}));
    }

    const validItemRegex = RegExp(/([A-Z][a-z0-9]+)+/);

    const validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach(value => value.length > 0 && (valid = false));
        return valid;
    };

    const handleSaveHandler = (event) => {
        event.stopPropagation();
        const todo={
            id: isCurrentTodoExist? currentTodo.id:new Date().getTime(),
            title: currentTodo.title,
            description: currentTodo.description,
            status: currentTodo.status,
        };

        if(validate(errorMessage)){
            (!isCurrentTodoExist)?dispatch(addTodo(todo)):dispatch(editTodo(todo));
            setCurrentTodo({title:"", description:"", status:""});
            setIsModalOpen(false);
        }
    };
    const deleteSelectedHandler = () => {
        for (let i = 0; i<deletedIds.length; i++){
            const id = deletedIds[i];
            dispatch(deleteTodo({id}));
        }
    }

    return (
        <div className="App">
            <div className="container">
                <AddTodo setIsModalOpen={setIsModalOpen}/>
                <TodoListStatus/>
                <TodoList
                    currentTodo={currentTodo}
                    setCurrentTodo={setCurrentTodo}
                    setIsModalOpen={setIsModalOpen}
                    deletedIds={deletedIds}
                    setDeletedIds={setDeletedIds}
                    deleteSelectedHandler={deleteSelectedHandler}
                />
                {
                    isModalOpen ?
                    <TodoModal
                        setIsModalOpen={setIsModalOpen}
                        isModalOpen={isModalOpen}
                        currentTodo={currentTodo}
                        currentTodoChangeHandler={currentTodoChangeHandler}
                        handleSaveHandler={handleSaveHandler}
                        isCurrentTodoExist={isCurrentTodoExist}
                        validate={validate}
                        errorMessage={errorMessage}
                    /> :
                    null
                }
            </div>
        </div>
  );
}

export default App;
