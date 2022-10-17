import React from "react";
import {TasksType} from "./App";
import st from './Todolist.module.css'
import {TemplateForCreatingItem} from "./TemplateForCreatingItem";
import {TemplateForEditItem} from "./TemplateForEditItem";

type TodolistType = {
    title: string
    filterTasksState: Array<TasksType>
    removeTask: (todoID: string,idTask: string) => void
    changeFilter: (todoID:string,valueFilter: ValueFilterType) => void
    addedNewTask: (todoID: string,textInput: string) => void
    changeTaskCheckbox:(todoID:string,idTask: string,valueIsDone:boolean)=>void
    filterValueActiv:ValueFilterType
    todoID:string
    deleteTololist:(todoID:string)=>void
    editTitleTodolist:(todoID:string,editText:string)=>void
    editTitleTask:(todoID:string,idTask: string,editText:string)=>void
}

export type ValueFilterType = 'all' | 'active' | 'completed'


export const Todolist = ({title, filterTasksState, removeTask, changeFilter, addedNewTask,changeTaskCheckbox,filterValueActiv,todoID,deleteTololist,editTitleTodolist,editTitleTask}: TodolistType) => {

    const editTitleTaskHundler=(idTask: string,editText:string)=>{
        editTitleTask(todoID,idTask,editText)
    }

    const editTitleTodolistHundler = (editText:string) => {
        editTitleTodolist(todoID,editText)
    }

    const deleteTololistHundler=()=>{
        deleteTololist(todoID)
    }

    const removeTaskHandler = (idTask: string) => {
        removeTask(todoID,idTask)
    }

    const battonFilterHandler = (valueFilter: ValueFilterType) => {
        changeFilter(todoID,valueFilter)
    }

    const addedNewTaskHandler = (textInput: string) => {
        addedNewTask(todoID,textInput)
    }

    const changeTaskCheckboxHandler = (idTask: string,valueIsDone:boolean) => {
        changeTaskCheckbox(todoID,idTask,valueIsDone)
    }


    return (
        <div>
            <h3>
                <TemplateForEditItem
                  callback={editTitleTodolistHundler}
                title={title}
                />
                <button
                    onClick={deleteTololistHundler}
                    className={st.butDelTodolist}
                >DEL</button>
            </h3>

            <TemplateForCreatingItem
            callback={addedNewTaskHandler}
            />

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
                                <TemplateForEditItem
                                    callback={(editText:string) => {
                                        editTitleTaskHundler(elTask.id,editText)}}
                                title={elTask.title}
                                />
                                {elTask.title}
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