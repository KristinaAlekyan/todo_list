import './todoListStatus.css';
import {Button} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {changeStatus} from "../../redux/activeStatusSlice";

const TodoListStatus = () =>{
    const dispatch = useDispatch();
    const activeBtnStatus = useSelector((state) => state.activeBtnStatus);

    const handleChangeStatus = (value) => {
        dispatch(changeStatus(value));
    };

    const changeHandler = (type) => () => handleChangeStatus(type);

    return (
        <div className="todoListStatusContainer">
            <Button style={{backgroundColor: 'all' === activeBtnStatus ?  "#1976d2" : "", color: 'all' === activeBtnStatus ?  "white" : ""}}
                    variant="outlined" onClick={changeHandler('all')} value="all">All</Button>
            <Button style={{backgroundColor: 'todo' === activeBtnStatus ?  "#1976d2" : "", color: 'todo' === activeBtnStatus ?  "white" : "" }}
                    variant="outlined" onClick={changeHandler('todo')} value="todo">todo</Button>
            <Button style={{backgroundColor: 'inprogress' === activeBtnStatus ?  "#1976d2" : "", color: 'inprogress' === activeBtnStatus ?  "white" : "" }}
                    variant="outlined" onClick={changeHandler('inprogress')} value="progress">In Progress</Button>
            <Button style={{backgroundColor: 'completed' === activeBtnStatus ?  "#1976d2" : "", color: 'completed' === activeBtnStatus ?  "white" : ""}}
                    variant="outlined" onClick={changeHandler('completed')} value="completed">Completed</Button>
        </div>
    );
}

export default TodoListStatus;