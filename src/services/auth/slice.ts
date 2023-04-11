import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../utils/api/authApi';

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

interface IInitialState {
    user: any,
    registerStatus: string,
    loginStatus: string,
    fetchMeStatus: string,
    error: null | string | undefined,
}

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async ({ name, email, password }: RegisterPayload) => {
    try {
      const { data } = await AuthService.register(name, email, password);
      localStorage.setItem('token', data.token)
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  export const fetchLogin = createAsyncThunk('auth/fetchLogin', async ({ email, password }: Omit<RegisterPayload, "name">) => {
    try {
      const { data } = await AuthService.login(email, password);
      localStorage.setItem('token', data.token)
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
    try {
      const { data } = await AuthService.getMe();
      console.log(data);
      
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

const initialState: IInitialState = {
    user: null,
    registerStatus: 'idle',
    loginStatus: 'idle',
    fetchMeStatus: 'idle',
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.loginStatus = 'idle'
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegister.pending, (state) => {
                state.registerStatus = 'loading';
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.registerStatus = 'succeeded';
                // state.user = action.payload;
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.registerStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchLogin.pending, (state) => {
                state.loginStatus = 'loading';
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.loginStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.loginStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchMe.pending, (state) => {
                state.fetchMeStatus = 'loading';
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.fetchMeStatus = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchMe.rejected, (state, action) => {
                state.fetchMeStatus = 'failed';
                state.error = action.error.message;
            })
    }
});
// export const isAuth = (state: { auth: { user: any; }; }) => state.auth.user;
// console.log(isAuth);


export default authSlice.reducer;

export const { logout } = authSlice.actions;