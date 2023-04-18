import React,{useState, useEffect} from 'react'
import InputForm from '../components/InputForm'
import Button from '../components/Button'
import logo from "../assets/logo-uho.png"
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import axios from 'axios'


const EditMahasiswa = () => {
    const params = useParams()
    const [formData,setFormData] = useState({
        name: "",
        nim: "",
        prodi: "",
        alamat: "",
        jenis_kelamin: "default",
        gol_darah: "default",
        angkatan: "",
        status: "default"
    })

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                
                const response = await axios.get(`https://ektm-backend.up.railway.app/api/mahasiswa/profile/${params.username}`)
                setFormData({
                    name : response.data.mahasiswa.name,
                    nim : response.data.mahasiswa.nim,
                    prodi : response.data.mahasiswa.prodi,
                    alamat : response.data.mahasiswa.alamat,
                    gol_darah : response.data.mahasiswa.gol_darah,
                    jenis_kelamin: response.data.mahasiswa.jenis_kelamin,
                    status: response.data.mahasiswa.status,
                    angkatan : response.data.mahasiswa.angkatan
                })
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }
            fetchData()
    },[params])

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
    const {name,nim,prodi,alamat,jenis_kelamin,gol_darah,angkatan,status} = formData
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`https://ektm-backend.up.railway.app/api/mahasiswa/edit/${params.username}`,{
            name,
            prodi,
            gol_darah,
            jenis_kelamin,
            alamat,
            status,
            angkatan
          })
          toast.success(response.data.message)
        } catch (error) {
          toast.error(error)
        }
      };
  return (
    <>
    <div className='font-arima bg-gradient-to-r from-sky-500 to-gray-400 lg:h-full'>
        <main className="max-w-screen-2xl flex items-center mx-auto">
            <div className="fixed sm:top-100 sm:bottom-100 lg:top-0 lg:bottom-0 left-0 right-0 flex h-full">
                <img src={logo} alt="logo" width="250" className="m-auto" />
            </div>
            <div className='shadow-lg p-4 bg-slate-100/30 backdrop-blur-md w-full max-w-screen-lg rounded-md mx-auto md:w-4/5 md:my-6 lg:text-lg'>
                <Link to="/" className='flex hover:font-medium'>
                    <img src={logo} alt="logo" width="30" />
                    <h3 className="ml-3 font-sansita">E-KTM Web Admin</h3>
                </Link>
                <div className='w-full'>
                    <h3 className="text-center font-semibold text-slate-600 mb-3 lg:text-2xl"><i className="bx bxs-user-plus lg:text-4xl"></i> Edit</h3>
                    <hr className="mb-3 mx-16 lg:mb-11" />
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                    <InputForm id='nama' type='text' name='name' placeholder="Nama" label="Nama" value={name} onChange={onChange}/>
                    <InputForm id='nim' type='text' name='nim' placeholder="Nomor Induk Mahasiswa" label="Nomor Induk Mahasiswa" value={nim} onChange={onChange} disable={true}/>
                    <InputForm id='prodi' type='text' name='prodi' placeholder="Program Studi" label="Program Studi" value={prodi} onChange={onChange}/>
                    <InputForm id='angkatan' type='text' name='angkatan' placeholder="Angkatan" label="Angkatan" value={angkatan} onChange={onChange}/>
                    <InputForm id='alamat' type='text' name='alamat' placeholder="Alamat" label="Alamat" value={alamat} onChange={onChange}/>
                    <label htmlFor='gol_darah' className="sm:mb-8">
                        <div className="text-slate-800 mb-2">
                            Golongan Darah
                        </div>
                    <select className="border rounded shadow-lg py-1 px-3 focus:ring-1 focus:border-sky-600 focus:ring-sky-500 focus:outline-none w-full invalid:focus:border-red-500 invalid:focus:ring-red-500 peer" value={gol_darah} onChange={onChange} name="gol_darah">
                        <option value="default" disabled>Golongan Darah</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                        <option value="-">-</option>
                    </select>
                    </label> 
                    <label htmlFor='jenis_kelamin' className="sm:mb-8">
                        <div className="text-slate-800 mb-2">
                            Jenis Kelamin
                        </div>
                    <select className="border rounded shadow-lg py-1 px-3 focus:ring-1 focus:border-sky-600 focus:ring-sky-500 focus:outline-none w-full invalid:focus:border-red-500 invalid:focus:ring-red-500 peer" value={jenis_kelamin} onChange={onChange} name="jenis_kelamin">
                        <option value="default" disabled>
                            Jenis Kelamin
                        </option>
                        <option value="Pria">L</option>
                        <option value="Wanita">P</option>
                    </select>
                    </label> 
                    <label htmlFor='status' className="sm:mb-8">
                        <div className="text-slate-800 mb-2">
                            Status
                        </div>
                    <select className="border rounded shadow-lg py-1 px-3 focus:ring-1 focus:border-sky-600 focus:ring-sky-500 focus:outline-none w-full invalid:focus:border-red-500 invalid:focus:ring-red-500 peer" value={status} onChange={onChange} name="status">
                        <option value="default" disabled>
                            Status
                        </option>
                        <option value="aktif">Mahasiswa Aktif</option>
                        <option value="cuti">Cuti</option>
                        <option value="alumni">Alumni</option>
                    </select>
                    </label> 
                    <div className="flex">
                        <Button text="Simpan" type="Submit" class="mx-auto"/>
                    </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
    </>
  )
}

export default EditMahasiswa
