import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react';
import useFetch from '../../lib/useFetch';

export const UserData = createContext(undefined);

const ProfileProvider = (props: any) => {
    const [profile, setProfile] = useState(null);
    console.log(profile);

    const fetchProfile = async () => {
        const result = await useFetch('/profile');
        setProfile(result.data || null);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <UserData.Provider value={{ profile, fetchProfile }}>
            {props.children}
        </UserData.Provider>
    );
};

export default ProfileProvider;

export const useProfile = (): UseProfileType => useContext(UserData);

type UseProfileType = { profile: any; fetchProfile: any };
