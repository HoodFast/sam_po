import React from "react";
import {Button} from "@mui/material";
import {SuperSpan} from "../../../components/SuperSpan/SuperSpan";
import {TaskStatuses} from "../../../api/todo-api";

type TaskProps = {
    id:string
    taskTitle: string
    status:TaskStatuses
    deleteTask:(id:string)=>void
    updateTask:(taskId:string,title:string)=>void
    updateStatusTask:(taskId:string,status:TaskStatuses)=>void
}

export const Task: React.FC<TaskProps> = (
    {
        id,
        taskTitle,
        status,
        deleteTask,
        updateTask,
        updateStatusTask
    }) => {
    const deleteTaskHandler=()=>{
        deleteTask(id)
    }
    const updateTaskHandler=(title:string)=>{
        updateTask(id,title)
    }
    const changeStatusTask=()=>{
        const newStatus=status===TaskStatuses.InProgress?TaskStatuses.Completed:TaskStatuses.InProgress
        updateStatusTask(id,newStatus)
    }
    return (
        <div style={{margin:'10px', display:'flex'}}>
            <input onChange={changeStatusTask} type={"checkbox"} checked={status===TaskStatuses.InProgress?false:true} />
            <SuperSpan callback={updateTaskHandler} value={taskTitle}/>
            <Button onClick={deleteTaskHandler}>+</Button>
        </div>

    )
}