import React, { Dispatch, SetStateAction } from 'react';
import useFetch from '../../lib/useFetch';
import { useAppRoutes } from '../../routes/useAppRoutes';

export const resetPassHandlers = () => {
    const { goToLogin } = useAppRoutes();

    const handleTokenVerify: handleTokenPropsTypes = async (token, setIsValid, setServerMessage) => {
        try {
            const { status, data } = await useFetch(`/user/resetPassword/${token}`, {
                method: 'POST',
                credentials: 'omit'
            });
            if (status === 200) {
                setIsValid(true);
            } else {
                setServerMessage(data?.message);
            }
        } catch (error) {
            console.log('error', error);
        }
    };
    const changePassword = async (
        password: string,
        tempPassword: string,
        token: string,
        setServerMessage: Dispatch<SetStateAction<string>>,
        setTempPassword: Dispatch<SetStateAction<string>>,
        setPassword: Dispatch<SetStateAction<string>>
    ) => {
        if (password === tempPassword) {
            const { data, status, error } = await useFetch(`/user/resetPassword/${token}`, {
                method: 'POST',
                credentials: 'omit',
                body: JSON.stringify({ password })
            });
            if (error) {
                console.log(error);
                setServerMessage(error);
                return;
            } else if (status === 200) {
                setServerMessage(data?.message);
                setPassword('');
                setTempPassword('');
                setTimeout(() => {
                    goToLogin();
                    setServerMessage('');
                }, 2000);

                return;
            }
        } else {
            setServerMessage('Passwords are different');
        }
    };

    return {
        handleTokenVerify,
       changePassword
    };
};

type handleTokenPropsTypes = (
    token: string,
    setIsValid: Dispatch<SetStateAction<boolean>>,
    setServerMessage: Dispatch<SetStateAction<string>>
) => void;
