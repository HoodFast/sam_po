import {useEffect, useState} from "react";
import {AppUseDispatch, RootStateType} from "../../App/store";
import { fetchToDoLists} from "./todoList-reducer";
import {useSelector} from "react-redux";
import {ToDoType} from "../../api/todo-api";
import {TodoList} from "./TodoList";


export const ToDoLists = () => {

    const dispatch = AppUseDispatch()
    let toDoLists = useSelector<RootStateType, ToDoType[]>((state) => state.toDoLists)

    useEffect(()=>{
        dispatch(fetchToDoLists())

    },[])

    const toDo = toDoLists.map(i => <TodoList key={i.id}
                                              id={i.id}
                                              title={i.title}
    />)
    return (
        <div>
            {toDo}
        </div>
    )
}