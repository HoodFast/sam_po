import React, {useEffect, useState} from "react";
import {AppUseDispatch, RootStateType} from "../../App/store";
import {addTodo, fetchToDoLists, ToDoDomainType} from "./todoList-reducer";
import {useSelector} from "react-redux";

import {TodoList} from "./TodoList";
import {Grid} from "@mui/material";
import {AddForm} from "../../components/AddForm/AddForm";


export const ToDoLists = () => {

    const dispatch = AppUseDispatch()
    let toDoLists = useSelector<RootStateType, ToDoDomainType[]>((state) => state.toDoLists)

    useEffect(() => {
        dispatch(fetchToDoLists())

    }, [])

    const addNewTodo = (NewTitle: string) => {
        const thunk=addTodo(NewTitle)
        dispatch(thunk)
    }

    const toDo = toDoLists.map(i => <TodoList key={i.id}
                                              todoListId={i.id}
                                              title={i.title}
                                              filter={i.filter}

    />)
    return (
        <>
            <AddForm callBack={addNewTodo}/>
            <Grid container >
                {toDo}
            </Grid>
        </>

    )
}