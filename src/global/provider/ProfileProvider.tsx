import React, { createContext, useContext, useEffect, useState, Dispatch } from 'react';
import useFetch from '../../lib/useFetch';

export const UserData = createContext(undefined);

const ProfileProvider = (props: any) => {
    const [profile, setProfile] = useState(undefined);
    const fetchProfile = async () => {
        const result = await useFetch('/profile');
        setProfile(result.data?.profile || null);

    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <UserData.Provider value={{ profile, fetchProfile, setProfile }}>
            {profile !== undefined && props.children}
        </UserData.Provider>
    );
};

export default ProfileProvider;

export const useProfile = (): UseProfileType => useContext(UserData);

type UseProfileType = {
    profile: any;
    fetchProfile: any;
    setProfile: Dispatch<any>;
};
