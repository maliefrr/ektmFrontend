import React from 'react'
import { Link } from 'react-router-dom'
import InputForm from '../components/InputForm'
import logo from "../assets/logo-uho.png"
import Button from '../components/Button'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { reset, login } from '../features/auth/authSlice'
import { RotatingLines } from  'react-loader-spinner'
import { useEffect, useState } from 'react'

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const {username,password} = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user,isLoading,isSuccess,isError,message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) {
            navigate("/dashboard")
        }

        dispatch(reset())
    },[isSuccess,isError,user,dispatch,navigate,message])

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    if(isLoading){
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
    
    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            username,password
        }

        dispatch(login(userData))

        setFormData({
            username: "",
            password: ""
        })
    }

    return (
        <>
        <div className='font-arima bg-gradient-to-r from-sky-500 to-gray-400 md:overflow-y-hidden h-screen'>
            <main className='max-w-screen-2xl flex items-center h-auto md:h-screen mx-auto'>
                <div className="h-full w-3/4 bg-sky-200/30 hidden bg-cover bg-center lg:flex">
                    <div className="m-auto">
                        <img src={logo} alt="logo" width="100" className="mx-auto mb-6" />
                        <h1 className="text-4xl text-white font-bold font-dancing tracking-widest bayangan">E-KTM Web Admin</h1>
                    </div>
                </div>
                <div className='shadow-lg p-4 bg-slate-100/30 backdrop-blur-md max-w-sm my-2 mx-auto rounded-md md:my-auto lg:m-0 lg:rounded-none lg:w-full lg:h-full lg:flex-col'>
                    <Link to="/" className="flex items-center hover:font-medium pb-5 lg:pb-0">
                        <img src={logo} alt="logo" width="30" className="" />
                        <h3 className="ml-3 font-dancing">E-KTM Web Admin</h3>
                    </Link>
                    <div className='w-full h-full flex'>
                        <div className='m-auto'>
                            <h3 className="text-center font-semibold text-slate-600 mb-3"><i className="bx bxs-user text-lg"></i> Masuk</h3>
                            <hr className="mb-3 mx-16 lg:mb-11" />
                            <form action="" onSubmit={onSubmit}>
                                <InputForm id='Username' type='text' name='username' placeholder="Username" label="Username" value={username} onChange={onChange}/>
                                <InputForm id='Password' type='password' name='password' placeholder="Password" label="Password" value={password} onChange={onChange}/>
                                <div className="text-right">
                                    <div className="inline-block mt-5 text-blue-700 cursor-pointer hover:text-blue-900 hover:underline" id="forgot-password">Lupa Password?</div>
                                </div>
                                <Button text="Masuk" type="submit" className="mx-auto"/>
                                <p className="mt-5 text-center">Belum punya akun?<Link to="/register" className="text-blue-700 hover:text-blue-900 hover:underline">Daftar Sekarang</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        </>
    )
    }

export default Login
