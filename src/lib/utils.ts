import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const stringToInitials = (email: string, splitOn: string) => {
    let init: string = '';
    if (email) {
        const name = email.split('@')[0].split(splitOn);
        init = name[0].split('')[0] + (name.length > 1 ? name[1].split('')[0] : '');
    }
    return init.toUpperCase();
};

/* const CustomSlide = forwardRef((props: SlideProps, ref) => {
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('sm'));
//@ts-ignore
    return <Slide {...props} direction={isSmallScreen ? 'up' : 'down'} ref={ref} />;
}); */


export const handleFile =
    (
        setAvatar: Dispatch<SetStateAction<File | any>>,
        setPreviewAvatar: Dispatch<SetStateAction<string | ArrayBuffer>>,
        setError?: Dispatch<SetStateAction<string>>,
        setIsFormValid?: Dispatch<SetStateAction<boolean>>
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
        const types = ['image/png', 'image/jpeg'];
        const tempImage = event.currentTarget.files[0];
        if (tempImage && types.includes(tempImage.type)) {
            var reader = new FileReader();
            reader.onloadend = () => {
                setIsFormValid && setIsFormValid(false);
                setAvatar(tempImage);
                setPreviewAvatar(reader.result);
            };
            reader.readAsDataURL(tempImage);
            setError && setError('');
        } else {
            setIsFormValid && setIsFormValid(true);
            setAvatar(null);
            setPreviewAvatar(null);
            setError && setError(`File is not valid, please choose png/jpeg `);
        }
    };
