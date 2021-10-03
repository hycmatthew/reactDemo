import React from "react";
import './App.scss'; 
import { MainPage } from './MainPage.js'; 
import { PageWindow } from './PageWindow.js'; 
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export const App = () => {
    return(
        <Router>
            <Switch>
                <Route path="/preview">
                    <PageWindow />
                </Route>
                <Route exact path="/">
                    <MainPage />
                </Route>
            </Switch>
        </Router>
    );
};