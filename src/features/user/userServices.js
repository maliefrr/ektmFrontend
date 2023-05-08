import axios from 'axios'

const API_URL = "https://ektm-backend.up.railway.app/api/users"

// show all user data
const getUserData = async (token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
 
    const response = await axios.get(`${API_URL}/all`,config)
    console.log(response)
    return response.data.data
}

const deleteUser = async (userId,token) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(`${API_URL}/delete/${userId}`,config)
    return response.data.data
}


const userService = {
    getUserData,deleteUser
}

export default userService