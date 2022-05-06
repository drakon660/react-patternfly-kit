import { api } from '@app/services/auth'
import { AuthState, RootState } from '@app/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const authUser = createAsyncThunk(
  "users/auth",
  async (userData:{UserName:string, Password:string}) => {    
    
    if(userData.UserName === 'drakon' || userData.Password == '123456')    
      return true;
    else
     return false;
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
  initialState: { token: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled,(state,action)=>{

      if(!action.payload)
      {
        return state;  
      }
      else
      {
        localStorage.setItem("token","123456");
        state.token = "12346";
        return state;
      }
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