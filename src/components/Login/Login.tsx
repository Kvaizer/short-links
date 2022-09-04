import React, {useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useFormik} from 'formik';
import {login} from '../../store/reducers/auth-reducer';
import Grid from '@mui/material/Grid';
import {CssBaseline} from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import Button from '@mui/material/Button';
import {ErrorSnackbar} from '../common/ErrorSnackBar';
import styles from './Login.module.css'
import {NavLink, Navigate} from 'react-router-dom';
import s from './Login.module.css'

type FormikErrorType = {
    login?: string
    password?: string
}

const Login = () => {
    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const [passVisibility, setPassVisibility] = useState(false)

    const changeVisibility = useCallback(() => {
        setPassVisibility(!passVisibility)
    }, [passVisibility])

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.login) {
                errors.login = 'Required';
            }

            if (!values.password) {
                errors.password = 'Password required';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(login({username: values.login, password: values.password}))
            formik.resetForm()
        },
    })

    if(isLoggedIn) return <Navigate to='/short-links'/>

    return (
        <div className={s.mainBox}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <Paper className={styles.container}>
                        <CssBaseline/>
                        <Box className = {styles.boxStyles}>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <TextField
                                color={"secondary"}
                                margin="normal"
                                required
                                fullWidth
                                id="login"
                                label="Login"
                                autoComplete="login"
                                autoFocus
                                error={!!(formik.errors.login && formik.touched.login)}
                                {...formik.getFieldProps('login')}
                                helperText={formik.touched.login && formik.errors.login
                                    ? formik.errors.login : null}
                            />
                            <TextField
                                color={"secondary"}
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type={passVisibility ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                error={!!(formik.errors.password && formik.touched.password)}
                                helperText={formik.touched.password && formik.errors.password
                                    ? formik.errors.password : null}
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={changeVisibility}
                                            edge="end">
                                            {passVisibility ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>,
                                }}
                                {...formik.getFieldProps('password')}
                            />

                            <Button
                                type={'submit'}
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                disabled={!!(formik.errors.login || formik.errors.password)}
                            >
                                Sign In
                            </Button>
                            <Grid container justifyContent={'center'}>
                                <Grid item style={{textAlign: 'center'}}>
                                    <span>Don't have an account?<br/></span>
                                    <NavLink to='/registration'>
                                        <span> Sign Up</span>
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </form>
                <ErrorSnackbar/>
            </Grid>
        </div>
    )
};

export default Login;