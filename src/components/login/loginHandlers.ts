import React, { Dispatch, MouseEvent, MouseEventHandler, SetStateAction } from 'react';
import useFetch from '../../lib/useFetch';
import { useProfile } from '../../provider/ProfileProvider';
import { useAppRoutes } from '../../routes/useAppRoutes';

export const loginHandlers = () => {
    const { goToHome } = useAppRoutes();
    const { fetchProfile } = useProfile();

    const login =
        (email: string, password: string, setServerMessage: Dispatch<SetStateAction<string>>) =>
        async (event: MouseEvent<HTMLElement>) => {
            event.preventDefault();
            try {
                const response = await useFetch('/login', {
                    method: 'POST',
                    body: JSON.stringify({ email, password })
                });
                if (response.status === 200) {
                    fetchProfile();
                    goToHome();
                } else {
                    setServerMessage(response?.data.message);
                }
            } catch (error) {
                setServerMessage('Server seems to be tired, visit later please');
            }
        };

    const handleRegister =
        (email: string, password: string, setServerMessage: Dispatch<SetStateAction<string>>) =>
        async (event: MouseEvent<HTMLElement>) => {
            event.preventDefault();
            try {
                const response = await useFetch('/register', {
                    method: 'POST',
                    body: JSON.stringify({ email, password })
                });
                if (response.status === 200) {
                    setServerMessage(response?.data.message);
                } else {
                    setServerMessage(response?.data.error);
                    return;
                }
            } catch (error) {
                console.log('error', error);
            }
        };
    const handleForgottPassword =
        (
            email: string,
            setServerMessage: Dispatch<SetStateAction<string>>,
            setIsFlipped: Dispatch<SetStateAction<boolean>>
        ) =>
        async (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            try {
                const response = await useFetch('/user/forgotpassword', {
                    method: 'POST',
                    body: JSON.stringify({ email })
                });
                if (response.status === 200) {
                    setServerMessage(response?.data.message);

                    setTimeout(() => {
                        setIsFlipped(false);
                        setServerMessage('');
                    });
                } else {
                    setServerMessage(response?.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        };

    return {
        login,
        handleRegister,
        handleForgottPassword
    };
};

type LoginHandlerPropsType = (
    email: string,
    password: string,
    setServerMessage: Dispatch<SetStateAction<string>>,
    fetchProfile: any,
    goToHome: () => void
) => MouseEventHandler<HTMLButtonElement>;
