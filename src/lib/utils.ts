export const emailToInitials = (email: string, splitWith:string) => {
    let init :string= '';
    if (email) {
        const name = email.split('@')[0].split(splitWith);
        init = name[0].split('')[0] + (name.length > 1 ? name[1].split('')[0] : '');
    }
    return init.toUpperCase();
};

