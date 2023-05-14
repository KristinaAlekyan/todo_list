import {useDispatch, useSelector} from 'react-redux';
import { deleteTodo} from '../../redux/todoSlice';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import {Accordion, AccordionDetails, AccordionSummary, TextField, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneIcon from '@mui/icons-material/Done';
import ReplayIcon from '@mui/icons-material/Replay';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape'

import './todoItem.css'
import React from "react";

const TodoItem = ({ id, title, description,  status, currentTodo, setCurrentTodo, setIsModalOpen, deletedIds, setDeletedIds }) => {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);

    const handleDeleteClick = () => {
        dispatch(deleteTodo({ id }));
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        setIsModalOpen(true);
        const currentTodo = todos.find(i => i.id === id);
        setCurrentTodo(currentTodo);
    }

    const handleSelectClick = (event) => {
        event.stopPropagation();
        deletedIds.push(id);
        setDeletedIds(deletedIds);
    }

    const date = new Date(id);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth()+1;
    const day = date.getUTCDay();
    const time = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return (
        <>
            <Accordion className="todoItemAccordion">
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <ListItem
                        key={id}
                        disablePadding
                    >
                        <ListItemButton role={undefined} >
                            <ListItemIcon >
                                <Checkbox
                                    onClick={handleSelectClick}
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>

                            <ListItemText id={id} primary={title}  className={`text-success ${status=="completed" ? "todoItemText":""}`} />

                            {status === "completed"?
                                (<ListItemIcon sx={{ color: "blue"}}>
                                    <DoneIcon />
                                </ListItemIcon>)
                                :(status === "inprogress"?
                                    (<ListItemIcon  sx={{ color: ""}}>
                                        <ReplayIcon />
                                    </ListItemIcon>)
                                    :
                                    (<ListItemIcon  sx={{ color: ""}}>
                                        <CropLandscapeIcon />
                                    </ListItemIcon>))
                            }

                            <ListItemIcon onClick={handleEditClick}>
                                <EditTwoToneIcon />
                            </ListItemIcon>

                            <ListItemIcon onClick={handleDeleteClick}>
                                <DeleteIcon />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="todoItemDescription">
                        <div>Description</div>
                        <Typography >
                            {`${year} / ${month} / ${day} - ${time}:${minutes}:${seconds}`}
                        </Typography>

                    </div>
                        <Typography >
                            {description}
                        </Typography>

                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default TodoItem;