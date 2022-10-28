import React, {useCallback} from 'react';
import './App.css';
import {Todolist, ValueFilterType} from "./Todolist";
import {TemplateForCreatingItem} from "./TemplateForCreatingItem";
import MenuAppBar from "./MaterialUiCommon/AppBar";
import {Container, Grid,Paper} from "@mui/material";
import {
    addedTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
} from "./reducers/TodolistReducer";
import {addedTaskAC, changeStatusTaskAC, changeTitleTaskAC, deleteTaskAC} from "./reducers/TaskReduser";
import {useDispatch, useSelector} from "react-redux";
import {StoreStateType} from "./Store/store";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

export type TodolistState = {
    id: string
    title: string
    filter: ValueFilterType
}

export type TaskStateType = {
    [key: string]: TasksType[]
}


function App() {

    const  dispatch = useDispatch()
    const tasks = useSelector<StoreStateType,TaskStateType>(
        (state)=>state.tasks)
    const todolists = useSelector<StoreStateType,TodolistState[]>(
        (state)=>state.todolists)


    const editTitleTask =useCallback( (todoID: string, idTask: string, editText: string) => { dispatch(changeTitleTaskAC(todoID,idTask,editText))
    },[])

    const editTitleTodolist =useCallback( (todoID: string, editText: string) => {
        dispatch(changeTitleTodolistAC(todoID,editText))
    },[])

    const addedNewTodolist = useCallback((textInput: string) => {
        dispatch(addedTodolistAC(textInput))
    },[])

    const deleteTololist =useCallback( (todoID: string,) => {
        dispatch(removeTodolistAC(todoID))
    },[])

    const removeTask =useCallback( (todoID: string, idTask: string) => {
        dispatch(deleteTaskAC(todoID,idTask))
    },[])

    const addedNewTask =useCallback( (todoID: string, textInput: string) => {
        dispatch(addedTaskAC(todoID,textInput))
    },[])

    const changeTaskCheckbox =useCallback( (todoID: string, idTask: string, valueIsDone: boolean) => {
        dispatch(changeStatusTaskAC(todoID,idTask,valueIsDone))
    },[])


    const changeFilterTodolist =useCallback( (todoID: string, valueFilter: ValueFilterType) => {
        dispatch(changeFilterTodolistAC(todoID,valueFilter))
    },[])


    return (
        <div className="App">

            <MenuAppBar/>
            <Container fixed>
                <Grid container style={{padding:'10px'}}>
                <TemplateForCreatingItem
                    callback={addedNewTodolist}
                />
            </Grid>
                <Grid container spacing={3}>
                {
                    todolists.map(tod => {

                        let filterTasksState = tasks[tod.id]
                        if (tod.filter == 'active') {
                            filterTasksState = tasks[tod.id].filter(e => e.isDone)
                        }
                        if (tod.filter == 'completed') {
                            filterTasksState = tasks[tod.id].filter(e => !e.isDone)
                        }

                        return (
                            <Grid
                                item
                                  key={tod.id}>

                                <Paper style={{padding:'10px'}}>
                            <Todolist
                                editTitleTask={editTitleTask}
                                editTitleTodolist={editTitleTodolist}
                                deleteTololist={deleteTololist}
                                todoID={tod.id}

                                filterValueActiv={tod.filter}
                                changeTaskCheckbox={changeTaskCheckbox}
                                addedNewTask={addedNewTask}
                                changeFilter={changeFilterTodolist}
                                removeTask={removeTask}
                                filterTasksState={filterTasksState}
                                title={tod.title}/>
                                </Paper>
                            </Grid>)
                    })
                }
                </Grid>
            </Container>

        </div>
    );
}

export default App;

