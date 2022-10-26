import {TodolistState} from "../App";
import {v1} from "uuid";
import {ValueFilterType} from "../Todolist";


type TodolistReduserType=removeTodolistACType|addedTodolistACType|changeTitleTodolistACType|changeFilterTodolistACType

const initialState:TodolistState[] = []

export const TodolistReducer = (state:TodolistState[]=initialState,action:TodolistReduserType):TodolistState[] => {
switch (action.type){
    case 'REMOVE-TODOLIST':{
        return state.filter(e=>e.id!==action.idTodolist)
    }
    case "ADDED-TODOLIST":{
        return [{
            id:action.idNewTodolist, title: action.newTitleForTodolist,
            filter: 'all'},...state]
    }
    case "CHANGE-TITLE-TODOLIST":{
        return state.map(e=>e.id===action.idTodolist
        ?{...e,title:action.changeTitleForTodolist}:e)
    }
    case "CHANGE-FILTER-TODOLIST":{
        return state.map(e=>e.id===action.idTodolist
        ?{...e,filter:action.changeFilterForTodolist}:e)
    }
    default: return state
}
}



export type removeTodolistACType=ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (idTodolist:string) => {
  return{
      type:'REMOVE-TODOLIST',
      idTodolist
  }as const
}

export type addedTodolistACType=ReturnType<typeof addedTodolistAC>

export const addedTodolistAC = (newTitleForTodolist:string) => {

  return{
      type:'ADDED-TODOLIST',
      idNewTodolist:v1(),
      newTitleForTodolist
  }as const
}

type changeTitleTodolistACType=ReturnType<typeof changeTitleTodolistAC>

export const changeTitleTodolistAC = (
    idTodolist:string,changeTitleForTodolist:string) => {
    return{
      type:'CHANGE-TITLE-TODOLIST',
        idTodolist,
        changeTitleForTodolist

  }as const
}

type changeFilterTodolistACType=ReturnType<typeof changeFilterTodolistAC>

export const changeFilterTodolistAC = (
    idTodolist:string,changeFilterForTodolist:ValueFilterType) => {
    return{
      type:'CHANGE-FILTER-TODOLIST',
        idTodolist,
        changeFilterForTodolist

  }as const
}