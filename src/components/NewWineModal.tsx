import React from 'react';
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

const NewWineModal = ({
    open,
    onClose,
    setName,
    setCountry,
    setYear,
    setDescription,
    handleAddFile,
    image,
    error,
    handleCancel,
    handleSave
}) => {
    const classes = useStyles();

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
                        onChange={setName}
                    />
                    <TextField
                        required
                        margin='dense'
                        id='country'
                        label='Country'
                        type='text'
                        fullWidth={false}
                        variant='standard'
                        onChange={setCountry}
                    />
                    <TextField
                        required
                        margin='dense'
                        id='year'
                        label='Year'
                        type='text'
                        fullWidth={false}
                        variant='standard'
                        onChange={setYear}
                    />
                    <TextField
                        required
                        margin='dense'
                        id='description'
                        label='Description'
                        type='text'
                        fullWidth={false}
                        variant='standard'
                        onChange={setDescription}
                    />
                    <label className={classes.label}>
                        <Input className={classes.fileInput} type='file' onChange={handleAddFile} />
                        <ImageIcon />
                    </label>
                </Grid>
                {image && (
                    <div className={classes.mediaContainer}>
                        <img className={classes.media} src={image.previewImage} alt={image.previewImage} />
                    </div>
                )}
                {error && error}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
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
        // display: 'none'
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
