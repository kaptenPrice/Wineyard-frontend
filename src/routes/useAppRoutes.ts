import useMyHistory from '../hooks/useMyHistory';
import { AppRoutes } from './AppRoutes';

export const useAppRoutes = () => {
    const history = useMyHistory();

    const goToHome = () => {
        history.push(AppRoutes.HOME);
    };

    const goToLogin = () => {
        history.push(AppRoutes.LOGIN);
    };

    const goToLogout = () => {
        history.push(AppRoutes.LOGOUT);
    };

    const goToUser = () => {
        history.push(AppRoutes.PROFILE);
    };

    const goToSettings = () => {
        history.push(AppRoutes.SETTINGS);
    };

    const goToWines = () => {
        history.push(AppRoutes.WINES);
    };

    const goToResetPassword = (token: string) => {
        history.push(AppRoutes.RESET_PASSWORD.replace(':token', token));
    };

    return {
        goToHome,
        goToLogin,
        goToLogout,
        goToUser,
        goToWines,
        goToSettings,
        goToResetPassword
    };
};
