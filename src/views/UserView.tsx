import { Typography } from '@material-ui/core';
import React, { useState } from 'react';
import usehandleInfinityScroll from '../components/hooks/usehandleInfinityScroll';

const User = () => {
    const [state, setState] = useState(0);

    return (
        <>
            <p>{state}</p>
            <div
                style={{
                    marginLeft: 50,
                    width: 500 * 2,
                    height: 500 * 2,
                    overflow: 'auto',
                    backgroundColor: 'cornsilk'
                }}
                // onScroll={}
            >
              
            </div>
        </>
    );
};

export default User;
