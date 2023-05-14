import React from 'react';
import {Button, TextField} from '@mui/material';

import './addTodo.css';

const AddToDo = ({setIsModalOpen}) => {
    const onSubmit = (event) => {
        event.preventDefault();
        setIsModalOpen(true)
    };

    return (
        <form onSubmit={onSubmit}>
            <Button variant="contained"  sx={{ width: 200, margin: 2 }} onClick={onSubmit}>New todo</Button>
        </form>
    );
};

export default AddToDo;