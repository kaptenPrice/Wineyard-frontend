export const emailToInitials = (email: string) => {
    let init = '';
    if (email) {
        const name = email.split('@')[0].split('.');
        init = name[0].split('')[0] + (name.length > 1 ? name[1].split('')[0] : '');
    }
    return init.toUpperCase();
};
