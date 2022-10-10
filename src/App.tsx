import React, {useState} from 'react';
import './App.css';
import {Todolist, ValueFilterType} from "./Todolist";
import {v1} from "uuid";

export type TasksStateType={
    id:string,
    title:string,
    isDone:boolean
}
function App() {
    const [tasks,SetTasks]=useState([
        {id:v1(),title:'Parol',isDone:true},
        {id:v1(),title:'Стишок',isDone:false},
        {id:v1(),title:'Phone nomber',isDone:true},
        {id:v1(),title:'English and Programming',isDone:false},
    ])
    const [filterValueActiv,SetFilterValueActiv] = useState<ValueFilterType>('all')

    const changeTaskCheckbox = (idTask: string,valueIsDone:boolean) => {
        SetTasks(tasks.map(e=>e.id===idTask
        ?{...e,isDone: valueIsDone}:e))
    }

    const addedNewTask = (textInput:string) => {
      const newTask={id:v1(),title:textInput,isDone:false}
        SetTasks([newTask,...tasks])
    }

    const removeTask = (idTask:string) => {
        SetTasks(tasks.filter(t=>t.id!=idTask))
    }

    const changeFilter = (valueFilter:ValueFilterType) => {
        SetFilterValueActiv(valueFilter)
    }
    let filterTasksState=tasks
    if(filterValueActiv=='active'){
        filterTasksState=filterTasksState.filter(e=>e.isDone)}
    if(filterValueActiv=='completed'){
        filterTasksState=filterTasksState.filter(e=>!e.isDone)}

    return (
        <div className="App">

    <Todolist
        filterValueActiv={filterValueActiv}
        changeTaskCheckbox={changeTaskCheckbox}
        addedNewTask={addedNewTask}
        changeFilter={changeFilter}
        removeTask={removeTask}
        filterTasksState={filterTasksState}
        title='What to learn'/>


        </div>
    );
}

export default App;

