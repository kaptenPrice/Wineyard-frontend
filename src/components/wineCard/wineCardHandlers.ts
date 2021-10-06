import { useSnackbar } from 'notistack';
import useFetch from '../../lib/useFetch';

export const wineCardHandlers = () => {
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
    
    return{
        handleDeleteWineDB,
        handleRemoveFromFavorites,
        handleAddToFavorites

    }
}


