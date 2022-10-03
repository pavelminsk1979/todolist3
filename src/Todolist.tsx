import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {TasksStateType} from "./App";
import st from './Todolist.module.css'

type TodolistType = {
    title: string
    filterTasksState: Array<TasksStateType>
    removeTask: (idTask: string) => void
    changeFilter: (valueFilter: ValueFilterType) => void
    addedNewTask: (textInput: string) => void
}

export type ValueFilterType = 'all' | 'active' | 'completed'


export const Todolist = ({title, filterTasksState, removeTask, changeFilter, addedNewTask}: TodolistType) => {

    const [textInput, SetTextInput] = useState('')

    const removeTaskHandler = (idTask: string) => {
        removeTask(idTask)
    }

    const battonFilterHandler = (valueFilter: ValueFilterType) => {
        changeFilter(valueFilter)
    }

    const creatingTextInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        SetTextInput(event.currentTarget.value)
    }

    const addedNewTaskHandler = () => {
        if (textInput.trim() != '') {
            addedNewTask(textInput.trim().toUpperCase().repeat(2))
        }
        SetTextInput('')
    }

    const clickEnterAddedTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addedNewTaskHandler()
        }
    }


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    onKeyPress={clickEnterAddedTaskHandler}
                    value={textInput}
                    onChange={creatingTextInputHandler}
                />
                <button
                    onClick={addedNewTaskHandler}
                >creating
                </button>
            </div>
            <div>
                {
                    filterTasksState.map(elTask => {
                        return (
                            <div key={elTask.id}>
                                <input type='checkbox' checked={elTask.isDone}/>
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
                <button onClick={() => battonFilterHandler('all')}>ALL</button>
                <button onClick={() => battonFilterHandler('active')}>ACTIVE</button>
                <button onClick={() => battonFilterHandler('completed')}>COMPLETED</button>
            </div>
        </div>
    )
}