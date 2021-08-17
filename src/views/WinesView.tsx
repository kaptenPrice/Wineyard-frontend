import { CircularProgress } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useProfile } from '../global/provider/ProfileProvider';
import IsLoading from '../components/IsLoading';
import useFetch from '../lib/useFetch';
import { url } from 'inspector';

//Fetch data from /wine/getall and map the list
const Wines = () => {
    // const [wines, setWines] = useState(null);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setWines({});
    //     }, 3000);
    // }, []);
    useEffect(() => {
        // window.history.replaceState("","", "/")
    }, []);
    return (
        // <IsLoading trigger={wines}>
        <Typography variant='h2'>This is the Wine page</Typography>
        // </IsLoading>
    );
};

export default Wines;
