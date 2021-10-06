import React from 'react';
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
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useProfile } from '../../provider/ProfileProvider';
import { stringToInitials } from '../../lib/utils';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { wineCardHandlers } from './wineCardHandlers';

export const WineCard = ({
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
    addedBy
}: WineProps) => {
    const classes = useStyles({ expanded });
    const { profile } = useProfile();

    const { handleDeleteWineDB, handleRemoveFromFavorites, handleAddToFavorites } = wineCardHandlers();
    const initials = stringToInitials(name, ' ');
    const isLikedByCurrentUser = likedBy && likedBy?.length ? likedBy.includes(profile?._id) : false;

    return (
        <>
            <Card elevation={0} className={classes.root}>
                <CardHeader
                    className={classes.cardHeader}
                    avatar={<Avatar className={classes.avtar}>{initials}</Avatar>}
                    title={name}
                    subheader={addedBy && 'Added by: ' + addedBy}
                />
                <div className={classes.mediaContainer}>
                    <CardMedia component='img' className={classes.media} image={image} alt={name} />
                </div>
                <CardContent>
                    <Typography variant='body2' color='textSecondary'>
                        {country ? `Country:${country}` : <br />}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                        {grapes ? `Grape:${grapes}` : <br />}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                        {year ? `Year:${year}` : <br />}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actionContainer} disableSpacing>
                    {showActionButtons && (
                        <>
                            <IconButton
                                onClick={() => handleAddToFavorites(_id)}
                                disabled={isLikedByCurrentUser}
                                aria-label='add to favorites'
                            >
                                <FavoriteIcon
                                    fontSize='small'
                                    className={clsx(classes.likeButtonUnliked, {
                                        [classes.likeButtonLiked]: isLikedByCurrentUser
                                    })}
                                />
                            </IconButton>
                            <Typography variant='caption' aria-label='amount of likes'>
                                {likedBy?.length ? likedBy.length : ''} {'LIKES'}
                            </Typography>
                        </>
                    )}

                    {isLikedByCurrentUser && (
                        <IconButton onClick={() => handleRemoveFromFavorites(_id)} disabled={!isLikedByCurrentUser}>
                            <DeleteIcon fontSize='small' className={isLikedByCurrentUser && classes.likeButtonLiked} />
                        </IconButton>
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
                        <Button color='default' variant='outlined' key={_id} onClick={() => handleDeleteWineDB(_id)}>
                            REMOVE
                        </Button>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
};

const useStyles = makeStyles(({ transitions, palette: { background }, breakpoints: { down } }) => ({
    root: {
        overflow: 'visible',
        width: 325,
        height: 570,
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
        width: 325,
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
    actionContainer: {},
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
        color: 'black',
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

interface WineProps {
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
}