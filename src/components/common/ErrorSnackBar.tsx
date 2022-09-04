import React, {SyntheticEvent} from 'react';
import Snackbar, {SnackbarCloseReason} from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {setAppError} from '../../store/reducers/app-reducer';
import {useAppDispatch, useAppSelector} from '../../hooks';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar: React.FC = React.memo(() => {
    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch();

    const handleClose = (event?: Event | SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => {
        if (reason ===  'clickaway') {
            return;
        }
        dispatch(setAppError({error: null}))
    };

    return (
        <>
        { error ? <Snackbar open={error !== undefined} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar> : null}
        </>
    );
})