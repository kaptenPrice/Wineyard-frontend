import React, { PropsWithChildren } from 'react';
import { Grid } from '@material-ui/core';
import TypographyComp from './TypographyComp';
import { makeStyles } from '@material-ui/core';

const Title = ({ classRoot, classContainer, children }: TitleProps) => {
    const classes = useStyles();
    return (
        <Grid container item xs={12} md={9} lg={7} xl={6} className={classRoot}>
            <Grid className={classContainer}>
                <TypographyComp className={classes.title} transKey={children} />
            </Grid>
        </Grid>
    );
};
interface TitleProps extends PropsWithChildren<any> {
    classRoot: string;
    classContainer: string;
}
export default Title;

const useStyles = makeStyles(({ typography, palette: { text }, breakpoints: { down } }) => ({
    title: {
        ...typography.h3,
        color: text.primary,
        [down('sm')]: {
            ...typography.h6
        }
    }
}));
