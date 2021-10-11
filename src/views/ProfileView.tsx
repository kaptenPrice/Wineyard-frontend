import React, { useEffect, useState, useRef } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import AddWineModal from '../components/addWineModal/AddWineModal';
import Profile from '../components/Profile';
import AddWineButton from '../components/AddWineButton';
import { titleProfileView } from '../content/titles';
import Title from '../components/Title';

const ProfileView = () => {
    const classes = useStyles();
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleModal = () => {
        setIsOpen((current) => !current);
        setPreviewAvatar(null);
        setError('');
    };

    return (
        <Grid container className={classes.viewRoot}>
            <Title
                classRoot={classes.titleRoot}
                classContainer={classes.titleContainer}
            >
                {titleProfileView}
            </Title>
            <Grid xs={12} item className={classes.subTitleContainer}>
                <Typography gutterBottom className={classes.subTitle}>
                    <span>-----</span>MY WINES
                </Typography>
            </Grid>
            <Profile />
            <AddWineButton onClick={handleModal} className={classes.addIcon} />
            <AddWineModal
                previewImage={[previewAvatar, setPreviewAvatar]}
                errorMessage={[error, setError]}
                open={isOpen}
                onClose={handleModal}
                handleModal={handleModal}
                handleCancel={handleModal}
            />
        </Grid>
    );
};

export default ProfileView;
const useStyles = makeStyles(
    ({ palette: { primary, defaultSvg, text }, breakpoints: { down, between }, typography }) => ({
        addIcon: {
            backgroundColor: primary.main,
            padding: 20,
            position: 'fixed',
            bottom: 10,
            right: 10,
            boxShadow: '0 3px 10px #888888',
            '& path': {
                fill: defaultSvg.main
            },
            [down('xs')]: {
                bottom: 70
            }
        },
        viewRoot: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            marginBottom: 100,
            padding: 50,
            [between('xs', 'md')]: {
                padding: 0,
                marginTop: 20,
                marginBottom: 400
            }
        },
        titleRoot: {
            marginLeft: 40,
            marginBottom: 160,
            marginTop: 80,
            paddingBottom: 40,
            borderBottom: '1px solid #222222',
            [between('xs', 'md')]: {
                width: '80%',
                margin: 'auto',
                marginBottom: 80
            }
        },
        titleContainer: {
            display: 'flex',
            alignItems: 'flex-end',
            position: 'relative'
        },
        title: {
            ...typography.h3,
            color: text.primary,
            [down('sm')]: {
                ...typography.h6
            }
        },
        subTitleContainer: { marginLeft: 50, marginBottom: 50 },
        subTitle: {
            ...typography.h5,
            fontWeight: 400,
            color: text.primary,
            letterSpacing: '0.19rem',
            [down('sm')]: {
                ...typography.body2
            },
            '&>span': {
                letterSpacing: -4,
                marginRight: 12
            }
        }
    })
);

/**    const handleGoToEnd = () => {
        endRef.current.scrollIntoView();
    }; */
