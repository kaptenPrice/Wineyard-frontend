import React, { useEffect, useRef, useState } from 'react';
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
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useFetch from './hooks/useFetch';

//1. send item-id to endpoint -done
//1.1 diasable button if its liked by this user -done
//2. retrive data with users wines
//3. save users wines
//4.show users wines in userpage
//5.if id exists in users favoritswines mark the wine on winepage with a like
//6.increase amount of likes
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
    likedBy
}: WineProps) => {
    const classes = useStyles({ expanded });
    const [isLiked, setIsLiked] = useState(likedBy);
    const handleLike = () => {
        setIsLiked((current) => current + 1);
    };
    const handleAddToFavorites = async () => {
        console.log('ID: ', _id);
        try {
            const response = await useFetch('/user/addfavoritewine', {
                method: 'PATCH',
                body: JSON.stringify({ id: _id })
            });
            console.log('ADDWINE: ', response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {expanded && <div className={classes.cover} onClick={handleExpandOnClick} />}
            <Card className={classes.root}>
                <CardHeader
                    className={classes.cardHeader}
                    avatar={
                        <Avatar aria-label='wine' className={classes.avtar}>
                            Init
                        </Avatar>
                    }
                    title={name}
                    subheader={date}
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
                    <IconButton
                        onClick={() => [handleLike(), handleAddToFavorites()]}
                        disabled={Boolean(isLiked)}
                        aria-label='add to favorites'
                    >
                        <FavoriteIcon fontSize='small' color={isLiked ? 'error' : 'disabled'} />
                    </IconButton>
                    <Typography variant='caption' aria-label='amount of likes'>
                        {isLiked}
                    </Typography>
                    {/* <IconButton aria-label='share'>
                        <ShareIcon />
                    </IconButton> */}
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
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
};

const useStyles = makeStyles(({ transitions, palette: { background }, breakpoints: { down } }) => ({
    cover: {
        width: '100vw',
        background: '#0005',
        position: 'absolute',
        zIndex: 200,
        backdropFilter: ' blur(1.5px) grayscale(.3)'
    },
    root: {
        overflow: 'visible',
        width: 325,
        height: 570,
        position: 'relative',
        //@ts-ignore
        zIndex: ({ expanded }) => (expanded ? 200 : 'auto')
    },
    cardHeader: {
        '& .MuiCardHeader-title': {
            width: 235,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            lineBreak: 'anywhere',
            whiteSpace: 'nowrap'
            //wordBreak: 'break-word'
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
        '&:hover': {
            transform: 'scale(1.2)'
        }
    },
    actionContainer: {
        display: 'flex',
        alignContent: 'flex-end',
        marginTop: 'auto',
        background: 'inherit',
        position: 'relative'
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
        backgroundColor: red[900]
    },
    collapse: {
        position: 'absolute',
        zIndex: 200,
        width: 'inherit',
        backgroundColor: 'transparent',
        marginTop: -5,

        '&>div': {
            background: background.paper,
            boxShadow: `0px 2px -6px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)`
        },
        [down('xs')]: {
            //@ts-ignore
            paddingBottom: ({ expanded }) => (expanded ? 96 : 0)
        }
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
    likedBy?: number;
}
