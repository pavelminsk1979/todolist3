import React from "react";
import {TasksStateType} from "./App";
import st from './Todolist.module.css'

type TodolistType={
    title:string
    tasks:Array<TasksStateType>
    removeTask:(idTask:number)=>void
}


export const Todolist = ({title,tasks,removeTask}:TodolistType) => {

    const removeTaskHandler = (idTask:number) => {
        removeTask(idTask)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>creating</button>
            </div>
            <div>
                {
                    tasks.map(elTask=>{
                        return(
                            <div key={elTask.id}>
                                <input type='checkbox' checked={elTask.isDone}/>
                                <span>{elTask.title}</span>
                                <button
                                    className={st.removeButton}
                                    onClick={()=>{removeTaskHandler(elTask.id)}}>☠</button>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <button>ALL</button>
                <button>ACTIVE</button>
                <button>COMPLETED</button>
            </div>
        </div>
    )
}