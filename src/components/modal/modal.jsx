
import React from 'react';
import {
    Box,
    Button, FilledInput,
    FormControl, FormHelperText, InputAdornment,
    InputLabel, MenuItem,
    Modal,
    Select,
    TextField
} from '@mui/material';
import Error from '../error/error';

import './modal.css'

const TodoModal = ({  isModalOpen, setIsModalOpen, currentTodo, isCurrentTodoExist, currentTodoChangeHandler, handleSaveHandler, errorMessage}) => {
    const handleClose = (event) => {
        event.stopPropagation();
        setIsModalOpen(false);
    }

    const handleChange = (event, type) => {
        const {name, value} = event.target;
        currentTodoChangeHandler(name, value);
    }

    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box className="modalContainer" >
                <TextField id="standard-basic" label="Title" name="title" variant="standard" value={currentTodo.title} onChange={handleChange}/>
                <Error message={errorMessage.title}/>

                <TextField id="standard-basic" label="Description" name="description" variant="standard" value={currentTodo.description} onChange={handleChange}/>
                <Error message={errorMessage.description}/>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentTodo.status?currentTodo.status:"todo"}
                        label="status"
                        name="status"
                        onChange={handleChange}
                    >
                        <MenuItem value={"todo"}>todo </MenuItem>
                        <MenuItem value={"inprogress"}>in progres</MenuItem>
                        <MenuItem value={"completed"}>completed </MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={handleSaveHandler}>{!isCurrentTodoExist?"Add":"Edit"}</Button>
            </Box>
        </Modal>
    );
};

export default TodoModal;