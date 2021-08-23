import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NavigationBar } from '../components/NavigationBar';
import { useProfile } from '../global/provider/ProfileProvider';
import Home from '../views/HomeView';
import LoginView from '../views/LoginView';
import LogoutView from '../views/LogoutView';
import NoMatchView from '../views/NoMatchView';
import ResetPassView from '../views/ResetPassView';
import { SettingsView } from '../views/SettingsView';
import UserView from '../views/UserView';
import WineView from '../views/WinesView';
// isLoading
const Routing = () => {
    const { profile } = useProfile();

    const blockRouteIfAuthenticated = (view: React.ComponentType<any>) => {
        return profile ? Home : view;
    };
    const blockRouteIfNotLoggedIn = (view: React.ComponentType<any>) => {
        return !profile ? LoginView : view;
    };

    return (
        <Router>
            <NavigationBar />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/home' component={Home} />
                <Route exact path='/users' component={blockRouteIfNotLoggedIn(UserView)} />
                <Route exact path='/wines' component={blockRouteIfNotLoggedIn(WineView)} />
                <Route exact path='/settings' component={blockRouteIfNotLoggedIn(SettingsView)} />
                <Route exact path='/login' component={blockRouteIfAuthenticated(LoginView)} />

                <Route exact path='/logout' component={blockRouteIfNotLoggedIn(LogoutView)} />
                <Route
                    exact
                    path='/resetpassword/:token'
                    component={blockRouteIfAuthenticated(ResetPassView)}
                />
                <Route component={NoMatchView} />
            </Switch>
        </Router>
    );
};

export default Routing;

// namespace JSX {
//     interface Element extends React.ReactElement<any,any>{}
// }
