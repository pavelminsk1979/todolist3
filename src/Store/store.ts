import {combineReducers, legacy_createStore} from "redux";
import {taskReduser} from "../reducers/TaskReduser";
import {TodolistReducer} from "../reducers/TodolistReducer";

const rootReduser = combineReducers({
    tasks:taskReduser,
    todolists:TodolistReducer
})

export const store = legacy_createStore(rootReduser)

export type StoreStateType = ReturnType<typeof rootReduser>

// @ts-ignore
window.store = store