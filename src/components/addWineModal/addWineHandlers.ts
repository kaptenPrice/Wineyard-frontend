import React, { Dispatch, SetStateAction } from 'react';
import useFetch from '../../lib/useFetch';

export const addWineHandlers = () => {
    const handleAddNewWine =
        (
            name: string,
            country: string,
            year: string,
            description: string,
            avatar: any,
            handleModal: () => void,
            setError: Dispatch<SetStateAction<string>>
        ) =>
        async () => {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('country', country);
            formData.append('year', year);
            formData.append('description', description);
            avatar && formData.append('avatar', avatar);

            try {
                const respons = await useFetch('/wine/add', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                    headers: undefined
                });
                respons.status === 201 && handleModal();
                respons.data.error && setError(respons.data.error);
            } catch (error) {
                console.log(error);
            }
        };

    return {
        handleAddNewWine
    };
};
