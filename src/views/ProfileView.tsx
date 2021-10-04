import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core';

import NewWineModal from '../components/NewWineModal';
import MyWines from '../components/MyWines';
import AddWineButton from '../components/AddNewWine';

const ProfileView = () => {
    const classes = useStyles();
    const [previewAvatar, setPreviewAvatar] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const handleModal = () => {
        setIsOpen((current) => !current);
        setPreviewAvatar(null);
        setError('');
    };

    return (
        <>
            <MyWines />
            <AddWineButton onClick={handleModal} className={classes.addIcon} />
            <NewWineModal
                previewImage={[previewAvatar, setPreviewAvatar]}
                errorMessage={[error, setError]}
                open={isOpen}
                onClose={handleModal}
                handleModal={handleModal}
                handleCancel={handleModal}
            />
        </>
    );
};

export default ProfileView;
const useStyles = makeStyles(({ palette: { primary, defaultSvg }, breakpoints: { down } }) => ({
    addIcon: {
        backgroundColor: primary.main,
        padding: 20,
        position: 'fixed',
        bottom: 10,
        right: 10,
        boxShadow: '0 3px 10px #888888',
        '& path': {
            fill: defaultSvg.main
        },

        [down('xs')]: {
            bottom: 70
        }
    }
}));

/**    const handleGoToEnd = () => {
        endRef.current.scrollIntoView();
    }; */
