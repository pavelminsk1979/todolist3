import {TaskStateType} from "../App";
import {addedTaskAC, changeStatusTaskAC, changeTitleTaskAC, deleteTaskAC, taskReduser} from "../reducers/TaskReduser";
import {addedTodolistAC, removeTodolistAC} from "../reducers/TodolistReducer";


test('correct task should be delete from correct array', () => {
    const startState: TaskStateType = {
        'todolist1': [
            {id: '1', title: 'Parol', isDone: true},
            {id: '2', title: 'Стишок', isDone: false},
            {id: '3', title: 'Phone nomber', isDone: true},
            {id: '4', title: 'English and Programming', isDone: false},
        ],
        'todolist2': [
            {id: '1', title: 'Торт', isDone: true},
            {id: '2', title: 'Спички', isDone: false},
            {id: '3', title: 'Вишневую тачку', isDone: true},
        ]
    }

    const endState = taskReduser(startState, deleteTaskAC('todolist1', '4'))

    expect(endState).toEqual(
        {
            'todolist1': [
                {id: '1', title: 'Parol', isDone: true},
                {id: '2', title: 'Стишок', isDone: false},
                {id: '3', title: 'Phone nomber', isDone: true},
            ],
            'todolist2': [
                {id: '1', title: 'Торт', isDone: true},
                {id: '2', title: 'Спички', isDone: false},
                {id: '3', title: 'Вишневую тачку', isDone: true},
            ]
        }
    )

})

test('some task should be added to correct array', () => {
    const startState: TaskStateType = {
        'todolist1': [
            {id: '1', title: 'Parol', isDone: true},
            {id: '2', title: 'Стишок', isDone: false},
            {id: '3', title: 'Phone nomber', isDone: true},
            {id: '4', title: 'English and Programming', isDone: false},
        ],
        'todolist2': [
            {id: '1', title: 'Торт', isDone: true},
            {id: '2', title: 'Спички', isDone: false},
            {id: '3', title: 'Вишневую тачку', isDone: true},
        ]
    }
    const titleTask = 'newTask'
    const idTask = 'newIdTask'

    const endState = taskReduser(startState, addedTaskAC('todolist2', idTask, titleTask))

    expect(endState['todolist1'].length).toBe(4)
    expect(endState['todolist2'].length).toBe(4)
    expect(endState['todolist2'][0].title).toBe('newTask')
    expect(endState['todolist2'][0].id).toBeDefined()
    expect(endState['todolist2'][0].id).toBe('newIdTask')
    expect(endState['todolist2'][0].isDone).toBe(false)

})

test('correct task should be change status (isDone)', () => {
    const startState: TaskStateType = {
        'todolist1': [
            {id: '1', title: 'Parol', isDone: true},
            {id: '2', title: 'Стишок', isDone: false},
            {id: '3', title: 'Phone nomber', isDone: true},
            {id: '4', title: 'English and Programming', isDone: false},
        ],
        'todolist2': [
            {id: '1', title: 'Торт', isDone: true},
            {id: '2', title: 'Спички', isDone: false},
            {id: '3', title: 'Вишневую тачку', isDone: true},
        ]
    }
    const newStatusTask = false

    const endState = taskReduser(
        startState, changeStatusTaskAC('todolist1', '3', newStatusTask))


    expect(endState['todolist1'][2].isDone).toBe(false)
    expect(endState['todolist2'][2].isDone).toBe(true)

})

test('correct task should be change title', () => {
    const startState: TaskStateType = {
        'todolist1': [
            {id: '1', title: 'Parol', isDone: true},
            {id: '2', title: 'Стишок', isDone: false},
            {id: '3', title: 'Phone nomber', isDone: true},
            {id: '4', title: 'English and Programming', isDone: false},
        ],
        'todolist2': [
            {id: '1', title: 'Торт', isDone: true},
            {id: '2', title: 'Спички', isDone: false},
            {id: '3', title: 'Вишневую тачку', isDone: true},
        ]
    }
    const newTitleTask = 'new Title'

    const endState = taskReduser(
        startState, changeTitleTaskAC('todolist1', '4', newTitleTask))


    expect(endState['todolist1'][3].title).toBe('new Title')
    expect(endState['todolist1'][3].title.length).toBe(9)


})

test('added array for task, when added new todolist', () => {
    const startState: TaskStateType = {
        'todolist1': [
            {id: '1', title: 'Parol', isDone: true},
            {id: '2', title: 'Стишок', isDone: false},
            {id: '3', title: 'Phone nomber', isDone: true},
            {id: '4', title: 'English and Programming', isDone: false},
        ],
        'todolist2': [
            {id: '1', title: 'Торт', isDone: true},
            {id: '2', title: 'Спички', isDone: false},
            {id: '3', title: 'Вишневую тачку', isDone: true},
        ]
    }

    const newTitleForTodolist = 'Новый Тайтл'
    const endState = taskReduser(
        startState, addedTodolistAC(newTitleForTodolist))

    const keys = Object.keys(endState)
    const newKey = keys.find(e => e != 'todolist1' && e != 'todolist2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])


})

test('delete array for task, when delete new todolist', () => {
    const startState: TaskStateType = {
        'todolist1': [
            {id: '1', title: 'Parol', isDone: true},
            {id: '2', title: 'Стишок', isDone: false},
            {id: '3', title: 'Phone nomber', isDone: true},
            {id: '4', title: 'English and Programming', isDone: false},
        ],
        'todolist2': [
            {id: '1', title: 'Торт', isDone: true},
            {id: '2', title: 'Спички', isDone: false},
            {id: '3', title: 'Вишневую тачку', isDone: true},
        ]
    }


    const endState = taskReduser(
        startState, removeTodolistAC('todolist1'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1
    )




})