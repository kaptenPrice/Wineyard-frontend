const useFetch: UseFetchType = async (endpoint, init) => {
    let status = null;
    try {
        const response = await fetch(`http://localhost:3001${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            ...init
        });
        status = response.status;
        const data = await response.json();
        return { data, status };
    } catch (error) {
        return { error, status };
    }
};

export default useFetch;

type UseFetchType = (
    endpoint: EndPointType,
    init?: RequestInit
) => Promise<{
    data?: any;
    status: number;
    error?: any;
}>;

type RequestInit = Parameters<typeof fetch>[1];

type EndPointType =
    | '/register'
    | '/login'
    | '/profile'
    | '/logout'
    | '/wine/add'
    | '/wine/update'
    | '/wine/getall'
    | '/wine/paginate'
    | `/wine/getbyid/${string}`
    | '/wine/byNameOrCountry'
    | '/wine/delete'
    | '/user/addfavoritewine'
    | `/user/deletewine/${string}`
    | '/user/forgotpassword'
    | '/user/getall'
    | '/user/getbyid'
    | `/user/resetPassword/${string}`;
