import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist, ValueFilterType} from "./Todolist";
import {v1} from "uuid";
import {TemplateForCreatingItem} from "./TemplateForCreatingItem";
import MenuAppBar from "./MaterialUiCommon/AppBar";
import {Container, Grid,Paper} from "@mui/material";
import {
    addedTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    TodolistReducer
} from "./reducers/TodolistReducer";
import {addedTaskAC, changeStatusTaskAC, changeTitleTaskAC, deleteTaskAC, taskReduser} from "./reducers/TaskReduser";

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
    const todolist1 = v1()
    const todolist2 = v1()
    const [todolists, dispatchTodolists] = useReducer( TodolistReducer,
        [
            {id: todolist1, title: 'What to learn', filter: 'all'},
            {id: todolist2, title: 'What to buy', filter: 'all'}
        ]
    )

    const [tasks, dispatchTasks] = useReducer( taskReduser, {
        [todolist1]: [
            {id: v1(), title: 'Parol', isDone: true},
            {id: v1(), title: 'Стишок', isDone: false},
            {id: v1(), title: 'Phone nomber', isDone: true},
            {id: v1(), title: 'English and Programming', isDone: false},
        ],
        [todolist2]: [
            {id: v1(), title: 'Торт', isDone: true},
            {id: v1(), title: 'Спички', isDone: false},
            {id: v1(), title: 'Вишневую тачку', isDone: true},
        ],
    })

    const editTitleTask = (todoID: string, idTask: string, editText: string) => { dispatchTasks(changeTitleTaskAC(todoID,idTask,editText))}

    const editTitleTodolist = (todoID: string, editText: string) => {
        dispatchTodolists(changeTitleTodolistAC(todoID,editText))
    }

    const addedNewTodolist = (textInput: string) => {
        dispatchTodolists(addedTodolistAC(textInput))
        dispatchTasks(addedTodolistAC(textInput))
    }

    const deleteTololist = (todoID: string,) => {
        dispatchTodolists(removeTodolistAC(todoID))
        dispatchTasks(removeTodolistAC(todoID))
    }

    const removeTask = (todoID: string, idTask: string) => {
        dispatchTasks(deleteTaskAC(todoID,idTask))
    }

    const addedNewTask = (todoID: string, textInput: string) => {
        dispatchTasks(addedTaskAC(todoID,textInput))
    }

    const changeTaskCheckbox = (todoID: string, idTask: string, valueIsDone: boolean) => {
        dispatchTasks(changeStatusTaskAC(todoID,idTask,valueIsDone))
    }


    const changeFilterTodolist = (todoID: string, valueFilter: ValueFilterType) => {
        dispatchTodolists(changeFilterTodolistAC(todoID,valueFilter))
    }


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

