import axios from 'axios'
import React, {useState, useEffect} from 'react'
import SideBar from '../components/SideBar'
import {useSelector} from 'react-redux'
import {toast} from "react-toastify"
import { RotatingLines } from  'react-loader-spinner'
import Button from '../components/Button'
import InputForm from '../components/InputForm'

const Profile = () => {
  const [data, setData] = useState({
    name : "",
    prodi : "",
    nim : "",
    gol_darah : "",
    jenis_kelamin : "",
    pas_foto: "",
    alamat: ""
  });
  const {user} = useSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editBio,setEditBio] = useState(true);
  const [editUser,setEditUser] = useState(true);
  const [dataUser, setDataUser] = useState({
    email : "",
    username : "",
    name : "",
    role : "",
  });
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const responseUser = await axios.get(`https://ektm-backend.up.railway.app/api/users/profile/${user.data.username}`)
        setDataUser({
          name: responseUser.data.data.name,
          username: responseUser.data.data.username,
          role: responseUser.data.data.role,
          email: responseUser.data.data.email
        })
        if(user.data.role === "mahasiswa") {
          const response = await axios.get(`https://ektm-backend.up.railway.app/api/mahasiswa/profile/${user.data.username}`);
          setData({
            name: response.data.mahasiswa.name,
            prodi: response.data.mahasiswa.prodi,
            nim: response.data.mahasiswa.nim,
            gol_darah: response.data.mahasiswa.gol_darah,
            jenis_kelamin: response.data.mahasiswa.jenis_kelamin,
            pas_foto: response.data.mahasiswa.pas_foto,
            alamat: response.data.mahasiswa.alamat
          });
        }
      } catch (err) {
          setError(err);
      } finally {
          setIsLoading(false);
      }
    }
    fetchData()
  },[user])
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
    const {name,prodi,nim,gol_darah,jenis_kelamin,pas_foto,alamat} = data
    const {email,username} = dataUser
  const handleChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleChangeUser = event => {
    setDataUser({ ...dataUser, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://ektm-backend.up.railway.app/api/mahasiswa/edit/${user.data.username}`,{
        name,
        prodi,
        gol_darah,
        jenis_kelamin,
        alamat
      })
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error)
    }
  };
  const handleSubmitUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://ektm-backend.up.railway.app/api/users/edit/${user.data.username}`,{
        email
      })
      console.log(response.data)
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error)
    }
  };
  return (
    <div className="flex h-screen">
        <SideBar/>
        <div className="md:ml-[16rem] w-3/4 bg-white p-4">
          <div className='w-full flex flex-col'>
            <h1 className="text-2xl font-medium">Profile</h1>
            {user.data.role === "mahasiswa" ? (
              <>
                <img src={`${pas_foto}`} alt={`Profile ${name}`} className="w-52 h-52 rounded-md object-cover mx-auto"/>
                <hr className=' border-2 border-black my-3'/>
                <h1 className="text-center font-bold text-2xl">Informasi Akun</h1>
                <div className="flex justify-end">
                  <Button className="" text="Edit" onClick={() => setEditUser(!editUser)}/>
                </div>
                <form onSubmit={handleSubmitUser}>
                  <InputForm id='text' type='text' name='username' placeholder="Username" label="Username" value={username} disable={editUser} class="mb-2"/>
                  <InputForm id='email' type='email' name='email' placeholder="Email" label="Email" value={email} disable={editUser} class="mb-2" onChange={handleChangeUser}/>
                  <div className="flex mx-auto mb-2">
                    <Button class="mx-auto" text="Submit"/>
                  </div>
                </form>
                <h1 className="text-center font-bold text-2xl mt-5">Biodata</h1>
                <div className="flex justify-end">
                  <Button className="" text="Edit" onClick={() => setEditBio(!editBio)}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <InputForm id='nama' type='text' name='name' placeholder="Nama" label="Nama" value={name} disable={editBio} class="mb-2" onChange={handleChange}/>
                    <InputForm id='nim' type='text' name='nim' placeholder="Nomor Induk Mahasiswa" label="Nomor Induk Mahasiswa" value={nim} disable={editBio} class="mb-2" onChange={handleChange}/>
                    <InputForm id='prodi' type='text' name='prodi' placeholder="Program Studi" label="Program Studi" value={prodi} disable={editBio} class="mb-2" onChange={handleChange}/>
                    <InputForm id='alamat' type='text' name='alamat' placeholder="Alamat" label="Alamat" value={alamat} disable={editBio} class="mb-2" onChange={handleChange}/>
                    <label htmlFor='gol_darah' className="sm:mb-8">
                        <div className="text-slate-800 mb-2">
                            Golongan Darah
                        </div>
                    <select className="border rounded shadow-lg py-1 px-3 focus:ring-1 focus:border-sky-600 focus:ring-sky-500 focus:outline-none w-full invalid:focus:border-red-500 invalid:focus:ring-red-500 peer" value={gol_darah} name="gol_darah" disabled={editBio} onChange={handleChange}>
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
                    <select className="border rounded shadow-lg py-1 px-3 focus:ring-1 focus:border-sky-600 focus:ring-sky-500 focus:outline-none w-full invalid:focus:border-red-500 invalid:focus:ring-red-500 peer" value={jenis_kelamin} name="jenis_kelamin" disabled={editBio} onChange={handleChange}>
                        <option value="default" disabled>Jenis Kelamin</option>
                        <option value="Pria">L</option>
                        <option value="Wanita">P</option>
                    </select>
                    </label> 
                    <div className="flex mx-auto mb-2 w-full">
                      <Button class="mx-auto" text="Submit"/>
                    </div>
                </form>
              </>
            ) : (
              <>
              <h1 className="text-center font-bold text-2xl">Informasi Akun</h1>
                <div className="flex justify-end">
                  <Button className="" text="Edit" onClick={() => setEditUser(!editUser)}/>
                </div>
                <form onSubmit={handleSubmitUser}>
                  <InputForm id='text' type='text' name='username' placeholder="Username" label="Username" value={username} disable={editUser} class="mb-2"/>
                  <InputForm id='email' type='email' name='email' placeholder="Email" label="Email" value={email} disable={editUser} class="mb-2" onChange={handleChangeUser}/>
                  <div className="flex mx-auto mb-2">
                    <Button class="mx-auto" text="Submit"/>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

    </div>
);
}

export default Profile