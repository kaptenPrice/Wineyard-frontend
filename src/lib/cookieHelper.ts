export const handleCookie = (cookieName: string, cookieValue: string, hoursToExpire: number) => {
    const date = new Date();
    date.setTime(date.getTime() + hoursToExpire * 60 * 60 * 1000);
    return (document.cookie =
        cookieName + ' = ' + cookieValue + '; expires = ' + date.toLocaleDateString());
};


