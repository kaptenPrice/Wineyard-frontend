import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const AddWineButton = ({ ...props }) => {
    return (
        <Tooltip title='Add new wine'>
            <IconButton {...props}>
                <AddIcon fontSize='large' color='action' />
            </IconButton>
        </Tooltip>
    );
};
export default AddWineButton;
