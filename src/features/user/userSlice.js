import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userServices'

const initialState = {
    users: [],
    userIsError: false,
    userIsSuccess: false,
    userIsLoading: false,
    userMessage: '',
}


// Get user
export const getUser = createAsyncThunk(
  'user/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data.token
      console.log(await userService.getUserData(token))
      return await userService.getUserData(token)
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

// Delete user 
export const deleteUser = createAsyncThunk(
  'user/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.data.token
      return await userService.deleteUser(id, token)
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
    //   .addCase(createGoal.pending, (state) => {
    //     state.isLoading = true
    //   })
    //   .addCase(createGoal.fulfilled, (state, action) => {
    //     state.isLoading = false
    //     state.isSuccess = true
    //     state.goals.push(action.payload)
    //   })
    //   .addCase(createGoal.rejected, (state, action) => {
    //     state.isLoading = false
    //     state.isError = true
    //     state.message = action.payload
    //   })
      .addCase(getUser.pending, (state) => {
        state.userIsLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userIsLoading = false
        state.userIsSuccess = true
        state.users = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.userIsLoading = false
        state.userIsError = true
        state.userMessage = action.payload
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        )
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { userReset } = userSlice.actions
export default userSlice.reducer