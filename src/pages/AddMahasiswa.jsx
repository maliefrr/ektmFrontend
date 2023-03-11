import React,{useState, useEffect} from 'react'
import InputForm from '../components/InputForm'
import Button from '../components/Button'
import { logout } from '../features/auth/authSlice'
import logo from "../assets/logo-uho.png"
import { toast } from 'react-toastify'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import { mahasiswaReset, addMahasiswa } from '../features/mahasiswa/mahasiswaSlice'
const AddMahasiswa = () => {
    const [formData,setFormData] = useState({
        name: "",
        nim: "",
        prodi: "",
        alamat: "",
        jenis_kelamin: "",
        gol_darah: "",
    })

    const [file, setFile] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {mahasiswa,mahasiswaIsError,mahasiswaIsLoading,mahasiswaMessage} = useSelector((state) => state.mahasiswa)
    const {name,nim,prodi,alamat,jenis_kelamin,gol_darah} = formData

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const fileChange = (e) => {
        setFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    useEffect(() => {
        if(mahasiswaIsError) {
            toast.error(mahasiswaMessage)
        }
        
        dispatch(mahasiswaReset())
    },[mahasiswa,mahasiswaIsError,mahasiswaMessage,navigate,dispatch])

    if(mahasiswaIsLoading){
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

    const onSubmit = async (e) => {
        e.preventDefault()
        setFormData({name,nim,prodi,alamat,jenis_kelamin,gol_darah})
        const data = new FormData();
        data.append("name",formData.name)
        data.append("nim",formData.nim)
        data.append("prodi",formData.prodi)
        data.append("alamat",formData.alamat)
        data.append("jenis_kelamin",formData.jenis_kelamin)
        data.append("gol_darah",formData.gol_darah)
        data.append("pas_foto",file)
        dispatch(addMahasiswa(data))
        toast.success("Data Mahasiswa berhasil ditambahkan")
        navigate('/dashboard')
    }
  return (
    <>
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
                    <form onSubmit={onSubmit} encType="multipart/form-data">
                    <InputForm id='nama' type='text' name='name' placeholder="Nama" label="Nama" value={name} onChange={onChange}/>
                    <InputForm id='nim' type='text' name='nim' placeholder="Nomor Induk Mahasiswa" label="Nomor Induk Mahasiswa" value={nim} onChange={onChange}/>
                    <InputForm id='prodi' type='text' name='prodi' placeholder="Program Studi" label="Program Studi" value={prodi} onChange={onChange}/>
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
                    <InputForm id='pas_foto' type='file' name='pas_foto' placeholder="Pas Foto" label="Pas Foto" onChange={fileChange}/>
                    <Button text="Add Mahasiswa" type="Submit"/>
            <Button text="Logout" onClick={() => {dispatch(logout()); navigate('/')}} className="mx-auto"/>
                    </form>
                </div>
            </div>
        </main>
    </div>
    </>
  )
}

export default AddMahasiswa