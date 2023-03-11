import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// GET user from local storage
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: ""
}

export const register = createAsyncThunk(
    "auth/register", async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    "auth/login", async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const updateEmail = createAsyncThunk(
    'auth/updateEmail',
    async ({ username, email },thunkAPI) => {
        try {
            return await authService.updateEmail(username,email)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)            
        }
    }
)


export const logout = createAsyncThunk(
    "auth/logout", async () => {
        await authService.logout()
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled,(state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected,(state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(login.pending,(state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled,(state) => {
                state.user = null
            })
            .addCase(register.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateEmail.fulfilled, (state, action) => {
                console.log(state)
                    state.user.data.email = action.payload
            })
            .addCase(updateEmail.pending, (state) => {
                state.isLoading = true;
            })

    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer