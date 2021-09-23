import { useHistory } from 'react-router';
import urlcat from 'urlcat';

const useMyHistory = () => {
    const history = useHistory();

    const generateLink = (url: string, params?: Record<string, string | number>) => {
        return urlcat(url, params ?? {});
    };

    const push = (url: string, params?: Record<string, string | number>, state?: unknown) => {
        const buildUrl = generateLink(url, params);
        history.push(buildUrl, state);
    };

    return {
        ...history,
        push,
        generateLink
    };
};

export default useMyHistory;
