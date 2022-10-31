import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {TemplateForCreatingItem} from "../../TemplateForCreatingItem";
import {action} from "@storybook/addon-actions";
import {Todolist, ValueFilterType} from "../../Todolist";
import {TasksType} from "../../App";


export default {
    title: 'Todolist/Component',
    component: Todolist,
  /*  argTypes:{
        callback:{
            description:'creatingItem'},
},*/
}as ComponentMeta<typeof Todolist>;



const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args} />;



export const TodolistStory = Template.bind({});
TodolistStory.args = {
    title: 'What to buy ',
    filterTasksState: [
        {id: 'tyuiyu', title: 'HTML&CSS', isDone: true},
        {id: '765tr', title: 'JS', isDone: true},
        {id: '87dt', title: 'Milk', isDone: true},
        {id: 'jhuyt', title: 'React Book', isDone: true}
    ],
        removeTask: action('removeTask'),
    changeFilter: action('changeFilter'),
    addedNewTask: action('addedNewTask'),
    changeTaskCheckbox:action('changeTaskCheckbox'),
    filterValueActiv:'all',
todoID:'yhtr65utgkhg',
deleteTololist:action('deleteTololist'),
    editTitleTodolist:action('editTitleTodolist'),
    editTitleTask:action('editTitleTask'),
};

