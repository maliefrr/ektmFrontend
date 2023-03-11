import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import logo from "../assets/logo-uho.png"
import Mahasiswa from '../components/Mahasiswa';
import User from '../components/User'
import QRGenerator from '../components/QRGenerator'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import { useEffect } from 'react'
import { RotatingLines } from  'react-loader-spinner'
import html2pdf from 'html2pdf.js';
import axios from 'axios'
import { logout } from '../features/auth/authSlice';
import Button from '../components/Button';
const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {user} = useSelector((state) => state.auth)
    const {mahasiswaIsError,mahasiswaMessage} = useSelector((state) => state.mahasiswa)
    useEffect(() => {
        if (mahasiswaIsError) {
        toast.error(mahasiswaMessage)
        }

        if (!user) {
        logout()
        navigate('/')
        }
        const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/mahasiswa/profile/${user.data.username}`);
            setData(response.data.mahasiswa);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
        };
        if(user.data.role === "mahasiswa"){
            fetchData()
        }
    }, [user, navigate, mahasiswaIsError, mahasiswaMessage, dispatch])
    if (error) {
        toast.error(`An error occurred: ${error.message}`)
    }
    if (isLoading) {
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
    const getBase64FromImageUrl = (imageUrl) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl);
        };
        img.onerror = () => {
        reject(new Error("Failed to load image"));
        };
        img.src = imageUrl;
    });
    }

    const handleDownload = async () => {
        const element = document.querySelector("#ktm")
        const img = document.querySelector("#profile-pict")
        console.log(img)
        // convert image url to base64
        const dataUrl = await getBase64FromImageUrl(img.src)
        const config = {
            filename: `ktm-${user.data.username}.pdf`
        }
        // set base64 image data as the new image source
        img.src = dataUrl

        // create pdf
        html2pdf().set(config).from(element).save();
    }
    return (
        <>
            <div className="flex flex-col h-screen">
                <SideBar />
                <div className='flex-1 h-full'>
                    {user.data.role === "admin" ? (
                        <>
                        <User />
                        <Mahasiswa />
                        </>
                    ) : (
                        <>
                        <div className='p-4 w-full border-black' id="ktm">
                        <div className='text-center md:ml-[16rem]'>
                            <div className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg m-4">
                                <div className="flex justify-between px-6 py-4 bg-gray-200">
                                    <div>
                                        <h2 className="font-medium text-lg">
                                        Universitas Halu Oleo
                                        </h2>
                                        <p><a href="https://www.uho.ac.id/" target="_blank" rel="noreferrer noopener">www.uho.ac.id</a></p>
                                    </div>
                                    <img
                                    src={logo}
                                    alt="Universitas Halu Oleo logo"
                                    className="h-10"
                                    />
                                </div>
                                <div className="flex h-48 bg-white">
                                    <div className="w-1/3 px-6 py-4">
                                    <img src={data.pas_foto} alt="profile pic" className="w-48 h-24 object-cover" id="profile-pict"/>
                                    <QRGenerator className="mt-1"/>
                                    </div>
                                    <div className="w-2/3 px-4 py-4">
                                        <div className="font-bold text-xl mb-2">{data.name}</div>
                                        <div className='flex flex-col w-full'>
                                            <p className='text-sm text-start'>NIM : {data.nim}</p>
                                            <p className='text-sm text-start'>Program Studi : {data.prodi}</p>
                                            <p className='text-sm text-start'>Alamat : {data.alamat}</p>
                                            <p className='text-sm text-start'>Jenis Kelamin : {data.jenis_kelamin}</p>
                                            <p className='text-sm text-start'>Golongan Darah : {data.gol_darah}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>        
                        </div>
                        </div>
                            <div className='ml-[20rem]'>
                                <Button text="Download" onClick={handleDownload} class=""/>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard