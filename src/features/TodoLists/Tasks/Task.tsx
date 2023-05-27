import React from "react";
import {Button} from "@mui/material";
import {SuperSpan} from "../../../components/SuperSpan/SuperSpan";

type TaskProps = {
    id:string
    taskTitle: string
    deleteTask:(id:string)=>void
    updateTask:(taskId:string,title:string)=>void
}

export const Task: React.FC<TaskProps> = (
    {
        id,
        taskTitle,
        deleteTask,
        updateTask
    }) => {
    const deleteTaskHandler=()=>{
        deleteTask(id)
    }
    const updateTaskHandler=(title:string)=>{
        updateTask(id,title)
    }
    return (
        <div style={{margin:'10px', display:'flex'}}>
            <input type={"checkbox"}/>
            <SuperSpan callback={updateTaskHandler} value={taskTitle}/>
            {/*<span> {taskTitle}</span>*/}
            <Button onClick={deleteTaskHandler}>+</Button>
        </div>

    )
}