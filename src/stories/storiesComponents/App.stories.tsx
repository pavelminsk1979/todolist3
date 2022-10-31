import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import App from "../../App";
import {DecoratorProviderReduxStor} from "./DecoratorProviderReduxStor";


export default {
    title: 'Todolist/Component',
    component: App,
    decorators:[DecoratorProviderReduxStor]
  /*  argTypes:{
        callback:{
            description:'creatingItem'},
},*/
}as ComponentMeta<typeof App>;



const Template: ComponentStory<typeof App> = (args) => <App />;



export const AppStory = Template.bind({});


