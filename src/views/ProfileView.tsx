import React, { useEffect, useState, useRef } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import NewWineModal from '../components/NewWineModal';
import MyWines from '../components/MyWines';
import AddWineButton from '../components/AddNewWine';

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
            <Grid container item xs={12} md={9} lg={7} xl={6} className={classes.titleRoot}>
                <Grid className={classes.titleContainer}>
                    <Typography gutterBottom className={classes.title}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium ea earum debitis illo
                        sapiente quas tempore dolorum, perferendis numquam iusto iure, iste sed consectetur quaerat
                        quisquam unde cumque similique klum.
                    </Typography>
                </Grid>
            </Grid>
            <Grid xs={12} item className={classes.subTitleContainer}>
                <Typography gutterBottom className={classes.subTitle}>
                    <span>-----</span>MY WINES
                </Typography>
            </Grid>
            <MyWines />
            <AddWineButton onClick={handleModal} className={classes.addIcon} />
            <NewWineModal
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
