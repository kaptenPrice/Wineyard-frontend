import React, { PropsWithChildren } from 'react'
import {  Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const TypoWithTranslation = ({children,...props}:PropsWithChildren<any>) => {
    const { t, i18n } = useTranslation();

    return (
        <Typography {...props } >{t(children)}</Typography>
    )
}

export default Typography
