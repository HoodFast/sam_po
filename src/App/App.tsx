import React from 'react';

import './App.css';

import {ToDoLists} from "../features/TodoLists/ToDoLists";
import {AppUseDispatch, RootStateType} from "./store";
import {Container, LinearProgress} from "@mui/material";
import {AddForm} from "../components/AddForm/AddForm";
import {addTodo} from "../features/TodoLists/todoList-reducer";
import {statusType} from "./app-reduser";
import {useSelector} from "react-redux";


function App() {
    const dispatch = AppUseDispatch()
    const status = useSelector<RootStateType, statusType>((state) => state.app.status)
    const addNewTodo = (NewTitle: string) => {
        dispatch(addTodo(NewTitle))
    }

    return <Container maxWidth="sm">
        <AddForm callBack={addNewTodo}/>
        {status === 'loading' && <LinearProgress/>}
        <ToDoLists/>
    </Container>

}

export default App;
