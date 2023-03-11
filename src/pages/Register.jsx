import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/logo-uho.png"
import Button from '../components/Button'
import InputForm from '../components/InputForm'
import {toast} from 'react-toastify'
import {reset, register} from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { RotatingLines } from  'react-loader-spinner'


const Register = () => {
    const [formData, setFormData] = useState({
        nama: "",
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })

    const {name,username,email,password,passwordConfirmation} = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user,isError,isSuccess,isLoading,message} = useSelector((state) => state.auth )

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess) {
            toast.success("User successfully registered")
            navigate("/")
        }

        dispatch(reset())
    },[user,isSuccess,isError,message,navigate,dispatch])

    if(isLoading) {
        return <div className='loadingSpinnerContainer'>
            <RotatingLines
            strokeColor="black"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
            />
        </div>
    }

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== passwordConfirmation) {
            toast.error("Password and password confirmation did not match")
            setFormData(() => ({
                name,username,email,
                password: "",
                passwordConfirmation: ""
            }))
        } else {
            const userData = {
                name,username,password,email
            }
            dispatch(register(userData))
            setFormData(() => ({
                nama: "",
                username: "",
                email: "",
                password: "",
                passwordConfirmation: ""
            }))
        }
    }

    return (
    <div className='font-arima bg-gradient-to-r from-sky-500 to-gray-400 lg:h-full md:h-screen h-screen'>
        <main className="max-w-screen-2xl flex items-center mx-auto h-screen">
            <div className="fixed sm:top-100 sm:bottom-100 lg:top-0 lg:bottom-0 left-0 right-0 flex h-full">
                <img src={logo} alt="logo" width="250" className="m-auto" />
            </div>
            <div className='shadow-lg p-4 bg-slate-100/30 backdrop-blur-md w-full max-w-screen-lg rounded-md mx-auto md:w-4/5 md:my-6 lg:text-lg'>
                <Link to="/" className='flex hover:font-medium'>
                    <img src={logo} alt="logo" width="30" />
                    <h3 className="ml-3 font-sansita">E-KTM Web Admin</h3>
                </Link>
                <div className='w-full'>
                    <h3 className="text-center font-semibold text-slate-600 mb-3 lg:text-2xl"><i className="bx bxs-user-plus lg:text-4xl"></i> Daftar</h3>
                    <hr className="mb-3 mx-16 lg:mb-11" />
                    <form onSubmit={onSubmit}>
                    <InputForm id='Nama' type='text' name='name' placeholder="Nama" label="Nama" value={name} onChange={onChange}/>
                    <InputForm id='Username' type='text' name='username' placeholder="Username" label="Username" value={username} onChange={onChange}/>
                    <InputForm id='email' type='email' name='email' placeholder="Email" label="Email" value={email} onChange={onChange}/>
                    <InputForm id='password' type='password' name='password' placeholder="Password" label="Password" value={password} onChange={onChange}/>
                    <InputForm id='passwordConfirmation' type='password' name='passwordConfirmation' placeholder="Confirmation Password" label="Password Confirmation" value={passwordConfirmation} onChange={onChange}/>
                    <Button text="Daftar" type="Submit"/>
                    <p className="mt-5 text-center">Sudah punya akun? <a href="/" className="text-blue-700 hover:text-blue-900 hover:underline">Masuk</a></p>
                    </form>
                </div>
            </div>
        </main>
    </div>
    )
}

export default Register
