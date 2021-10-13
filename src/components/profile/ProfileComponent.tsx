import React, { useEffect, useState } from 'react';

import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { useProfile } from '../../provider/ProfileProvider';
import WineCardComponent from '../wineCard/WineCardComponent';
import wineImg from '../../global/images/wine-image.jpg';
import ButtonWithToolTip from '../ButtonWithToolTip';
import AddIcon from '@material-ui/icons/Add';
import AddWineModal from '../addWineModal/AddWineModal';
import Title from '../Title';
import { profileHandlers } from './profileHandlers';
import { titleProfileView } from '../../content/titles';

const Profile = () => {
    const classes = useStyles();
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [expandedItemId, setExpandedItemId] = useState<null | string>(null);
    const [WinesAddedByCurrent, setWinesAddedByCurrent] = useState([]);
    const [showActionButton, setShowActionButton] = useState(false);
    const { profile, fetchProfile } = useProfile();
    const { fetchWinesAddedByCurrentId } = profileHandlers();

    useEffect(() => {
        fetchProfile();
        fetchWinesAddedByCurrentId(setWinesAddedByCurrent);
    }, []);

    const handleModal = () => {
        setIsOpen((current) => !current);
        setPreviewAvatar(null);
        setError('');
    };

    const handleExpandItem = (id: string) => {
        setExpandedItemId((prev) => (prev !== id ? id : null));
    };
    const handleGetWines = () => {
        return profile.favoriteWines.map(({ _id, ...props }) => (
            <WineCardComponent
                key={_id}
                _id={_id}
                image={props?.avatar ? process.env.REACT_APP_API_URL_DEV + `/${props.avatar}` : wineImg}
                handleExpandOnClick={() => handleExpandItem(_id)}
                expanded={expandedItemId === _id}
                buttonState={[showActionButton, setShowActionButton]}
                {...props}
            />
        ));
    };
    const handleGetWinesAddedByCurrent = () => {
        return WinesAddedByCurrent.map((element, index) => (
            <p key={element._id}>
                {index + 1} {element.name}
            </p>
        ));
    };

    return (
        <>
            <Title classRoot={classes.titleRoot} classContainer={classes.titleContainer}>
                {titleProfileView}
            </Title>
            <Grid xs={12} item className={classes.subTitleContainer}>
                <Typography gutterBottom className={classes.subTitle}>
                    <span>-----</span>MY WINES
                </Typography>
            </Grid>
            <Grid container xl={12} className={classes.containerWines} id='winesContainer'>
                {handleGetWines()}
            </Grid>
            <Box boxShadow={5} bgcolor='background.paper' m={2} p={2}>
                {handleGetWinesAddedByCurrent()}
            </Box>
            <ButtonWithToolTip title={'Add new wine'} onClick={handleModal} className={classes.addIcon}>
                <AddIcon fontSize='large' color='action' />
            </ButtonWithToolTip>
            <AddWineModal
                previewImage={[previewAvatar, setPreviewAvatar]}
                errorMessage={[error, setError]}
                open={isOpen}
                onClose={handleModal}
                handleModal={handleModal}
                handleCancel={handleModal}
            />
        </>
    );
};

export default Profile;

const useStyles = makeStyles(
    ({ palette: { primary, defaultSvg, text }, breakpoints: { down, between }, typography }) => ({
        containerWines: {
            maxWidth: 1720,
            justifyContent: 'center',
            margin: 'auto',
            position: 'relative',
            paddingBottom: 10,
            '& .MuiCard-root': {
                margin: 10
            },
            [down('xs')]: {
                paddingBottom: 66,
                flexDirection: 'column',
                alignContent: 'space-evenly'
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
        },
        addedList: {
            marginBottom: 50,
            ...typography.h6,
            [between('xs', 'sm')]: {
                ...typography.subtitle2,
                marginBottom: 100
            }
        },

        media: {
            width: '100%',
            display: 'block'
        },
        fileInput: {
            height: 0,
            width: 0,
            opacity: 0
        },
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
        }
    })
);
