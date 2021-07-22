import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'
import {FormikErrors, useFormik} from 'formik'
import {TLoginParams} from '../../api/auth_api'
import {useSelector} from 'react-redux'
import {login} from './auth_reducer'
import {Redirect} from 'react-router-dom'
import {useAppDispatch} from '../../app/store'
import {selectIsAuth} from './selectors'

export const Login = () => {
    console.log('LOGIN rendered')

    const dispatch = useAppDispatch()
    const isAuth = useSelector(selectIsAuth)

    //* ======================================================================================== Validation ==========>>
    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: string
    }
    const validate = (values: TLoginParams) => {
        const errors: FormikErrors<FormikErrorType> = {}
        if (!values.email) {
            errors.email = 'Required'
        } else if (values.email.length > 20 || values.email.length < 7) {
            errors.email = 'Must be 6-20 characters'
        }
        // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //     errors.email = 'Invalid email address'
        // }

        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length > 20 || values.password.length < 7) {
            errors.password = 'Must be 6-20 characters'
        }
        return errors;
    };

    //* ======================================================================================== Formik ==============>>
    const formik = useFormik<TLoginParams>({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate,
        onSubmit: async (values,formikHelpers) => {
            let res = await dispatch(login({data: values}))

            if(login.rejected.match(res)) {
                if(res.payload?.fieldsErrors?.length) {
                    const error = res.payload.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    });

    // if user authorized - redirect to main page
    if (isAuth) return <Redirect to={'/'}/>

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label={'Email'}
                            margin={'normal'}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email && formik.touched.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            type={'password'}
                            label={'Password'}
                            margin={'normal'}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.errors.password && formik.touched.password ?
                            <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox {...formik.getFieldProps('rememberMe')}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

