import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import InputForm from "../components/InputForm"
import axios from "axios"
import {toast} from "react-toastify"
const ShowProfile = (props) => {
    const {username} = useParams()
    const [data, setData] = useState({
        name : "",
        prodi : "",
        nim : "",
        gol_darah : "",
        jenis_kelamin : "",
        pas_foto: "",
        alamat: ""
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://ektm-backend.up.railway.app/api/mahasiswa/profile/${username}`)
                setData({
                    name : response.data.mahasiswa.name,
                    prodi: response.data.mahasiswa.prodi,
                    nim: response.data.mahasiswa.nim,
                    gol_darah: response.data.mahasiswa.gol_darah,
                    jenis_kelamin: response.data.mahasiswa.jenis_kelamin,
                    pas_foto: response.data.mahasiswa.pas_foto,
                    alamat: response.data.mahasiswa.alamat
                })
            } catch (error) {
                toast.error(error)
            }
        }
        fetchData()
    },[username])
    const {name,prodi,nim,gol_darah,jenis_kelamin,pas_foto,alamat} = data
    return (
        <div className='my-8'>
            <img src={`${pas_foto}`} alt={`Profile ${name}`} className="w-52 h-52 rounded-md object-cover mx-auto mb-5"/>
            <h1 className="text-lg text-center mb-5">{username} Profile</h1>
                <div className='mx-14'>
                    <InputForm id='nama' type='text' name='name' placeholder="Nama" label="Nama" value={name} disable={false} class="mb-2"/>
                    <InputForm id='nim' type='text' name='nim' placeholder="Nomor Induk Mahasiswa" label="Nomor Induk Mahasiswa" value={nim} disable={false} class="mb-2"/>
                    <InputForm id='prodi' type='text' name='prodi' placeholder="Program Studi" label="Program Studi" value={prodi} disable={false} class="mb-2"/>
                    <InputForm id='alamat' type='text' name='alamat' placeholder="Alamat" label="Alamat" value={alamat} disable={false} class="mb-2"/>
                    <label htmlFor='gol_darah' className="sm:mb-8">
                        <div className="text-slate-800 mb-2">
                            Golongan Darah
                        </div>
                    <select className="border rounded shadow-lg py-1 px-3 focus:ring-1 focus:border-sky-600 focus:ring-sky-500 focus:outline-none w-full invalid:focus:border-red-500 invalid:focus:ring-red-500 peer" value={gol_darah} name="gol_darah" disabled={false}>
                        <option value="default" disabled>Golongan Darah</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                        <option value="-">-</option>
                    </select>
                    </label> 
                    <label htmlFor='gol_darah' className="sm:mb-8">
                        <div className="text-slate-800 mb-2">
                            Jenis Kelamin
                        </div>
                    <select className="border rounded shadow-lg py-1 px-3 focus:ring-1 focus:border-sky-600 focus:ring-sky-500 focus:outline-none w-full invalid:focus:border-red-500 invalid:focus:ring-red-500 peer" value={jenis_kelamin} name="jenis_kelamin" disabled={false}>
                        <option value="default" disabled>Jenis Kelamin</option>
                        <option value="Pria">L</option>
                        <option value="Wanita">P</option>
                    </select>
                    </label> 
                </div>
        </div>
    )
}

export default ShowProfile
