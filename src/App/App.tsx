import React from 'react';

import './App.css';

import {ToDoLists} from "../features/TodoLists/ToDoLists";
import {AddForm} from "../components/AddForm/AddForm";
import {AppUseDispatch} from "./store";
import {addTodo} from "../features/TodoLists/todoList-reducer";


function App() {
    return <ToDoLists/>
}

export default App;
