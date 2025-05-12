import '../App.css';
import '../easy.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react';
import { ProfileContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';


export const Signup = () => {
    const { state, dispatch } = useContext(ProfileContext);

    const navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().min(9, 'ایمیل خود را به درستی وارد کنید').required('وارد کردن ایمیل اجباری است'),
        password: yup.string().min(5, 'رمز عبور حداقل باید 5 کاراکتر باشد').required('رمز عبور خود را وارد کنید')
    })
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema)})


    const onFormSubmit = (data) => {
        navigate('/personalinfo')
    }
    const handleInputChange = (event) => {
        dispatch({ type: "change_input", data: { name: event.target.name, value: event.target.value } })
    }
    


    return (
        <div id='signupContainer' className='w-100 h-100 d-flex ai-center ju-center'>

            <div id='signupform' className='w-50 d-flex ai-center column'>
                <h1 className='white fw-800'>ثبت نام در <span className='purple bold'>تسک تاپ</span>  </h1>

                <form onSubmit={handleSubmit(onFormSubmit)} className='w-100 d-flex ai-center column'>
                    <input type='email'
                    name='email'
                    className='black-input mt-30' 
                    {...register("email")} placeholder='ایمیل...'
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    />
                    <i id='lockicon' class='bx bx-lock signicons'></i>
                    {
                        errors.password && (
                            <h6 className='red fw-300 w-50 mb-10' style={{ marginTop: '-20px' }}>{errors.password?.message}</h6>
                        )
                    }

                    <button type='submit' className='signupbtn w-60 p-15 white no-border pointer' style={{ borderRadius: '30px', backgroundColor: '#6763FE' }}>ثبت نام</button>

                </form>

                <h5 className='w-55 fw-300 mt-20 d-flex ju-bet white'>
                    حساب دارید؟
                    <Link className='dec-none' to={'/login'}><span className='purple pointer'>ورود</span></Link>
                </h5>
            </div>

        </div>
    )
}


