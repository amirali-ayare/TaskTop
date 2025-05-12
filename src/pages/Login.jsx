import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useRef, useState } from 'react';
import { ProfileContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';


export const Login = () => {

    const { state, dispatch, signedUp,setSignedUp } = useContext(ProfileContext);

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().required('وارد کردن ایمیل اجباری است'),
        password: yup.string().required('رمز عبور خود را وارد کنید')
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const handleChange = (e ,setFunc) => {
        setFunc(e.target.value)
    }

    const onFormSubmit = (data) => {
        if(loginEmail===state.email && loginPassword===state.password) {
            navigate('/')
            setSignedUp(true)
        }
    }

    return (
        <div>
            <div id='signupContainer' className='w-100 h-100 d-flex ai-center ju-center'>

                <div id='signupform' className='w-50 d-flex ai-center column'>
                    <h1 className='white fw-800'>ورود به <span className='purple bold'>تسک تاپ</span></h1>

                    <form onSubmit={handleSubmit(onFormSubmit)} className='w-100 d-flex ai-center column'>
                        <input type='email'
                            name='email'
                            className='black-input mt-30'
                            {...register("email")} placeholder='ایمیل...'
                            onChange={(e)=>handleChange(e, setLoginEmail)}
                        />
                        <i id='aticon' class='bx bx-at signicons'></i>
                        {
                            errors.email && (
                                <h6 className='red fw-300 w-50 mb-10' style={{ marginTop: '-20px' }}>{errors.email?.message}</h6>
                            )
                        }
                        <input type='password'
                            name='password'
                            className='black-input'
                            {...register("password")}
                            placeholder='رمز عبور...'
                            onChange={(e)=>handleChange(e, setLoginPassword)}
                        />
                        <i id='lockicon' class='bx bx-lock signicons'></i>
                        {
                            errors.password && (
                                <h6 className='red fw-300 w-50 mb-10' style={{ marginTop: '-20px' }}>{errors.password?.message}</h6>
                            )
                        }

                        <button type='submit' className='signupbtn w-60 p-15 white no-border pointer' style={{ borderRadius: '30px', backgroundColor: '#6763FE' }}>ورود</button>

                    </form>

                    <h5 className='w-55 fw-300 mt-20 d-flex ju-bet white'>
                        ثبت نام نکرده اید؟
                        <Link className='dec-none' to={'/signup'}><span className='purple pointer'>ثبت نام</span></Link>
                    </h5>
                </div>

            </div>
        </div>
    )
}