import {TaskStateType} from "../App";
import {addedTodolistACType, removeTodolistACType} from "./TodolistReducer";
import {v1} from "uuid";

type CommonActionType=DeleteTaskType|AddedTaskType|ChangeStatusTaskACType|ChangeTitleTaskACType|addedTodolistACType|removeTodolistACType

export const taskReduser = (state:TaskStateType,action:CommonActionType) => {
  switch (action.type){
      case 'DELETE-TASK':{
          return {...state,[action.idTodol]:state[action.idTodol].filter(
              e=>e.id!==action.idTask
              )}
      }
      case "ADDED-TASK":{
          return {...state,[action.idTodol]:[
                  {id: action.idTask,
                      title: action.titleTask,
                      isDone: false},...state[action.idTodol]]}
      }
      case "CHANGE-STATUS-TASK":{
          return {...state,[action.idTodol]:state[action.idTodol].map(e=>{
              return(
                  e.id===action.idTask?{...e,isDone:action.newStatusTask}:e
              )
              })}
      }
      case "CHANGE-TITLE-TASK":{
          return {...state,[action.idTodol]:state[action.idTodol].map(
              e=>e.id==action.idTask?{...e,title:action.newTitleTask}:e)}
      }
      case "ADDED-TODOLIST":{
          return {...state,[action.idNewTodolist]:[]}
      }
      case "REMOVE-TODOLIST":{
delete state[action.idTodolist]
          return {...state}
      }
      default:return state
  }
}

type DeleteTaskType=ReturnType<typeof deleteTaskAC>

export const deleteTaskAC=(idTodol:string,idTask:string)=>{
    return{
        type:'DELETE-TASK',
        idTodol,
        idTask
    }as const
}

type AddedTaskType=ReturnType<typeof addedTaskAC>

export const addedTaskAC=(idTodol:string,titleTask:string)=>{
    return{
        type:'ADDED-TASK',
        idTodol,
        idTask:v1(),
        titleTask,
    }as const
}

type ChangeStatusTaskACType=ReturnType<typeof changeStatusTaskAC>

export const changeStatusTaskAC=(idTodol:string,idTask:string,newStatusTask:boolean)=>{
    return{
        type:'CHANGE-STATUS-TASK',
        idTodol,
        idTask,
        newStatusTask
    }as const
}

type ChangeTitleTaskACType=ReturnType<typeof changeTitleTaskAC>

export const changeTitleTaskAC=(idTodol:string,idTask:string,newTitleTask:string)=>{
    return{
        type:'CHANGE-TITLE-TASK',
        idTodol,
        idTask,
        newTitleTask
    }as const
}