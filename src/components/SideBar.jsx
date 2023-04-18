import React from 'react'
import {useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {logout,reset} from "../features/auth/authSlice"
import {userReset} from "../features/user/userSlice"
import {mahasiswaReset} from "../features/mahasiswa/mahasiswaSlice"
import {toast} from "react-toastify"
import Button from './Button'
import Modal from 'react-responsive-modal'
import InputForm from './InputForm'
import axios from "axios"
import {useNavigate,Link} from "react-router-dom"
const SideBar = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openChangePassword,setOpenChangePassword] = useState(false)
    const [formData,setFormData] = useState({
        password : "",
        passwordConfirmation: ""
    }) 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onLogout = async () => {
        await dispatch(reset())
        await dispatch(userReset())
        await dispatch(mahasiswaReset())
        await dispatch(logout())
        navigate("/")
    }
    const {password,passwordConfirmation} = formData
    const {user} = useSelector((state) => state.auth)
    const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(password !== passwordConfirmation) {
                toast.error("password and confirmation password did not match")
                setFormData({
                    password: "",
                    passwordConfirmation: ""
                })
            } else {
                const response = await axios.put(`http://localhost:5000/api/users/edit/password/${user.data.username}`,{
                    password
                })
                toast.success(response.data.message)
                setOpenChangePassword(false)
                setFormData({
                    password: "",
                    passwordConfirmation: ""
                })
            }
        } catch (error) {
            toast.error(error)
            setOpenChangePassword(false)
                setFormData({
                    password: "",
                    passwordConfirmation: ""
                })
        }
    }
    return (
    <>
    <button className="block md:hidden p-2 text-gray-800 hover:text-gray-700" onClick={() => setMenuOpen(!menuOpen)} style={{position: "absolute",
                                    left: menuOpen ? "250px" : "16px",
                                    transition: "left 0.1s ease-out",
                                    }}>
                    {menuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                            </svg>
                )}    
                </button>
                <div className={`sidebar w-64 bg-gray-800 text-white p-4 fixed left-0 h-screen ${menuOpen ? "block" : "hidden"} md:block`}
                    style={{
                    transform: `translateX(${menuOpen ? 0 : 0}%)`,
                    transition: "transform 0.5s ease-out",
                    }}>
                    <div className="py-4 px-6 text-white">
                        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                        <p className="text-gray-500">Welcome Back!! {user.data.username}</p>
                    </div>
                    <ul className="list-none p-0">
                        <li className='py-2 px-6'>
                            <Link to={"/dashboard/me"} className="block text-white hover:bg-gray-700 rounded-full py-1 px-3">My Profile</Link>
                        </li>
                        <li className='py-2 px-6'>
                            <Link to={"/dashboard"} className="block text-white hover:bg-gray-700 rounded-full py-1 px-3">Home</Link>
                        </li>
                        {user.data.role === "admin" ? (
                        <>
                            <li className='py-2 px-6'>
                                <Link to={"/dashboard/users"} className="block text-white hover:bg-gray-700 rounded-full py-1 px-3">User</Link>
                            </li>
                            <li className='py-2 px-6'>
                                <Link to={"/dashboard/mahasiswa"} className="block text-white hover:bg-gray-700 rounded-full py-1 px-3">Mahasiswa</Link>
                            </li>
                        </>
                        ) : ""}
                        <li className='py-2 px-6'>
                            <button className="block text-white hover:bg-gray-700 rounded-full py-1 px-3 hover:w-full hover:text-left" onClick={() => setOpenChangePassword(!openChangePassword)}>Ganti Password</button>
                        </li>
                        <li className='py-2 px-6'>
                            <Button text="Logout" onClick={onLogout} className="mx-auto"/>
                        </li>
                    </ul>
                </div>
        <Modal center open={openChangePassword} onClose={() => setOpenChangePassword(!openChangePassword)} classNames={{modal: "w-1/3"}}>
            <h1 className='text-xl mt-4 mb-2 text-center'>Ganti Password</h1>
            <form onSubmit={handleSubmit}>
                <InputForm id='password' type='password' name='password' placeholder="New Password" label="New Password" class="mb-2" value={password} onChange={handleChange}/>
                <InputForm id='passwordConfirmation' type='password' name='passwordConfirmation' placeholder="New Password Confirmation" label="New Password Confirmation" class="mb-2" value={passwordConfirmation} onChange={handleChange}/>
                <Button text="Submit" className="mx-auto"/>
            </form>
        </Modal>
    </>
    )
}

export default SideBar
