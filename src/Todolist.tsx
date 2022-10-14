import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TasksType} from "./App";
import st from './Todolist.module.css'

type TodolistType = {
    title: string
    filterTasksState: Array<TasksType>
    removeTask: (todoID: string,idTask: string) => void
    changeFilter: (todoID:string,valueFilter: ValueFilterType) => void
    addedNewTask: (todoID: string,textInput: string) => void
    changeTaskCheckbox:(todoID:string,idTask: string,valueIsDone:boolean)=>void
    filterValueActiv:ValueFilterType
    todoID:string
    deleteTololist:(todoID:string,)=>void
}

export type ValueFilterType = 'all' | 'active' | 'completed'


export const Todolist = ({title, filterTasksState, removeTask, changeFilter, addedNewTask,changeTaskCheckbox,filterValueActiv,todoID,deleteTololist}: TodolistType) => {

    const [textInput, SetTextInput] = useState('')
    const [errorNullText,setErrorNullText]=useState(false)

    const deleteTololistHundler=()=>{
        deleteTololist(todoID)
    }

    const removeTaskHandler = (idTask: string) => {
        removeTask(todoID,idTask)
    }

    const battonFilterHandler = (valueFilter: ValueFilterType) => {
        changeFilter(todoID,valueFilter)
    }

    const creatingTextInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        SetTextInput(event.currentTarget.value)
        setErrorNullText(false)
    }

    const addedNewTaskHandler = () => {
        if (textInput.trim() != '') {
            addedNewTask(todoID,textInput.trim().toUpperCase().repeat(2))
            SetTextInput('')
        } else {setErrorNullText(true)}

    }

    const clickEnterAddedTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addedNewTaskHandler()
        }
    }

    const changeTaskCheckboxHandler = (idTask: string,valueIsDone:boolean) => {
        changeTaskCheckbox(todoID,idTask,valueIsDone)
    }


    return (
        <div>
            <h3>{title}
                <button
                    onClick={deleteTololistHundler}
                    className={st.butDelTodolist}
                >DEL</button>
            </h3>

            <div>
                <input
                    className={errorNullText?st.frameInput:''}
                    onKeyPress={clickEnterAddedTaskHandler}
                    value={textInput}
                    onChange={creatingTextInputHandler}
                />
                <button
                    className={errorNullText?st.buttonRedNullText:''}
                    onClick={addedNewTaskHandler}
                >creating
                </button>
            </div>
            {errorNullText&&<div className={st.allert}>
            НЕОБХОДИМ И ОБСАЛЮТНО ОБЯЗАТЕЛЕН ТЕКСТ </div>}
            <div>
                {
                    filterTasksState.map(elTask => {
                        return (
                            <div key={elTask.id}>
                                <input
                                    onChange={(event)=>{changeTaskCheckboxHandler(
                                        elTask.id,event.currentTarget.checked)}}
                                    type='checkbox'
                                    checked={elTask.isDone}/>
                                <span>{elTask.title}</span>
                                <button
                                    className={st.removeButton}
                                    onClick={() => {
                                        removeTaskHandler(elTask.id)
                                    }}>☠
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <button className={filterValueActiv=='all'?st.buttonFilterActive:st.buttonFilterNotActive}
                    onClick={() => battonFilterHandler('all')}>ALL</button>
                <button className={filterValueActiv=='active'?st.buttonFilterActive:st.buttonFilterNotActive}
                    onClick={() => battonFilterHandler('active')}>ACTIVE</button>
                <button className={filterValueActiv=='completed'?st.buttonFilterActive:st.buttonFilterNotActive}
                    onClick={() => battonFilterHandler('completed')}>COMPLETED</button>
            </div>
        </div>
    )
}