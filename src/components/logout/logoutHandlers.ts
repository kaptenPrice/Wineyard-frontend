import React, { Dispatch, MouseEventHandler, SetStateAction, } from 'react';
import useMyHistory from '../../hooks/useMyHistory';
import useFetch from '../../lib/useFetch';
import { useProfile } from '../../provider/ProfileProvider';

export const logoutHandlers: logoutPropTypes = (setServerMessage) => {
    const history = useMyHistory();
    const {setProfile } = useProfile();


    const handleLogout = async () => {
        const response = await useFetch('/logout');

        if (response.status === 200) {
            setServerMessage(response.data?.message);
            setProfile(null);
            history.replace('/');
        } else {
            setServerMessage('Server seems to be tired, visit later please');
            return;
        }
    };

    return handleLogout;
};
type logoutPropTypes = (
    setServerMessage: Dispatch<SetStateAction<string>>,
) => MouseEventHandler<any>;
