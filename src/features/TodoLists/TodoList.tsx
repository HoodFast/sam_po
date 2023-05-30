import React, {useEffect, useState} from "react";
import {AppUseDispatch, useAppSelector} from "../../App/store";
import {changeTaskStatusTC, createTaskTC, fetchTasks, removeTaskTC, updateTaskTC} from "./Tasks/task-reduser";
import {Box, Button, Grid, IconButton, Paper} from "@mui/material";
import {removeToDo} from "./todoList-reducer";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Tasks/Task";
import {AddForm} from "../../components/AddForm/AddForm";
import {SuperSpan} from "../../components/SuperSpan/SuperSpan";
import {TaskStatuses} from "../../api/todo-api";


type PropsType = {
    id: string
    title: string
}

export const TodoList: React.FC<PropsType> = ({
                                                  id,
                                                  title
                                              }) => {

    const dispatch = AppUseDispatch()
    const tasks = useAppSelector(state => state.tasks)
    useEffect(() => {
        dispatch(fetchTasks(id))
    }, [])


    const deleteToDo = () => {
        dispatch(removeToDo(id))
    }
    const updateTodoTitle = () => {

    }

    const createTask = (taskTitle: string) => {
        dispatch(createTaskTC(id, taskTitle))
    }

    const deleteTask = (taskId: string) => {
        dispatch(removeTaskTC(id, taskId))
    }

    const updateTask = (taskId: string, title: string) => {
        dispatch(updateTaskTC(id, taskId, title))
    }

    const updateStatusTask = (taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTC(id, taskId, status))
    }


    const task = tasks[id] && tasks[id].map(i => <Task
        key={i.id}
        id={i.id}
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
                    <h2 style={{display: 'flex', justifyContent: 'center'}}>
                        <span style={{verticalAlign: 'middle'}}>
                            <SuperSpan value={title} callback={updateTodoTitle}/>
                        </span>
                    </h2>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {task}
                    </div>


                </Paper>
            </Box>


        </Grid>


    )
}