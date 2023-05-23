import React, {useEffect, useState} from 'react';
import logo from '../logo.svg';
import './App.css';
import {todoAPI} from "../api/todo-api";
import {ToDoLists} from "../features/TodoLists/ToDoLists";
import {AddToDoForm} from "../components/AddToDoForm/AddToDoForm";

function App() {


    return (
        <div>
            <AddToDoForm/>
           <ToDoLists/>
        </div>
    );
}

export default App;
