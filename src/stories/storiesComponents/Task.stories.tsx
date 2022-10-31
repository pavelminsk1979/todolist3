import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../../Task";


export default {
    title: 'Todolist/Component',
    component: Task,

} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;


export const TaskStory = Template.bind({});
TaskStory.args = {
    changeTaskCheckbox: action('Click checkbox'),
    editTitleTask: action('DobleClik editTitle') ,
    removeTask:action ('Click removeTasd') ,
    checkboxValue: false ,
    title: 'Some Task',
};

