import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {todoAPI} from "./api/todo-api";

function App() {
    const [data, setData] = useState('')
    const [value, setValue] = useState({})



    const updateTitle = () => {
        todoAPI.updateToDoTitle('be6b02c1-3451-4e7f-ad45-d0d2d3ae666f', data).then((res) => {
            console.log(res)
        }).then(() => todoAPI.getToDoLists().then((res) => setValue(res.data[0].title)))
    }

    return (
        <div>
            {JSON.stringify(value)}
            <input value={data} onChange={(e) => setData(e.currentTarget.value)}/>
            <button onClick={updateTitle}>Click me</button>
        </div>
    );
}

export default App;
