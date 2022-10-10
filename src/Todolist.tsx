import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TasksStateType} from "./App";
import st from './Todolist.module.css'

type TodolistType = {
    title: string
    filterTasksState: Array<TasksStateType>
    removeTask: (idTask: string) => void
    changeFilter: (valueFilter: ValueFilterType) => void
    addedNewTask: (textInput: string) => void
    changeTaskCheckbox:(idTask: string,valueIsDone:boolean)=>void
    filterValueActiv:ValueFilterType
}

export type ValueFilterType = 'all' | 'active' | 'completed'


export const Todolist = ({title, filterTasksState, removeTask, changeFilter, addedNewTask,changeTaskCheckbox,filterValueActiv}: TodolistType) => {

    const [textInput, SetTextInput] = useState('')
    const [errorNullText,setErrorNullText]=useState(false)

    const removeTaskHandler = (idTask: string) => {
        removeTask(idTask)
    }

    const battonFilterHandler = (valueFilter: ValueFilterType) => {
        changeFilter(valueFilter)
    }

    const creatingTextInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        SetTextInput(event.currentTarget.value)
        setErrorNullText(false)
    }

    const addedNewTaskHandler = () => {
        if (textInput.trim() != '') {
            addedNewTask(textInput.trim().toUpperCase().repeat(2))
            SetTextInput('')
        } else {setErrorNullText(true)}

    }

    const clickEnterAddedTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addedNewTaskHandler()
        }
    }

    const changeTaskCheckboxHandler = (idTask: string,valueIsDone:boolean) => {
        changeTaskCheckbox(idTask,valueIsDone)
    }


    return (
        <div>
            <h3>{title}</h3>
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