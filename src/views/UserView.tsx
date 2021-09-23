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
    Input,
    IconButton,
    Tooltip
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
        console.log('clicked');
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

            <Grid container xl={6} className={classes.containerWines} id='winesContainer'>
                {handleGetWines()}
            </Grid>
            <Tooltip title="Add new wine">
                <IconButton onClick={handleModal} className={classes.addIcon}>
                    <AddIcon fontSize='large' color='action' />
                </IconButton>
            </Tooltip>
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
        </>
    );
};

export default UserView;

const useStyles = makeStyles(({ palette: { primary }, breakpoints: { down } }) => ({
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

    containerDialog: {},
    mediaContainer: { maxWidth: '100px', maxHeight: '150px' },
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

        [down('xs')]: {
            bottom: 70
        }
    }
}));

/**    const handleGoToEnd = () => {
        endRef.current.scrollIntoView();
    }; */
