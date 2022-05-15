import { api } from '@app/services/auth'
import { AuthState, RootState } from '@app/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


interface UserLogin {
  UserName:string; 
  Password:string;
}

export const authUser = createAsyncThunk(
  "users/auth",
  async (userData:UserLogin, { rejectWithValue }) => {        
    if(userData.UserName === 'drakon' || userData.Password == '123456')    
      return true;
    else
     return rejectWithValue(false);
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
        state.userNamePasswordValid = true;
        state.token = "12346";
        return state;
      }
    }),
    builder.addCase(logoutUser.fulfilled,(state,action)=>{
      localStorage.removeItem("token");
      state.token = null;
      return state;
    }),
    builder.addCase(authUser.rejected,(state:AuthState,action)=>{      
      
      state.userNamePasswordValid = false;
      state.token = null;
      return state;
    })
  },
})

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.token;
export const selectUserNamePasswordValid = (state: RootState) => state.auth.userNamePasswordValid;