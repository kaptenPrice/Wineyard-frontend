import React from 'react';
import { Typography } from '@material-ui/core';
import { useProfile } from '../global/provider/ProfileProvider';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { fetchProfile, profile } = useProfile();
    const { t,i18n } = useTranslation();
    return (
            <Typography  variant='h6' color="secondary">
                {t('home_welcome')} {profile?.email}
            </Typography>

    );
};

export default Home;
