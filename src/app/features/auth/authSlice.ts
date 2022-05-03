import { api } from '@app/services/auth'
import { RootState } from '@app/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const authUser = createAsyncThunk(
  "users/auth",
  async () => {    
    return null;
  }
);

export const logoutUser = createAsyncThunk(
  "users/logout",
  async () => {    
    return null;
  }
);

const slice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled,(state,action)=>{
      localStorage.setItem("token","123456");
      state.token = "12346";
      return state;
    }),
    builder.addCase(logoutUser.fulfilled,(state,action)=>{
      localStorage.removeItem("token");
      state.token = null;
      return state;
    })
  },
})

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.token