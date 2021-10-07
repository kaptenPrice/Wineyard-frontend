import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const Title = ({ classRoot, classContainer, classTitle, children }: TitleProps) => {
    const { t, i18n } = useTranslation();

    return (
        <Grid container item xs={12} md={9} lg={7} xl={6} className={classRoot}>
            <Grid className={classContainer}>
                <Typography className={classTitle}>{t(children)}</Typography>
            </Grid>
        </Grid>
    );
};
type TitleProps = {
    classRoot: string;
    classContainer: string;
    classTitle: string;
    children: string;
};
export default Title;
