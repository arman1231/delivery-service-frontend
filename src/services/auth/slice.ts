import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../utils/api/authApi';

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

interface IInitialState {
    user: any,
    status: string,
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

const initialState: IInitialState = {
    user: null,
    status: 'idle',
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});
// export const isAuth = (state: { auth: { user: any; }; }) => state.auth.user;
// console.log(isAuth);


export default authSlice.reducer;