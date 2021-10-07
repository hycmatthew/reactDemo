import React from "react";
import './App.scss'; 
import { MainPage } from './MainPage.js'; 
import { Provider } from './ImageContext.js'; 
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

export const App = () => {
    return(
        <Router>
            <Switch>
                <Route path="/preview">
                    <Provider />
                </Route>
                <Route exact path="/">
                    <MainPage />
                </Route>
            </Switch>
        </Router>
    );
};