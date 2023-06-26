import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import { useEffect } from 'react'
import {Modal} from 'react-responsive-modal'
import { getMahasiswa,mahasiswaReset, deleteMahasiswa } from '../features/mahasiswa/mahasiswaSlice'
import 'react-responsive-modal/styles.css';
import {toast} from "react-toastify"
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
const Mahasiswa = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openMahasiswaDetail,setOpenMahasiswaDetail] = useState(false)
    const {mahasiswa,mahasiswaIsError,mahasiswaIsLoading,mahasiswaMessage} = useSelector((state) => state.mahasiswa)
    const [mahasiswaDetail,setMahasiswaDetail] = useState({
        pas_foto: "",
        name:"",
        nim:"",
        alamat:"",
        prodi:"",
        jenis_kelamin: ""
    })
    const handleDeleteMahasiswa = (nim) => {
        dispatch(deleteMahasiswa(nim));
        // Add query parameter to URL
        const url = new URL(window.location.href);
        url.searchParams.set("deleted", "true");
        window.location.href = url.toString();
      };
      

    const handleMahasiswaModalClose = () => {
        setOpenMahasiswaDetail(false)
        setMahasiswaDetail({
            pas_foto: "",
            name:"",
            nim:"",
            alamat:"",
            prodi:"",
            gol_darah:"",
            jenis_kelamin: ""
        })
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const isDeleted = urlParams.get("deleted") === "true";
        if (isDeleted) {
            toast.success("Mahasiswa has been successfully deleted");
            // Remove query parameter from URL
            urlParams.delete("deleted");
            const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
            window.history.replaceState({}, "", newUrl);
          }

        if (mahasiswaIsError) {
        toast.error(mahasiswaMessage)
        }

        dispatch(getMahasiswa())
        return () => {
        dispatch(mahasiswaReset())
        }
    }, [navigate, mahasiswaIsError, mahasiswaMessage, dispatch])

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
  return (
    <>
        <div className="bg-gray-100 p-4 overflow-y-scroll overflow-x-hidden">
                        <div className='my-2'>
                            <h2 className="text-lg font-bold md:ml-[17rem] text-center">Mahasiswa</h2>
                            <table className="text-center md:ml-[16rem] table-collapse w-[80%]">
                                <thead>
                                    <tr>
                                        <td>
                                        <Link to={"/add/mahasiswa"} className="block mt-5 bg-orange-500 px-4 py-1 rounded-md text-white hover:bg-orange-600 active:bg-orange-700 mb-3 md:w-1/4 sm:w-full">Add Mahasiswa</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="px-4 py-2 border-2 border-black">Nama</th>
                                        <th className="px-4 py-2 border-2 border-black">Prodi</th>
                                        <th className="px-4 py-2 border-2 border-black">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mahasiswa.map(mahasiswa => (
                                        <tr key={mahasiswa.id}>
                                            <td className='px-4 py-2 border-2 border-black'>{mahasiswa.name}</td>
                                            <td className='px-4 py-2 border-2 border-black'>{mahasiswa.prodi}</td>
                                            <td className='px-4 py-2 border-2 border-black'>
                                                <Link className='px-2' to={`/mahasiswa/edit/${mahasiswa.nim}`}>Edit</Link>
                                                <button className="px-2" onClick={() => handleDeleteMahasiswa(mahasiswa.nim)}>
                                                    Delete
                                                </button>
                                                <button className="px-2" onClick={() => {setMahasiswaDetail({
                                                            pas_foto: mahasiswa.pas_foto,
                                                            name: mahasiswa.name,
                                                            nim: mahasiswa.nim,
                                                            prodi: mahasiswa.prodi,
                                                            gol_darah:mahasiswa.gol_darah,
                                                            jenis_kelamin: mahasiswa.jenis_kelamin,
                                                            alamat: mahasiswa.alamat
                                                            }); setOpenMahasiswaDetail(true)}}>
                                                    Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
            <Modal open={openMahasiswaDetail} onClose={handleMahasiswaModalClose} center classNames={{
                modal: "w-1/3 overflow-x-hidden"
            }}>
                <div className='flex w-full'>
                    <div className='mx-auto mb-2'>
                    <img src={mahasiswaDetail.pas_foto} alt={`Pas foto ${mahasiswaDetail.name}`} className='w-32 h-32 rounded-full mx-auto'/>
                    <h2 className='text-lg font-medium'>{mahasiswaDetail.name}</h2>
                    <h2 className='text-md font-medium text-center'>{mahasiswaDetail.nim}</h2>
                    </div>
                </div>
                <table className='ml-20 w-full'>
                    <tr>
                    <td className='pl-4 py-2'>Program Studi</td>
                    <td className='py-2'>:</td>
                    <td className='px-2 py-2'>{mahasiswaDetail.prodi}</td>
                    </tr>
                    <tr>
                    <td className='pl-4 py-2'>Alamat</td>
                    <td className='py-2'>:</td>
                    <td className='px-2 py-2'>{mahasiswaDetail.alamat}</td>
                    </tr>
                    <tr>
                    <td className='pl-4 py-2'>Jenis Kelamin</td>
                    <td className='py-2'>:</td>
                    <td className='px-2 py-2'>{mahasiswaDetail.jenis_kelamin}</td>
                    </tr>
                    <tr>
                    <td className='pl-4 py-2'>Golongan Darah</td>
                    <td className='py-2'>:</td>
                    <td className='px-2 py-2'>{mahasiswaDetail.gol_darah}</td>
                    </tr>
                </table>
            </Modal>
    
    </>
  )
}

export default Mahasiswa