import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {TemplateForEditItem} from "../../TemplateForEditItem";


export default {
    title: 'Todolist/Component',
    component: TemplateForEditItem,
  /*  argTypes:{
        callback:{
            description:'creatingItem'},
},*/
}as ComponentMeta<typeof TemplateForEditItem>;



const Template: ComponentStory<typeof TemplateForEditItem> = (args) => <TemplateForEditItem {...args} />;



export const TemplateForEditItemStory = Template.bind({});
TemplateForEditItemStory.args = {
    title:'New text',
    callback:action('edit Text')
};

