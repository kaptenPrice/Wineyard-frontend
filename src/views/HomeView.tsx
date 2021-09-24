import React from 'react';
import { Grid, Typography, Paper, Box, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import { useProfile } from '../provider/ProfileProvider';
import { useTranslation } from 'react-i18next';
import HomeComponent from '../components/HomeComponent';

const Home = () => {
   

    return (
        <>
           
            <HomeComponent />
        </>
    );
};

export default Home;


