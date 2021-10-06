import React, { Dispatch, SetStateAction, useState } from 'react';
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
import { handleFile } from '../../lib/utils';
import { addWineHandlers } from './addWineHandlers';

const AddWineModal = ({ open, onClose, handleModal, handleCancel, errorMessage, previewImage }: NewWineTypes) => {
    const classes = useStyles();
    const [name, setName] = useState(null);
    const [country, setCountry] = useState(null);
    const [year, setYear] = useState(null);
    const [description, setDescription] = useState(null);
    const [avatar, setAvatar] = useState<File>();
    const [previewAvatar, setPreviewAvatar] = previewImage;
    const [error, setError] = errorMessage;
    const [isFormValid, setIsFormValid] = useState(true);

    const { handleAddNewWine } = addWineHandlers();

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
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                    <TextField
                        required
                        margin='dense'
                        id='country'
                        label='Country'
                        type='text'
                        fullWidth={false}
                        variant='standard'
                        onChange={(e) => setCountry(e.currentTarget.value)}
                    />
                    <TextField
                        required
                        margin='dense'
                        id='year'
                        label='Year'
                        type='text'
                        fullWidth={false}
                        variant='standard'
                        onChange={(e) => setYear(e.currentTarget.value)}
                    />
                    <TextField
                        required
                        margin='dense'
                        id='description'
                        label='Description'
                        type='text'
                        fullWidth={false}
                        variant='standard'
                        onChange={(e) => setDescription(e.currentTarget.value)}
                    />
                    <label className={classes.label}>
                        <Input
                            className={classes.fileInput}
                            type='file'
                            onChange={handleFile(setAvatar, setPreviewAvatar, setError, setIsFormValid)}
                        />
                        <ImageIcon />
                    </label>
                </Grid>
                {previewAvatar && (
                    <div className={classes.mediaContainer}>
                        <img className={classes.media} src={previewAvatar} alt={avatar.name} />
                    </div>
                )}
                {error && error}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                    disabled={isFormValid}
                    onClick={handleAddNewWine(name, country, year, description, avatar, handleModal, setError)}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddWineModal;
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
