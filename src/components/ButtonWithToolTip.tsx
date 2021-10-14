import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';

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
