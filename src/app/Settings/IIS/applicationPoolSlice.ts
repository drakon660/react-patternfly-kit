import { RootState } from '@app/store'
import { ResourcePoolIcon } from '@patternfly/react-icons';
import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios';
import { element } from 'prop-types';
import { getPositionOfLineAndCharacter } from 'typescript';
import { SuperRefinement } from 'zod';
import { ApplicationPool } from './ApplicationPool';

const responseBody = (response:AxiosResponse) => response.data;

axios.defaults.baseURL = "http://localhost:57679/";

export function getApplicationPoolsApi() {
  console.log("zapytka idzie do apiego") ;
  return axios.get('ApplicationPools').then(responseBody);
}

export function getApplicationPoolApi(name:string) {
  return axios.get(`ApplicationPools\\${name}`).then(responseBody);
}

export const getApplicationPools = createAsyncThunk(
  "applicationPools/getAll",
  async (_, { rejectWithValue }) => {        
    try
    {       
      const applicationPools = await getApplicationPoolsApi();    
      return applicationPools;
    }
    catch(err)
    {
      //console.log(err);        
      return rejectWithValue(err);        
    }
  }
);

export const getApplicationPool = createAsyncThunk(
  "applicationPools/get",
  async (name:string, { rejectWithValue }) => {        
    try
    {       
      const applicationPool = await getApplicationPoolApi(name);    
      return applicationPool;
    }
    catch(err)
    {
      //console.log(err);        
      return rejectWithValue(err);        
    }
  }
);


interface GetApplicationPoolsResponse
{  
  applicationPools:ApplicationPool[];
}

interface GetApplicationPoolResponse
{  
  applicationPool:ApplicationPool;
}

const usersAdapter = createEntityAdapter<ApplicationPool>({  
  sortComparer: (a, b) => a.name.localeCompare(b.name),
  selectId:(pool)=>pool.name
});

const initialState = usersAdapter.getInitialState({
  isLoading: false,    
  hasError:false,
  error:""
});

const slice = createSlice({
  name: 'applicationPools',
  initialState: initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(getApplicationPools.fulfilled,(state,action:PayloadAction<GetApplicationPoolsResponse,string>)=>{                  
      usersAdapter.setAll(state, action.payload.applicationPools.map(pool=>({...pool, key:pool.name})))
    })  
    builder.addCase(getApplicationPool.fulfilled,(state,action:PayloadAction<GetApplicationPoolResponse,string>)=>{                  
      usersAdapter.setOne(state, action.payload.applicationPool);
    })    
  },
})

export default slice.reducer

///export const selectApplicationPools = (state: RootState) => state.applicationPools;

export const { selectAll: selectApplicationPools } = usersAdapter.getSelectors((state:RootState) => state.applicationPools);