import React from 'react';
import { useProfile } from '../provider/ProfileProvider';

import HomeComponentAuth from '../components/home/HomeAuth';
import HomeComponentUnAuth from '../components/home/HomeUnAuth';

const Home = () => {
    const { profile } = useProfile();

    return <>{profile ? <HomeComponentAuth /> : <HomeComponentUnAuth />}</>;
};

export default Home;
