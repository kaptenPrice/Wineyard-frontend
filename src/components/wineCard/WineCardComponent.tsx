import React, { Dispatch, SetStateAction } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useProfile } from '../../provider/ProfileProvider';
import { stringToInitials } from '../../lib/utils';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid } from '@material-ui/core';
import { wineCardHandlers } from './wineCardHandlers';
import ButtonWithToolTip from '../ButtonWithToolTip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const WineCardComponent = ({
    handleExpandOnClick,
    expanded,
    name,
    country,
    grapes,
    description,
    image,
    date,
    year,
    _id,
    likedBy,
    showActionButtons,
    addedBy,
    buttonState,
    onClickAway
}: WineProps) => {
    const [showActionButton] = buttonState;
    const classes = useStyles({ expanded });
    const { profile } = useProfile();
    const { handleDeleteWineDB, handleRemoveFromFavorites, handleAddToFavorites } = wineCardHandlers();
    const initials = stringToInitials(name, ' ');
    const isLikedByCurrentUser = likedBy && likedBy?.length ? likedBy.includes(profile?._id) : false;
    const attributes = { Name: name, Country: country, Year: year, Grape: grapes };

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <Card elevation={0} className={classes.root}>
                <CardHeader
                    className={classes.cardHeader}
                    avatar={<Avatar className={classes.avtar}>{initials}</Avatar>}
                    subheader={addedBy && 'Added by: ' + addedBy}
                />
                <Grid item xs={5} className={classes.styledHr} />

                <div className={classes.mediaContainer}>
                    <CardMedia component='img' className={classes.media} image={image} alt={name} />
                </div>
                <Grid item xs={5} className={classes.styledHr} />
                <CardContent className={classes.attrubuteContainer}>
                    {Object.entries(attributes).map(([key, value], index) => (
                        <Grid container justifyContent='space-between' alignItems='flex-start' key={index}>
                            <Grid item>
                                <Typography className={classes.attribute}>{key}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.attributeText}>{value}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                </CardContent>
                <CardActions disableSpacing className={classes.actionContainer}>
                    {showActionButtons && (
                        <>
                            <IconButton
                                onClick={
                                    !isLikedByCurrentUser
                                        ? () => handleAddToFavorites(_id)
                                        : () => handleRemoveFromFavorites(_id)
                                }
                            >
                                <FavoriteIcon
                                    fontSize='small'
                                    className={clsx(classes.likeButtonUnliked, {
                                        [classes.likeButtonLiked]: isLikedByCurrentUser
                                    })}
                                />
                            </IconButton>
                            <Typography variant='caption'>
                                {likedBy?.length ? likedBy.length : ''} {'LIKES'}
                            </Typography>
                        </>
                    )}

                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded
                        })}
                        onClick={handleExpandOnClick}
                        aria-expanded={expanded}
                        aria-label='show more'
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>

                <Collapse className={classes.collapse} in={expanded} timeout='auto' unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            Description:
                            {description}
                        </Typography>
                        {showActionButton && (
                            <ButtonWithToolTip title={'Remove wine'} key={_id} onClick={() => handleDeleteWineDB(_id)}>
                                <DeleteIcon fontSize='small' color='error' />
                            </ButtonWithToolTip>
                        )}
                    </CardContent>
                </Collapse>
            </Card>
        </ClickAwayListener>
    );
};
export default WineCardComponent;
const useStyles = makeStyles(({ transitions, palette: { background, text }, breakpoints: { down }, typography }) => ({
    root: {
        overflow: 'visible',
        width: 328,
        height: 600,
        borderRadius: 10,
        boxShadow: '0px 0px 12px 0px #e0dde0'
    },
    cardHeader: {
        '& .MuiCardHeader-title': {
            width: 235,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            lineBreak: 'anywhere',
            whiteSpace: 'nowrap'
        }
    },
    mediaContainer: {
        width: '100%',
        height: 342,
        overflow: 'hidden'
    },
    media: {
        width: 'inherit',
        height: 'inherit',
        transition: 'transform 1s',
        opacity: 0.95,
        '&:hover': {
            transform: 'scale(1.2)',
            opacity: 1
        }
    },
    styledHr: {
        marginLeft: 99,
        height: 3,
        background: background.default
    },
    attrubuteContainer: {
        padding: '25px 16px 10px 16px '
    },
    attribute: {
        ...typography.body2,
        color: text.primary
    },

    attributeText: {
        ...typography.body2,
        color: text.secondary
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: transitions.create('transform', {
            duration: transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    avtar: {
        color: text.primary,
        backgroundColor: background.default
    },
    collapse: {
        position: 'absolute',
        zIndex: 200,
        width: 'inherit',
        marginTop: -7,

        '&>div': {
            background: background.paper
        },
        [down('xs')]: {
            //@ts-ignore
            paddingBottom: ({ expanded }) => (expanded ? 96 : 0)
        }
    },
    actionContainer: {
        marginTop: 20,
        padding: 0
    },
    likeButtonLiked: {
        '& path': { fill: '#fb2b2be1' }
    },
    likeButtonUnliked: {
        '& path': { fill: background }
    }
}));

/* -------------------------------------------------------------------------- */
/*                                    types                                   */
/* -------------------------------------------------------------------------- */

interface WineProps extends props {
    handleExpandOnClick: () => void;
    expanded: boolean;
    name?: string;
    country?: string;
    grapes?: string;
    description?: string;
    image?: any;
    date?: string;
    year?: string;
    _id?: string;
    likedBy?: Array<string>;
    showActionButtons?: boolean;
    addedBy?: string;
    handleRemove?: () => void;
    handleClickAway?: () => void;
    onClickAway?: () => void;
}
type props = {
    buttonState?: [boolean, Dispatch<SetStateAction<boolean>>];
};
