import React, {useEffect, useState} from "react";
import {AppUseDispatch, useAppSelector} from "../../App/store";
import {fetchTasks} from "./Tasks/task-reduser";


type PropsType = {
    id: string
    title: string
}

export const TodoList: React.FC<PropsType> = ({
                                                  id,
                                                  title
                                              }) => {
    const [OnOff, setOnOff] = useState(false)
    const dispatch = AppUseDispatch()
    const tasks = useAppSelector(state => state.tasks)
    useEffect(() => {
        dispatch(fetchTasks(id))
    }, [])

    return (
        <div>
            <h2>{title}</h2>
            <div>{!!tasks[id] ? tasks[id].map(i => <div key={i.id}>{i.title}</div>) : ''}</div>
        </div>)
}