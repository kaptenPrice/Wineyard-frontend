import { makeStyles } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { NavigationBar } from '../components/NavigationBar';
import { useProfile } from '../provider/ProfileProvider';
import Home from '../views/HomeView';
import LoginView from '../views/LoginView';
import LogoutView from '../views/LogoutView';
import NoMatchView from '../views/NoMatchView';
import ResetPassView from '../views/ResetPassView';
import { SettingsView } from '../views/SettingsView';
import UserView from '../views/UserView';
import WineView from '../views/WinesView';
import { AppRoutes } from './AppRoutes';
const useStyles = makeStyles(({ palette: { background } }) => ({
    '@global': {
        '*': {
            transition: 'background-color .3s',
            margin: 0,
            padding: 0,
            
        },
        html: {
            fontFamily:"Roboto",
            height: '100%',
            width: '100%',
            boxSizing: 'border-box'
        },
        body: {
            margin: 0,
            padding: 0,
            background: background.default,
            overflowX: 'hidden',
            height: '100%',
            width: '100%',
            paddingRight: '0!important',
            boxSizing: 'border-box'
        },

        input: {
            color: 'rgb(168, 87, 20) !important'
        }
    }
}));
const Routing = () => {
    const { profile } = useProfile();
    useStyles();
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
                <Route exact path={AppRoutes.HOME} component={Home} />
                <Route exact path={AppRoutes.USERS} component={blockRouteIfNotLoggedIn(UserView)} />
                <Route exact path={AppRoutes.WINES} component={blockRouteIfNotLoggedIn(WineView)} />
                <Route exact path={AppRoutes.SETTINGS} component={blockRouteIfNotLoggedIn(SettingsView)} />
                <Route exact path={AppRoutes.LOGIN} component={blockRouteIfAuthenticated(LoginView)} />
                <Route exact path={AppRoutes.LOGOUT} component={blockRouteIfNotLoggedIn(LogoutView)} />
                <Route exact path={AppRoutes.RESET_PASSWORD} component={blockRouteIfAuthenticated(ResetPassView)} />
                <Route component={NoMatchView} />
            </Switch>
        </Router>
    );
};

export default Routing;


