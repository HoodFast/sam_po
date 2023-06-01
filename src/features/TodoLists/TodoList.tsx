import React, {useEffect, useState} from "react";
import {AppUseDispatch, useAppSelector} from "../../App/store";
import {changeTaskStatusTC, createTaskTC, fetchTasks, removeTaskTC, updateTaskTC} from "./Tasks/task-reduser";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Grid,
    IconButton,
    Paper,
    Typography
} from "@mui/material";
import {changeFilterAC, FilterType, removeToDo, updateTodoTitleTC} from "./todoList-reducer";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Tasks/Task";
import {AddForm} from "../../components/AddForm/AddForm";
import {SuperSpan} from "../../components/SuperSpan/SuperSpan";
import {TaskStatuses, TaskType} from "../../api/todo-api";


type PropsType = {
    todoListId: string
    title: string
    filter: FilterType
}

export const TodoList: React.FC<PropsType> = ({
                                                  todoListId,
                                                  title,
                                                  filter
                                              }) => {

    const dispatch = AppUseDispatch()
    let tasks = useAppSelector(state => state.tasks)
    useEffect(() => {
        dispatch(fetchTasks(todoListId))
    }, [])
    const [openClose, setOpenClose] = useState(false)
    const openHandler = () => {
        setOpenClose(!openClose)
    }
    const deleteToDo = () => {
        dispatch(removeToDo(todoListId))
    }
    const updateTodoTitle = (newTitle: string) => {
        dispatch(updateTodoTitleTC(todoListId, newTitle))
    }

    const createTask = (taskTitle: string) => {
        dispatch(createTaskTC(todoListId, taskTitle))
        if (!openClose) {
            setOpenClose(!openClose)
        }

    }

    const deleteTask = (todoId: string, taskId: string) => {
        dispatch(removeTaskTC(todoId, taskId))
    }

    const updateTask = (todoId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todoId, taskId, title))
    }

    const updateStatusTask = (todoId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTC(todoId, taskId, status))
    }

    let filterTasks = tasks[todoListId]

    if (filter === 'active') {
        filterTasks = tasks[todoListId].filter(i => i.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        filterTasks = tasks[todoListId].filter(i => i.status === TaskStatuses.Completed)
    }


    const task = !!filterTasks && filterTasks.map(i => <Task
        key={i.id}
        taskId={i.id}
        todoId={i.todoListId}
        taskTitle={i.title}
        deleteTask={deleteTask}
        updateTask={updateTask}
        updateStatusTask={updateStatusTask}
        status={i.status}
    />)


    return (
        <Grid item style={{margin: '10px'}}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                }}
            >
                <Paper elevation={3}>
                    <div style={{display: "flex", justifyContent: 'flex-end'}}>
                        <IconButton size='small' onClick={deleteToDo}>
                            <DeleteIcon fontSize="inherit"/>
                        </IconButton>
                    </div>
                    <AddForm callBack={createTask}/>

                    <Accordion  expanded={openClose}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            onClick={openHandler}
                            id="panel1a-header"
                        >
                            <Typography>
                                <SuperSpan value={title} callback={updateTodoTitle}/>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {task}
                        </AccordionDetails>
                    </Accordion>


                    <Button onClick={() => dispatch(changeFilterAC(todoListId, 'all'))}>ALL</Button>
                    <Button onClick={() => dispatch(changeFilterAC(todoListId, 'active'))}>Active</Button>
                    <Button onClick={() => dispatch(changeFilterAC(todoListId, 'completed'))}>Completed</Button>
                </Paper>
            </Box>


        </Grid>


    )
}