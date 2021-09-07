import React, { UIEvent } from 'react';

const usehandleInfinityScroll = (
    callBack: (event: UIEvent<HTMLElement>) => void | (() => void)
) => {
    return (event: UIEvent<HTMLElement>): void => {
        const { scrollHeight, clientHeight, scrollTop } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight) {
            callBack(event);
        }
    };
};
export default usehandleInfinityScroll;
