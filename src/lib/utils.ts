

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
