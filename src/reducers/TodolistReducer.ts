import {TodolistState} from "../App";
import {v1} from "uuid";
import {ValueFilterType} from "../Todolist";


type TodolistReduserType=removeTodolistACType|addedTodolistACType|changeTitleTodolistACType|changeFilterTodolistACType

export const TodolistReducer = (state:TodolistState[],action:TodolistReduserType):TodolistState[] => {
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



type removeTodolistACType=ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (idTodolist:string) => {
  return{
      type:'REMOVE-TODOLIST',
      idTodolist
  }as const
}

type addedTodolistACType=ReturnType<typeof addedTodolistAC>

export const addedTodolistAC = (newTitleForTodolist:string) => {
    const idNewTodolist=v1()
  return{
      type:'ADDED-TODOLIST',
      idNewTodolist,
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