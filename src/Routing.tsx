import {} from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import Home from './views/HomeView';
import LoginView from './views/LoginView';
import LogoutView from './views/LogoutView';
import UserView from './views/UserView';
import WineView from './views/WinesView';

const Routing = () => {
    return (
        <Router>
            <NavigationBar />
            <Switch>
                <Route exact path='/home' component={Home} />

                <Route path='/users' component={UserView} />
                <Route path='/wines' component={WineView} />
                <Route path='/login' component={LoginView} />
                <Route path='/logout' component={LogoutView} />

                <Route path='/' />
            </Switch>
        </Router>
    );
};

export default Routing;
