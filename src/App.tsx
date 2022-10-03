import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TasksStateType={
    id:number,
    title:string,
    isDone:boolean
}
function App() {
    const [tasks,SetTasks]=useState([
        {id:1,title:'Parol',isDone:true},
        {id:2,title:'Стишок',isDone:false},
        {id:3,title:'Phone nomber',isDone:true},
        {id:4,title:'English and Programming',isDone:false},
    ])

    const removeTask = (idTask:number) => {
        SetTasks(tasks.filter(t=>t.id!=idTask))
    }

    return (
        <div className="App">

    <Todolist
        removeTask={removeTask}
        tasks={tasks}
        title='What to learn'/>


        </div>
    );
}

export default App;

