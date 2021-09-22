import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    makeStyles,
    useTheme,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Input
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { WineCard } from '../components/WineCard';
import { useProfile } from '../global/provider/ProfileProvider';
import wineImg from '../global/images/wine-image.jpg';
import { emailToInitials } from '../lib/utils';
import useFetch from '../lib/useFetch';
import NewWineModal from '../components/NewWineModal';

const UserView = () => {
    const classes = useStyles();
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('xs'));
    const { t } = useTranslation();
    const { fetchProfile, profile } = useProfile();
    const [expandedItemId, setExpandedItemId] = useState<null | string>(null);
    const endRef: React.MutableRefObject<HTMLBodyElement> = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const [image, setImage] = useState({ avatar: null, previewImage: null });
    const types = ['image/png', 'image/jpeg'];
    const [error, setError] = useState(null);

    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);
    const [year, setYear] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const splittedName = emailToInitials(profile?.email, '.');

    const handleExpandItem = (id: string) => {
        setExpandedItemId((prev) => (prev !== id ? id : null));
    };
    const handleModal = () => {
        setIsOpen((current) => !current);
        setImage(null);
        setError('');
    };

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const tempImage = event.target.files[0];
        if (tempImage && types.includes(tempImage.type)) {
            var reader = new FileReader();
            reader.onloadend = () => {
                setImage({ previewImage: reader.result, avatar: tempImage });
            };
            reader.readAsDataURL(tempImage);
            setError('');
        } else {
            setImage(null);
            setError(`File is not valid, please choose png/jpeg `);
        }
    };
    const handleSubmitWine = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('country', country);
        formData.append('year', year);
        formData.append('description', description);
        image?.avatar && formData.append('avatar', image.avatar);

        try {
            const respons = await useFetch('/wine/add', {
                method: 'POST',
                body: formData,
                credentials: 'include',
                headers: undefined
            });
            respons.status === 201 && handleModal();
            respons.data.error && setError(respons.data.error);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddWine = () => {
        return (
            <NewWineModal
                open={isOpen}
                onClose={handleModal}
                setName={(e) => setName(e.target.value)}
                setCountry={(e) => setCountry(e.target.value)}
                setYear={(e) => setYear(e.target.value)}
                setDescription={(e) => setDescription(e.target.value)}
                handleAddFile={handleFile}
                image={image}
                error={error}
                handleCancel={handleModal}
                handleSave={handleSubmitWine}
            />
        );
    };

    const handleGetWines = () => {
        return profile.favoriteWines.map(({ _id, ...props }) => (
            <WineCard
                key={_id}
                image={wineImg}
                handleExpandOnClick={() => handleExpandItem(_id)}
                expanded={expandedItemId === _id}
                _id={_id}
                {...props}
            />
        ));
    };

    return (
        <>
            <Box boxShadow={5} bgcolor='background.paper' m={2} p={2}>
                <Typography variant={!isSmallScreen ? 'h6' : 'body2'} color='primary'>
                    {t('home_welcome')} {splittedName}
                </Typography>
            </Box>
            <Grid container justifyContent='center' className={classes.containerIcon}>
                <AddIcon fontSize='large' className={classes.addIcon} onClick={handleModal} />
                {handleAddWine()}
            </Grid>

            <Grid container xl={6} className={classes.containerWines} id='winesContainer'>
                {handleGetWines()}
            </Grid>
        </>
    );
};

export default UserView;

const useStyles = makeStyles(({ breakpoints: { down } }) => ({
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
    containerIcon: {
        '& :hover': { cursor: 'pointer' }
    },
    addIcon: {
        backgroundColor: 'red',
        padding: 25,
        borderRadius: '50%'
    },
    containerDialog: {},
    mediaContainer: { maxWidth: '100px', maxHeight: '150px' },
    media: {
        width: '100%',
        // height: "200%",
        display: 'block'
    },
    fileInput: {
        height: 0,
        width: 0,
        opacity: 0
        // display: 'none'
    },
    label: {
        display: 'block',
        width: 30,
        height: 30,
        margin: '25px 0px 0px 0px',
        // lineHeight: 30,
        fontWeight: 'bold',
        fontSize: 24,
        color: 'red',
        '& :hover': { cursor: 'pointer', opacity: 0.5 }
    }
}));

/**    const handleGoToEnd = () => {
        endRef.current.scrollIntoView();
    }; */
