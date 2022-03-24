import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./authReducer";
import {AppRootStateType} from "../../app/store";
import { Navigate } from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}



export const Login = () => {
    const dispatch=useDispatch()
    const isLogedIn=useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)
    const formik=useFormik({
        initialValues:{
            email:'',
            password:'',
            rememberMe:false,
        },
        validate:(values)=>{
            const errors:FormikErrorType={}
            if (!values.email){
                errors.email="Email is empty"
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if(!values.password){
                errors.password="Email is empty"
            }
            else if(values.password.length<4){
                errors.password="Minimal length password is 4"
            }
            return errors
            },
        onSubmit:values => {
            dispatch(loginTC(values))
        }
    })
    if(isLogedIn){
      return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'} paddingTop={'100px'}>
        <Grid item justifyContent={'center'}>
          <form onSubmit={formik.handleSubmit}>
              <FormControl>
              <FormGroup>
                  <TextField label="Email" margin="normal"
                             {...formik.getFieldProps('email')}/>
                  {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
                  <TextField type="password" label="Password" margin="normal"
                             {...formik.getFieldProps('password')}/>
                  {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
                  <FormControlLabel label={'Remember me'} control={<Checkbox/>}
                                    {...formik.getFieldProps('rememberMe')}/>
                  <Button type={'submit'} variant={'contained'} color={'primary'}>
                      Login
                  </Button>
              </FormGroup>
          </FormControl>
              <FormLabel>
                  <p>Use common test account credentials:</p>
                  <p>Email: free@samuraijs.com</p>
                  <p>Password: free</p>
              </FormLabel>
          </form>
        </Grid>
    </Grid>
}


