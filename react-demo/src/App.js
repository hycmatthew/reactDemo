import React from "react";
import './App.scss'; 
import { TopMenu } from './TopMenu'; 
import { MainPage } from './MainPage.js'; 
import { PageWindow } from './PageWindow.js'; 

export const App = () => {
    return(
        <div>
            <TopMenu />
            <PageWindow />
        </div>
    );
};
