import {v1} from "uuid";
import {TodolistState} from "../App";
import {
    addedTodolistAC,
    changeFilterTodolistAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    TodolistReducer
} from "../reducers/TodolistReducer";

test('correct todolist should be removed',()=>{
    const todolist1 = v1()
    const todolist2 = v1()

    const startState:TodolistState[]= [
            {id: todolist1, title: 'What to learn', filter: 'all'},
            {id: todolist2, title: 'What to buy', filter: 'all'}
        ]
    const endState=TodolistReducer(startState,removeTodolistAC(todolist1))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to buy')
    expect(endState[0].id).toBe(todolist2)

})

test('should be added todolist',()=>{
    const todolist1 = v1()
    const todolist2 = v1()

    const startState:TodolistState[]= [
            {id: todolist1, title: 'What to learn', filter: 'all'},
            {id: todolist2, title: 'What to buy', filter: 'all'}
        ]
    const newTitleForTodolist='Опа-опа-опа! Я новенький'
    const endState=TodolistReducer(startState,addedTodolistAC(newTitleForTodolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Опа-опа-опа! Я новенький')
    expect(endState[1].title).toBe('What to learn')

})

test('correct todolist should be change its title',()=>{
    const todolist1 = v1()
    const todolist2 = v1()

    const startState:TodolistState[]= [
            {id: todolist1, title: 'What to learn', filter: 'all'},
            {id: todolist2, title: 'What to buy', filter: 'all'}
        ]
    const changeTitleForTodolist='Это название лучше'
    const endState=TodolistReducer(
        startState,
        changeTitleTodolistAC(todolist1,changeTitleForTodolist))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('Это название лучше')
    expect(endState[1].title).toBe('What to buy')

})

test('correct todolist should be change  filter',()=>{
    const todolist1 = v1()
    const todolist2 = v1()

    const startState:TodolistState[]= [
            {id: todolist1, title: 'What to learn', filter: 'all'},
            {id: todolist2, title: 'What to buy', filter: 'all'}
        ]
    const changeFilterForTodolist='active'
    const endState=TodolistReducer(
        startState,
        changeFilterTodolistAC(todolist2,changeFilterForTodolist))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('active')

})