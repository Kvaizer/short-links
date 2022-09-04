import React, {useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useFormik} from 'formik';
import {registration} from '../../store/reducers/auth-reducer';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {TextField} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import Button from '@mui/material/Button';
import styles from './Registration.module.css'
import {ErrorSnackbar} from '../common/ErrorSnackBar';
import {Navigate, NavLink} from 'react-router-dom';
import s from './Registration.module.css'
import LinearProgress from '@mui/material/LinearProgress';

type FormikErrorsType = {
    login?: string
    password?: string
    repeatPass?: string
}

const Registration: React.FC = React.memo(() => {
    const dispatch = useAppDispatch()

    const appStatus = useAppSelector((state) => state.app.status)

    const [passVisibility, setPassVisibility] = useState<boolean>(true)

    const changeVisibility = useCallback(() => {
        setPassVisibility(!passVisibility)
    }, [passVisibility])

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
            repeatPass: ''
        },
        validate: (values) => {
            const errors: FormikErrorsType = {};
            if (!values.login) {
                errors.login = 'Required'
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 7) {
                errors.password = 'Min length is 7 symbols'
            }

            if (!values.repeatPass) {
                errors.repeatPass = 'Required';
            } else if (values.password !== values.repeatPass) {
                errors.repeatPass = 'Not the same as password field'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(registration({username: values.login, password: values.password}))
            formik.resetForm()
        }
    })

    if (appStatus === 'succeeded') {
        return <Navigate to='/'/>
    }

    return (
        <div className={s.mainBox}>
            {appStatus === 'inProgress' ? <LinearProgress/> : null}
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <Paper className={styles.block}>
                        <Box className={styles.boxStyles}>
                            <Typography component="h1" variant="h5">
                                Sign Up
                            </Typography>
                            <TextField label='Login'
                                       margin='normal'
                                       required
                                       fullWidth
                                       autoFocus
                                       autoComplete="login"
                                       helperText={(formik.errors.login && formik.touched.login) ? formik.errors.login : 'Please enter your email'}
                                       error={!!formik.errors.login && formik.touched.login}
                                       {...formik.getFieldProps('login')}/>
                            <TextField label='Password'
                                       margin='normal'
                                       required
                                       fullWidth
                                       helperText={(formik.errors.password && formik.touched.password) ? formik.errors.password : 'Please enter your password'}
                                       type={passVisibility ? 'password' : 'text'}
                                       error={!!formik.errors.password && formik.touched.password}
                                       InputProps={{
                                           endAdornment: <InputAdornment position="start">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={changeVisibility}
                                                   edge="end">
                                                   {passVisibility ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           </InputAdornment>,
                                       }}
                                       {...formik.getFieldProps('password')}/>

                            <TextField label='Confirm your password'
                                       margin='normal'
                                       required
                                       fullWidth
                                       helperText={(formik.errors.repeatPass && formik.touched.repeatPass) ? formik.errors.repeatPass : 'Confirm your password'}
                                       type={passVisibility ? 'password' : 'text'}
                                       error={!!formik.errors.repeatPass && formik.touched.repeatPass}
                                       InputProps={{
                                           endAdornment: <InputAdornment position="start">
                                               <IconButton
                                                   aria-label="toggle password visibility"
                                                   onClick={changeVisibility}
                                                   edge="end">
                                                   {passVisibility ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           </InputAdornment>,
                                       }}
                                       {...formik.getFieldProps('repeatPass')}/>

                            <Button sx={{mt: 3, mb: 2}}
                                    fullWidth
                                    type={'submit'}
                                    variant={'contained'}
                                    disabled={!!(formik.errors.login || formik.errors.repeatPass)}>
                                Register
                            </Button>
                            <Grid item>
                                <NavLink to='/'>
                                    <span>Back to login</span>
                                </NavLink>
                            </Grid>
                        </Box>
                    </Paper>
                    <ErrorSnackbar/>
                </form>
            </Grid>
        </div>
    )
})

export default Registration;