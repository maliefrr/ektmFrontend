import React from 'react'
import 'react-responsive-modal/styles.css';
import {toast} from "react-toastify"
import {Modal} from 'react-responsive-modal'
import {useState} from 'react'
import { RotatingLines } from  'react-loader-spinner'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { getUser, userReset, deleteUser } from '../features/user/userSlice'
const User = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {users,userIsError,userIsLoading,userMessage} = useSelector((state) => state.user)
    const [openUserDetail,setOpenUserDetail] = useState(false)
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

        dispatch(getUser())
        return () => {
        dispatch(userReset())
        }
    }, [navigate,dispatch,userIsError,userMessage])
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
                                                <button className="px-2" onClick={() => {toast.success("data has been successfully deleted"); dispatch(deleteUser(user.username))}}>
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