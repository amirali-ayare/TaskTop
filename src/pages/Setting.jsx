import '../App.css';
import '../easy.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useState } from 'react';
import { ProfileContext } from '../App';
import RingLoader from "react-spinners/RingLoader";
import blackprofile from '../images/blackprofile.jpg';
import user from '../images/user1.jpg';
import { useNavigate } from 'react-router-dom';

export const Setting = () => {
    const { state, dispatch, image , setImage } = useContext(ProfileContext);


    const schema = yup.object().shape({
        name: yup.string(),
        lastname: yup.string(),
        username: yup.string(),
        job: yup.string()
    })
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema)})

    
    const navigate = useNavigate();

    const onFormSubmit = () => {
        navigate('/')
    }
    const handleInputChange = (event) => {
        dispatch({ type: "change_input", data: { name: event.target.name, value: event.target.value } })
    }




    let [loading, setLoading] = useState(false);


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

    console.log(state);


    return (
        <div id='signupContainer' className='w-100 h-100 d-flex column ai-center pt-20'>


            <div id='signupform' className='w-50 d-flex ai-center column'>
                <h1 className='white fw-800'>تنظیمات</h1>

                <form onSubmit={handleSubmit(onFormSubmit)} className='w-100 d-flex ai-center column'>

                    <div className='w-100 d-flex mt-20 ai-center ju-center'>
                        <span className='setProfile'><img src={image != null ? image : user} /></span>

                        <i id='addimgicon' style={{top:'170px'}} class='bx bxs-plus-circle purple bold fs-28 absolute'></i>
                        <input type='file' style={{top:'170px'}} onChange={onImageChange} id='profileinput' className='absolute pointer' />

                    </div>

                    <RingLoader
                    color={"#6763FE"}
                    loading={loading}
                    size={90}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    style={{ position: 'absolute', top: '100px', right: '685px', zIndex: '1' }}
                    />

                    <input type='text'
                        name='name'
                        className='black-input mt-20'
                        {...register("name")} placeholder='نام جدید...'
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
                        {...register("lastname")} placeholder='نام خانوداگی جدید...'
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
                        {...register("username")} placeholder='نام کاربری جدید...'
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
                        {...register("job")} placeholder='شغل جدید...'
                        onChange={handleInputChange}
                    />
                    <i id='aticon' class='bx bx-wrench signicons'></i>
                    {
                        errors.job && (
                            <h6 className='red fw-300 w-50 mb-10' style={{ marginTop: '-20px' }}>{errors.job?.message}</h6>
                        )
                    }







                    <button type='submit' className='signupbtn w-60 p-15 white no-border pointer' style={{ borderRadius: '30px', backgroundColor: '#6763FE' }}>اعمال</button>



                </form>

            </div>

        </div>
    )
}


