import React from "react";
import {Button, Typography} from "@mui/material";
import {SuperSpan} from "../../../components/SuperSpan/SuperSpan";
import {TaskStatuses} from "../../../api/todo-api";

type TaskProps = {
    taskId: string
    todoId: string
    taskTitle: string
    status: TaskStatuses
    deleteTask: (todoId: string, taskId: string) => void
    updateTask: (todoId: string, taskId: string, title: string) => void
    updateStatusTask: (todoId: string, taskId: string, status: TaskStatuses) => void
}

export const Task: React.FC<TaskProps> = (
    {
        taskId,
        todoId,
        taskTitle,
        status,
        deleteTask,
        updateTask,
        updateStatusTask
    }) => {
    const deleteTaskHandler = () => {
        deleteTask(todoId, taskId)
    }
    const updateTaskHandler = (title: string) => {
        updateTask(todoId, taskId, title)
    }
    const changeStatusTask = () => {
        const newStatus = status === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New
        updateStatusTask(todoId, taskId, newStatus)
    }
    return (
        <Typography>
            <input onChange={changeStatusTask} type={"checkbox"} checked={status === TaskStatuses.Completed}/>
            <SuperSpan callback={updateTaskHandler} value={taskTitle}/>
            <Button onClick={deleteTaskHandler}>x</Button>
        </Typography>

    )
}