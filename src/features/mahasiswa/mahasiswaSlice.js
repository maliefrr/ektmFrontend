import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import mahasiswaService from './mahasiswaServices'

const initialState = {
    mahasiswa: [],
    mahasiswaIsError: false,
    mahasiswaIsSuccess: false,
    mahasiswaIsLoading: false,
    mahasiswaMessage: '',
}

// Create new mahasiswa
export const addMahasiswa = createAsyncThunk(
  'mahasiswa/add',
  async (mahasiswaData, thunkAPI) => {
    try {
      return await mahasiswaService.addMahasiswa(mahasiswaData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
        console.log(error)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all mahasiswa
export const getMahasiswa = createAsyncThunk(
  'mahasiswa/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data.token
      return await mahasiswaService.getMahasiswaData(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


// get mahasiswa detail
export const getMahasiswaDetail = createAsyncThunk(
  'mahasiswa/detail',
  async (_, { rejectWithValue }, {username}) => {
    try {
      return await mahasiswaService.getMahasiswaDetail(username)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return rejectWithValue(message)
    }
  }
)



// Delete mahasiswa
export const deleteMahasiswa = createAsyncThunk(
  'mahasiswa/delete',
  async (nim,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data.token
      return await mahasiswaService.deleteMahasiswa(nim,token)

    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const mahasiswaSlice = createSlice({
  name: 'mahasiswa',
  initialState,
  reducers: {
    mahasiswaReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMahasiswa.pending, (state) => {
        state.mahasiswaIsLoading = true
      })
      .addCase(addMahasiswa.fulfilled, (state, action) => {
        state.mahasiswaIsLoading = false
        state.mahasiswaIsSuccess = true
        state.mahasiswa.push(action.payload)
      })
      .addCase(addMahasiswa.rejected, (state, action) => {
        state.mahasiswaIsLoading= false
        state.mahasiswaIsError = true
        state.mahasiswaMessage = action.payload
      })
      .addCase(getMahasiswa.pending, (state) => {
        state.mahasiswaIsLoading = true
      })
      .addCase(getMahasiswa.fulfilled, (state, action) => {
        state.mahasiswaIsLoading = false
        state.mahasiswaIsSuccess = true
        state.mahasiswa = action.payload
      })
      .addCase(getMahasiswa.rejected, (state, action) => {
        state.mahasiswaIsLoading = false
        state.mahasiswaIsError = true
        state.mahasiswaMessage = action.payload
      })
      .addCase(deleteMahasiswa.pending, (state) => {
        state.mahasiswaIsLoading = true
      })
      .addCase(deleteMahasiswa.fulfilled, (state,action) => {
        state.mahasiswaIsLoading = false
        state.mahasiswaIsSuccess = true
        state.mahasiswa = state.mahasiswa.filter(mahasiswa => mahasiswa.id !== action.payload.id)
      })
  },
})

export const { mahasiswaReset } = mahasiswaSlice.actions
export default mahasiswaSlice.reducer