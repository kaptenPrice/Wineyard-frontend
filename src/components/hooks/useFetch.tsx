const useFetch: UseFetchType = async (endpoint, init) => {
    let status = null;
    try {
        const response = await fetch(`https://miwine.herokuapp.com${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://miwine.herokuapp.com',
                'Access-Control-Allow-Credentials': 'true'
            },
            credentials: 'include',

            ...init
        });
        console.log(response);
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
    | '/user/deletewine'
    | '/user/forgotpassword'
    | '/user/getall'
    | '/user/getbyid'
    | `/user/resetPassword/${string}`;
