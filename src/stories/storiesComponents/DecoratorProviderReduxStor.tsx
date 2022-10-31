import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import {taskReduser} from "../../reducers/TaskReduser";
import {TodolistReducer} from "../../reducers/TodolistReducer";
import {StoreStateType} from "../../Store/store";


const rootReducer = combineReducers({
    tasks: taskReduser,
    todolists: TodolistReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as StoreStateType)


export const DecoratorProviderReduxStor=(storyFn:()=>JSX.Element)=>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}