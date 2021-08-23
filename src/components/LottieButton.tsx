import React, { useEffect, useRef } from 'react';
import Lottie, { LottieProps, Options } from 'react-lottie';
import { IconButton, IconButtonProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const LottieButton = ({
    animationData,
    isClicked,
    lottieProps,
    ...iconProps
}: LottieButtonPropsType) => {
    const lottieRef = useRef(null);
    const classes = useStyles();

    useEffect(() => {
        lottieRef.current?.anim.goToAndStop(
            isClicked ? animationData.op - animationData.ip : 0,
            true
        );
    }, []);

    return (
        <IconButton
            {...iconProps}
            className={[classes.LottieButton, iconProps.className].join(' ')}
        >
            <Lottie
                {...lottieProps}
                options={{
                    loop: false,
                    autoplay: false,
                    animationData: animationData,
                    ...lottieProps?.options
                }}
                direction={isClicked ? 1 : -1}
                isClickToPauseDisabled={true}
                ref={lottieRef}
            />
        </IconButton>
    );
};

export default LottieButton;

export type LottieButtonPropsType = IconButtonProps & {
    animationData: any;
    isClicked?: boolean;
    lottieProps?: Omit<LottieProps, 'options'> & { options?: Options };
};

const useStyles = makeStyles(({}) => ({
    LottieButton: {
        padding: 0,
        width: 45,
        height: 45,
        '&>div': {
            display: 'flex'
        },
        '&:hover': { backgroundColor: 'unset' },
        '& .MuiTouchRipple-root': {
            visibility: 'hidden'
        }
    }
}));
