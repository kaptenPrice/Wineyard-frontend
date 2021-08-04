/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, makeStyles, Menu, Tab, Tabs } from '@material-ui/core';
import { IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import { MenuItem } from '@material-ui/core';

export const NavigationBar = (props: any) => {
    const [selectedTab, setSelectedTab]: any = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();

    const handleChange = (event: any, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.NavigationBar}>
            <AppBar color='primary' position='static'>
                <ToolBar>
                    <Button onClick={() => console.log('Home')}>
                        <Typography className={classes.title} variant='h6'>
                            WineYard
                        </Typography>
                    </Button>
                    <Tabs
                        indicatorColor='primary'
                        value={selectedTab}
                        onChange={handleChange}
                    >
                        <Tab label='Wines' component={Link} to='/wines' />
                        <Tab label='Users' component={Link} to='/users' />
                    </Tabs>
                    <IconButton
                        className={classes.menuButton}
                        edge='start'
                        // aria-controls='menu'
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                </ToolBar>
            </AppBar>
            <Menu
                classes={{ paper: classes.menu }}
                // id='menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                elevation={0}
            >
                <MenuItem
                    component={Link}
                    to='/login'
                    onClick={handleClose}
                >
                    Login
                </MenuItem>
                <MenuItem
                    component={Link}
                    to='/logout'
                    onClick={handleClose}
                >
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
};

const useStyles = makeStyles(({ spacing, palette: { primary } }) => ({
    NavigationBar: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: spacing(2),
        marginLeft: 'auto'
    },
    title: {
        flexGrow: 1
    },
    menu: {
        minHeight: 200,
        maxWidth: 110,
        display: 'flex',
        justifyContent: 'center',
        marginTop: 40,
        paddingTop: 40,
        paddingBottom: 25,
        backgroundColor: primary.main,
        minWidth: 100,
        '& li': {
            padding: 15
        }
    }
}));
