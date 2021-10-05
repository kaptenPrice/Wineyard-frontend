import { makeStyles, Container } from '@material-ui/core';
import React, { ComponentType, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, RouteProps } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';
import { useProfile } from '../provider/ProfileProvider';
import Home from '../views/HomeView';
import LoginView from '../views/LoginView';
import LogoutView from '../views/LogoutView';
import NoMatchView from '../views/NoMatchView';
import ResetPassView from '../views/ResetPassView';
import { SettingsView } from '../views/SettingsView';
import ProfileView from '../views/ProfileView';
import WinesView from '../views/WinesView';
import { AppRoutes } from './AppRoutes';
import Volkhov from '../constants/fonts/Volkhov';

const Routing = () => {
    const { profile } = useProfile();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const classes = useStyles({ isDrawerOpen });

    const blockRouteIfAuthenticated: authCheckPropstype = (view) => {
        return profile ? Home : view;
    };
    const blockRouteIfNotAuthenticated: authCheckPropstype = (view) => {
        return !profile ? Home : view;
    };

    const routes: RouteProps[] = [
        {
            path: AppRoutes.PROFILE,
            component: blockRouteIfNotAuthenticated(ProfileView),
            exact: true
        },
        {
            path: AppRoutes.WINES,
            component: blockRouteIfNotAuthenticated(WinesView),
            exact: true
        },
        {
            path: AppRoutes.SETTINGS,
            component: blockRouteIfNotAuthenticated(SettingsView),
            exact: true
        },
        {
            path: AppRoutes.LOGOUT,
            component: blockRouteIfNotAuthenticated(LogoutView),
            exact: true
        },
        {
            path: AppRoutes.LOGIN,
            component: blockRouteIfAuthenticated(LoginView),
            exact: true
        },
        {
            path: AppRoutes.RESET_PASSWORD,
            component: blockRouteIfAuthenticated(ResetPassView),
            exact: true
        },
        { path: AppRoutes.HOME, component: Home, exact: true },
        { component: NoMatchView }
    ];

    return (
        <Router>
            <NavigationBar drawerState={[isDrawerOpen, setIsDrawerOpen]} />
            <Container className={classes.contentContainer}>
                <Switch>
                    {routes.map(({ ...props }, index) => (
                        <Route key={index} {...props} />
                    ))}
                </Switch>
            </Container>
        </Router>
    );
};

export default Routing;

type authCheckPropstype = (view: ComponentType<any>) => ComponentType<any>;

const useStyles = makeStyles(({ palette: { background }, transitions, breakpoints: { between, down } }) => ({
    '@global': {
        '@font-face': Volkhov,
        '*': {
            transition: 'background-color .3s',
            margin: 0,
            padding: 0
        },
        html: {
            fontFamily: 'Roboto',
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
    },
    contentContainer: {
        transition: transitions.create(['margin', 'width'], {
            easing: transitions.easing.sharp,
            duration: transitions.duration.enteringScreen
        }),
        marginRight: ({ isDrawerOpen }: any) => (isDrawerOpen ? 600 : ''),
        width: ({ isDrawerOpen }: any) => (isDrawerOpen ? 'calc(100% - 600px)' : '100%'),

        [between('lg', 'xl')]: {
            maxWidth: 1775
        },
        [down('xs')]: {
            width: '100%'
        },
        padding: '0'
    }
}));
