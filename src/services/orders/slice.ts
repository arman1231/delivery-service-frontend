import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../utils/api/authApi';
import OrdersService from '../../utils/api/ordersApi';
import { Order } from '../../utils/api/types';

interface IInitialState {
    orders: Order[] | null,
    fetchOrders: string,
    error: null | string | undefined,
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
    try {
        const { data } = await OrdersService.getOrders();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const initialState: IInitialState = {
    orders: null,
    fetchOrders: 'idle',
    error: null
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        logout: (state) => {
            state.orders = null
            state.fetchOrders = 'idle'
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.fetchOrders = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.fetchOrders = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.fetchOrders = 'failed';
                state.error = action.error.message;
            })
    }
});

export default ordersSlice.reducer;

export const { logout } = ordersSlice.actions;