import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const ButtonWithToolTip = ({ title, children, ...props }) => {
    return (
        <Tooltip title={title}>
            <IconButton {...props}>
                {children}
            </IconButton>
        </Tooltip>
    );
};
export default ButtonWithToolTip;
