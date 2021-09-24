import React from 'react';
import { useProfile } from '../provider/ProfileProvider';

import HomeComponentAuth from '../components/HomeComponentAuth';
import HomeComponentUnAuth from '../components/HomeComponentUnAuth';

const Home = () => {
    const { profile } = useProfile();

    return <>{profile ? <HomeComponentAuth /> : <HomeComponentUnAuth />}</>;
};

export default Home;
