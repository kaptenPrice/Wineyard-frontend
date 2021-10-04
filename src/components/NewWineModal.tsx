import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {
    Grid,
    makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    Input
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import useFetch from '../lib/useFetch';

const NewWineModal = ({ open, onClose, handleModal, handleCancel, errorMessage, previewImage }: NewWineTypes) => {
    const classes = useStyles();
    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);
    const [year, setYear] = useState(null);
    const [description, setDescription] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = previewImage;
    const [error, setError] = errorMessage;
    const types = ['image/png', 'image/jpeg'];

    const handleSubmitWine = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('country', country);
        formData.append('year', year);
        formData.append('description', description);
        avatar && formData.append('avatar', avatar);

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
    const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
        const tempImage = event.target.files[0];
        if (tempImage && types.includes(tempImage.type)) {
            var reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(tempImage);
                setPreviewAvatar(reader.result);
            };
            reader.readAsDataURL(tempImage);
            setError('');
        } else {
            setAvatar(null);
            setPreviewAvatar(null);
            setError(`File is not valid, please choose png/jpeg `);
        }
    };

    return (
        <Dialog className={classes.containerDialog} open={open} onClose={onClose}>
            <DialogTitle>Add new wine</DialogTitle>
            <DialogContent>
                <DialogContentText>Fill in all information you want to share about your new wine</DialogContentText>
                <Grid container direction='column'>
                    <TextField
                        autoFocus
                        required
                        margin='dense'
                        id='name'
                        label='Name'
                        type='text'
                        fullWidth={false}
                        variant='standard'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        required
                        margin='dense'
                        id='country'
                        label='Country'
                        type='text'
                        fullWidth={false}
                        variant='standard'
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <TextField
                        required
                        margin='dense'
                        id='year'
                        label='Year'
                        type='text'
                        fullWidth={false}
                        variant='standard'
                        onChange={(e) => setYear(e.target.value)}
                    />
                    <TextField
                        required
                        margin='dense'
                        id='description'
                        label='Description'
                        type='text'
                        fullWidth={false}
                        variant='standard'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label className={classes.label}>
                        <Input className={classes.fileInput} type='file' onChange={handleFile} />
                        <ImageIcon />
                    </label>
                </Grid>
                {previewAvatar && (
                    <div className={classes.mediaContainer}>
                        <img className={classes.media} src={previewAvatar} alt={previewAvatar} />
                    </div>
                )}
                {error && error}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSubmitWine}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewWineModal;
const useStyles = makeStyles(({ breakpoints: { down } }) => ({
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
    label: {
        display: 'block',
        width: 30,
        height: 30,
        margin: '25px 0px 0px 0px',
        fontWeight: 'bold',
        fontSize: 24,
        color: 'red',
        '& :hover': { cursor: 'pointer', opacity: 0.5 }
    }
}));

type NewWineTypes = {
    open?: boolean;
    onClose?: () => void;
    handleCancel?: () => void;
    handleModal: () => void;
    previewImage: [string, Dispatch<SetStateAction<string | ArrayBuffer>>];
    errorMessage: [string, Dispatch<SetStateAction<string>>];
};
