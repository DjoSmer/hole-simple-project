import React from 'react';
import {Backdrop, CircularProgress} from '@mui/material';

interface LoadingProgressProps {
    open: boolean;
}

const LoadingProgress = ({open}: LoadingProgressProps) => {
    return (
        <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export {LoadingProgress};
