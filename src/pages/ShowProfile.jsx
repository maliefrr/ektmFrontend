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
        jenis_kelamin : "",
        pas_foto: "",
        alamat: "",
        angakatan : "",
        status : ""
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://ektm-backend.up.railway.app/api/mahasiswa/profile/${username}`)
                setData({
                    name : response.data.mahasiswa.name,
                    prodi: response.data.mahasiswa.prodi,
                    nim: response.data.mahasiswa.nim,
                    jenis_kelamin: response.data.mahasiswa.jenis_kelamin,
                    pas_foto: response.data.mahasiswa.pas_foto,
                    alamat: response.data.mahasiswa.alamat,
                    angkatan: response.data.mahasiswa.angkatan,
                    status: response.data.mahasiswa.status
                })
            } catch (error) {
                toast.error(error)
            }
        }
        fetchData()
    },[username])
    const {name,prodi,nim,jenis_kelamin,pas_foto,alamat, status, angkatan} = data
    return (
        <div className='my-8'>
            <img src={`${pas_foto}`} alt={`Profile ${name}`} className="w-52 h-52 rounded-md object-cover mx-auto mb-5"/>
            <h1 className="text-lg text-center mb-5">{username} Profile</h1>
                <div className='mx-14'>
                    <InputForm id='nama' type='text' name='name' placeholder="Nama" label="Nama" value={name} disable={true} class="mb-2"/>
                    <InputForm id='nim' type='text' name='nim' placeholder="Nomor Induk Mahasiswa" label="Nomor Induk Mahasiswa" value={nim} disable={true} class="mb-2"/>
                    <InputForm id='prodi' type='text' name='prodi' placeholder="Program Studi" label="Program Studi" value={prodi} disable={true} class="mb-2"/>
                    <InputForm id='angkatan' type='text' name='angkatan' placeholder="Angkatan" label="Angkatan" value={angkatan} disable={true} class="mb-2"/>
                    <InputForm id='alamat' type='text' name='alamat' placeholder="Alamat" label="Alamat" value={alamat} disable={true} class="mb-2"/>
                    <label htmlFor='jenis_kelamin' className="sm:mb-8">
                        <div className="text-slate-800 mb-2">
                            Jenis Kelamin
                        </div>
                    <select className="border rounded shadow-lg py-1 px-3 focus:ring-1 focus:border-sky-600 focus:ring-sky-500 focus:outline-none w-full invalid:focus:border-red-500 invalid:focus:ring-red-500 peer" value={jenis_kelamin} name="jenis_kelamin" disabled={true}>
                        <option value="default" disabled={true}>Jenis Kelamin</option>
                        <option value="Pria">L</option>
                        <option value="Wanita">P</option>
                    </select>
                    </label>
                    <label htmlFor='status' className="sm:mb-8">
                        <div className="text-slate-800 mb-2">
                            Status
                        </div>
                    <select className="border rounded shadow-lg py-1 px-3 focus:ring-1 focus:border-sky-600 focus:ring-sky-500 focus:outline-none w-full invalid:focus:border-red-500 invalid:focus:ring-red-500 peer" value={status} name="status" disabled={true}>
                        <option value="default" disabled={true}>
                            Status
                        </option>
                        <option value="aktif">Mahasiswa Aktif</option>
                        <option value="cuti">Cuti</option>
                        <option value="alumni">Alumni</option>
                    </select>
                    </label> 
                </div>
        </div>
    )
}

export default ShowProfile
