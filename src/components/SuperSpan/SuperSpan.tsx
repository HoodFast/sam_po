import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type spanProps={
    value:string
    callback:(title:string)=>void
}


export const SuperSpan:React.FC<spanProps>=({value,callback})=>{
    const [open,setOpen]=useState(false)
    const [newTitle,setTitle]=useState(value)

    const openHandler=()=>{
        setOpen(true)
    }
    const closeHandler=()=>{
        setOpen(false)
        callback(newTitle)
    }
    const valueHandler=(e:ChangeEvent<HTMLInputElement>)=>{

        setTitle(e.currentTarget.value)
    }
    return(
            open ? <TextField value={newTitle} onChange={valueHandler} onBlur={closeHandler}/>:  <span onDoubleClick={openHandler} style={{margin:'10px'}}>{value}</span>

    )
}