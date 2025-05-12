import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react';
import { ProfileContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import user from '../images/user1.jpg';
import RingLoader from "react-spinners/RingLoader";
import { useState } from 'react';
import blackprofile from '../images/blackprofile.jpg';

export const PersonalInfo = () => {
    const { state, dispatch, image, setImage, signedUp , setSignedUp } = useContext(ProfileContext);
    let [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setLoading(true)
            setImage(blackprofile)
            setTimeout(() => {
                setLoading(false)
                setImage(URL.createObjectURL(event.target.files[0]));
            }, 4000);
        }
    }
    const schema = yup.object().shape({
        name: yup.string().required('نام خود را وارد کنید'),
        lastname: yup.string().required('نام خانوادگی را وارد کنید'),
        username: yup.string().min(4, 'نام کاربری حداقل باید 4 کاراکتر باشد').required(),
        job: yup.string().required('شغل خود را وارد کنید')
    })
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })


    const onFormSubmit = (data) => {
        setSignedUp(true)
        navigate('/')
    }

    const handleInputChange = (event) => {
        dispatch({ type: "change_input", data: { name: event.target.name, value: event.target.value } })
    }

    console.log(state)

    return (
        <div id="personalinfoContainer" className="w-100 h-100 d-flex ai-center ju-center">
            <div className="w-50 d-flex column ai-center h-100" style={{ height: '550px' }}>
                <h1 className="white fw-800">تکمیل <span className="purple">پروفایل</span></h1>

                <div className='w-100 d-flex mt-20 ai-center ju-center'>
                    <span className='setProfile'><img src={image != null ? image : user} /></span>

                    <i id='addimgicon' class='bx bxs-plus-circle purple bold fs-28 absolute'></i>
                    <input type='file' onChange={onImageChange} id='profileinput' className='absolute pointer' />

                </div>

                <RingLoader
                    color={"#6763FE"}
                    loading={loading}
                    size={90}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    style={{ position: 'absolute', top: '80px', right: '685px', zIndex: '1' }}
                />

                <form onSubmit={handleSubmit(onFormSubmit)} className='w-100 d-flex ai-center column'>

                    <input type='text'
                        name='name'
                        className='black-input mt-20'
                        {...register("name")} placeholder='نام...'
                        onChange={handleInputChange}
                    />
                    <i id='aticon' class='bx bx-id-card signicons'></i>
                    {
                        errors.name && (
                            <h6 className='red fw-300 w-50 mb-10' style={{ marginTop: '-20px' }}>{errors.name?.message}</h6>
                        )
                    }

                    <input type='text'
                        name='lastname'
                        className='black-input'
                        {...register("lastname")} placeholder='نام خانوداگی...'
                        onChange={handleInputChange}
                    />
                    <i id='aticon' class='bx bx-group signicons'></i>
                    {
                        errors.lastname && (
                            <h6 className='red fw-300 w-50 mb-10' style={{ marginTop: '-20px' }}>{errors.lastname?.message}</h6>
                        )
                    }


                    <input type='text'
                        name='username'
                        className='black-input'
                        {...register("username")} placeholder='نام کاربری...'
                        onChange={handleInputChange}
                    />
                    <i id='aticon' class='bx bx-user-circle signicons'></i>
                    {
                        errors.username && (
                            <h6 className='red fw-300 w-50 mb-10' style={{ marginTop: '-20px' }}>{errors.username?.message}</h6>
                        )
                    }

                    <input type='text'
                        name='job'
                        className='black-input'
                        {...register("job")} placeholder='شغل...'
                        onChange={handleInputChange}
                    />
                    <i id='aticon' class='bx bx-wrench signicons'></i>
                    {
                        errors.job && (
                            <h6 className='red fw-300 w-50 mb-10' style={{ marginTop: '-20px' }}>{errors.job?.message}</h6>
                        )
                    }

                    <button type='submit' className='signupbtn w-60 p-15 white no-border pointer' style={{ borderRadius: '30px', backgroundColor: '#6763FE' }}>تایید</button>

                </form>

            </div>
        </div>
    )
}