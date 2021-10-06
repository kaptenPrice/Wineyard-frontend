import { useSnackbar } from 'notistack';
import { Dispatch, SetStateAction } from 'react';
import useFetch from './useFetch';

export const useAPIHandlers = () => {
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteWineDB = async (wineId: string) => {
        try {
            const response = await useFetch(`/wine/delete/${wineId}`, {
                method: 'DELETE'
            });
            if (response.status === 200) {
                console.log(response.data.message);
                enqueueSnackbar(`Successfully deleted: ${response.data.name}`, {
                    variant: 'success'
                });
            } else {
                enqueueSnackbar('Something went wrong, reload the page and try again', {
                    variant: 'warning'
                });
            }
        } catch (error) {
            enqueueSnackbar('Something went wrong, reload the page and try again', {
                variant: 'error'
            });
            console.log(error);
        }
    };
    const handleRemoveFromFavorites = async (wineId: string) => {
        await useFetch(`/user/deletewine/${wineId}`, {
            method: 'PUT'
        });
    };
    const handleAddToFavorites = async (_id: string) => {
        try {
            await useFetch('/user/addfavoritewine', {
                method: 'PATCH',
                body: JSON.stringify({ id: _id })
            });
        } catch (error) {
            console.log(error);
        }
    };
    const fetchWines = async (
        currentPage: number,
        currentSize: number,
        setWineData: Dispatch<SetStateAction<any[]>>,
        setActualSize: Dispatch<SetStateAction<number>>,
        setCurrentPage: Dispatch<SetStateAction<number>>
    ) => {
        const nextPageIndex = currentPage + 1;
        try {
            const {
                data: { data, page, amountWines },
                status
            } = await useFetch('/wine/paginate', {
                method: 'POST',
                body: JSON.stringify({ size: currentSize, page: nextPageIndex })
            });
            if (status === 200) {
                setWineData((current) => [...current, ...data]);
                setActualSize(amountWines);
            }
            setCurrentPage(page);
        } catch (error) {
            console.error(error);
        }
    };

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
        handleDeleteWineDB,
        handleRemoveFromFavorites,
        handleAddToFavorites,
        fetchWines,
        handleAddNewWine
    };
};
