import React, { PropsWithChildren } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';

const ButtonWithToolTip = ({ title, children, ...props }:PropsWithChildren<any>) => {
    return (
        <Tooltip title={title}>
            <IconButton {...props}>
                {children}
            </IconButton>
        </Tooltip>
    );
};
export default ButtonWithToolTip;
