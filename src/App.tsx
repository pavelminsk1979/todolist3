import React, {useState} from 'react';
import './App.css';
import {Todolist, ValueFilterType} from "./Todolist";
import {v1} from "uuid";

export type TasksType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistState = {
    id: string
    title: string
    filter: ValueFilterType
}

type TaskStateType={
    [key:string]:TasksType[]
}


function App() {
    const todolist1 = v1()
    const todolist2 = v1()
    const [todolists, setTodolists] = useState<TodolistState[]>(
        [
            {id: todolist1, title: 'What to learn', filter: 'all'},
            {id: todolist2, title: 'What to buy', filter: 'all'}
        ]
    )

    const [tasks, SetTasks] = useState<TaskStateType>({
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

    const deleteTololist = (todoID:string,) => {
        setTodolists(todolists.filter(e=>e.id!==todoID))
        delete tasks[todoID]
        SetTasks({...tasks})
    }

    const removeTask = (todoID: string,idTask: string) => {
        SetTasks({...tasks,[todoID]:tasks[todoID].filter(e=>e.id!==idTask)})
    }

    const addedNewTask = (todoID: string, textInput: string) => {
        SetTasks({
            ...tasks, [todoID]: [
                {id: v1(), title: textInput, isDone: false}, ...tasks[todoID]]
        })
    }

    const changeTaskCheckbox = (todoID: string, idTask: string, valueIsDone: boolean) => {
        SetTasks({
            ...tasks, [todoID]: tasks[todoID].map(el => el.id === idTask
                ? {...el, isDone: valueIsDone} : el)
        })
    }


    const changeFilterTodolist = (todoID: string, valueFilter: ValueFilterType) => {
        setTodolists(todolists.map(e => e.id === todoID ? {...e, filter: valueFilter} : e))
    }


    return (
        <div className="App">
            {
                todolists.map(tod => {

                    let filterTasksState = tasks[tod.id]
                    if (tod.filter == 'active') {
                        filterTasksState =  tasks[tod.id].filter(e => e.isDone)
                    }
                    if (tod.filter == 'completed') {
                        filterTasksState =  tasks[tod.id].filter(e => !e.isDone)
                    }

                    return (
                        <Todolist
                            deleteTololist={deleteTololist}
                            todoID={tod.id}
                            key={tod.id}
                            filterValueActiv={tod.filter}
                            changeTaskCheckbox={changeTaskCheckbox}
                            addedNewTask={addedNewTask}
                            changeFilter={changeFilterTodolist}
                            removeTask={removeTask}
                            filterTasksState={filterTasksState}
                            title={tod.title}/>
                    )
                })
            }

        </div>
    );
}

export default App;

