import React, { PropsWithChildren } from 'react';
import { CircularProgress } from '@material-ui/core';

const IsLoading = ({ trigger, children }: IsLoadingType) => {
    return !trigger ? <CircularProgress /> : children;
};

export default IsLoading;

interface IsLoadingType extends PropsWithChildren<any> {
    trigger: string;
}
