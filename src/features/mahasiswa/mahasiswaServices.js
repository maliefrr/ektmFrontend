import axios from 'axios'

const API_URL = "https://ektm-backend.up.railway.app/api/mahasiswa"

// show all mahasiswa data
const getMahasiswaData = async (token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/all`,config)
    return response.data.data
}


// add new mahasiswa
const addMahasiswa = async (mahasiswaData) => {
    const response = await axios.post(`${API_URL}/add`,mahasiswaData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data.data
}

const getMahasiswaDetail = async(authUser) => {
    const response = await axios.get(`${API_URL}/profile/${authUser}`)

    return response.data.mahasiswa
}

// delete mahasiswa
const deleteMahasiswa = async (nim,token) => {
    const config = {
        headers : {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${API_URL}/delete/${nim}`,config)
    return response.data.data
}

const mahasiswaService = {
    getMahasiswaData,addMahasiswa,getMahasiswaDetail, deleteMahasiswa
}

export default mahasiswaService