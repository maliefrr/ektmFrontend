import React from 'react'
import SideBar from '../components/SideBar'
import 'react-responsive-modal/styles.css';
import {toast} from "react-toastify"
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { RotatingLines } from  'react-loader-spinner'
import { useEffect } from 'react'
import {Modal} from 'react-responsive-modal'
import { getUser, userReset, deleteUser } from '../features/user/userSlice'
import { logout } from '../features/auth/authSlice';
const User = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [openUserDetail,setOpenUserDetail] = useState(false)
  const {users,userIsError,userIsLoading,userMessage} = useSelector((state) => state.user)
  const {user} = useSelector((state) => state.auth)
  const [userDetail,setUserDetail] = useState({
    username : "",
    email: "",
    role: ""
})
const handleUserModalClose = () => {
  setOpenUserDetail(false)
  setUserDetail({
      username : "",
      email: "",
      role: ""
  })
}
useEffect(() => {
  if(userIsError) {
      toast.error(userMessage)
      navigate("/")
  }

  if (!user) {
  logout()
  navigate('/')
  }

  dispatch(getUser())
  return () => {
  dispatch(userReset())
  }
}, [user, navigate, dispatch,userIsError,userMessage])
if(userIsLoading){
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
    <SideBar />
        <div className="flex flex-col h-screen bg-gray-100">
            <div className='flex-1 h-full'>
                <div className="bg-gray-100 p-4 overflow-y-scroll overflow-x-hidden w-screen">
                    <div className='my-2'>
                        <h2 className="text-lg font-bold md:ml-[17rem] text-center mb-5">User</h2>
                        <table className="text-center md:ml-[16rem] table-collapse w-[80%]">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-2 border-black">Username</th>
                                    <th className="px-4 py-2 border-2 border-black">Email</th>
                                    <th className="px-4 py-2 border-2 border-black">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td className='px-4 py-2 border-2 border-black'>{user.username}</td>
                                        <td className='px-4 py-2 border-2 border-black'>{user.email}</td>
                                        <td className='px-4 py-2 border-2 border-black'>
                                            <button className="px-2" onClick={() => {toast.success("data has been successfully deleted"); dispatch(deleteUser(user.id))}}>
                                                Delete
                                            </button>
                                            <button className="px-2" onClick={() => {setUserDetail({
                                                username : user.username,
                                                email: user.email,
                                                role: user.role
                                            }); setOpenUserDetail(true)}}>
                                                Detail
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Modal open={openUserDetail} onClose={handleUserModalClose} center classNames={{
            modal: "w-1/4 overflow-x-hidden"
        }}>
            <table className='w-full'>
                <tr>
                <td className='pl-4 py-2'>Username</td>
                <td className='py-2'>:</td>
                <td className='px-2 py-2'>{userDetail.username}</td>
                </tr>
                <tr>
                <td className='pl-4 py-2'>Email</td>
                <td className='py-2'>:</td>
                <td className='px-2 py-2'>{userDetail.email}</td>
                </tr>
                <tr>
                <td className='pl-4 py-2'>Role</td>
                <td className='py-2'>:</td>
                <td className='px-2 py-2'>{userDetail.role}</td>
                </tr>
            </table>
        </Modal>
    </>
  )
}

export default User