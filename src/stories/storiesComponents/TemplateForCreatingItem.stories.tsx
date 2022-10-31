import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {TemplateForCreatingItem} from "../../TemplateForCreatingItem";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Todolist/Component',
    component: TemplateForCreatingItem,
  /*  argTypes:{
        callback:{
            description:'creatingItem'},
},*/
}as ComponentMeta<typeof TemplateForCreatingItem>;



const Template: ComponentStory<typeof TemplateForCreatingItem> = (args) => <TemplateForCreatingItem {...args} />;



export const TemplateForCreatingItemStory = Template.bind({});
TemplateForCreatingItemStory.args = {
    callback : action ('creatingItem')
};

