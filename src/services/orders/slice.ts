import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../utils/api/authApi';
import OrdersService from '../../utils/api/ordersApi';
import { Order, PostOrderPayload } from '../../utils/api/types';

interface IInitialState {
    orders: Order[],
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

export const postOrder = createAsyncThunk('orders/postOrder', async (order: PostOrderPayload) => {
    try {
        const { data } = await OrdersService.addOrder(order);
        return data;
    } catch (error) {
        console.log(error);
        throw error;
        
    }
})

const initialState: IInitialState = {
    orders: [],
    fetchOrders: 'idle',
    error: null
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
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
            .addCase(postOrder.pending, (state) => {
                state.fetchOrders = 'loading';
            })
            .addCase(postOrder.fulfilled, (state, action) => {
                state.fetchOrders = 'succeeded';
                state.orders = [...state.orders, action.payload];
            })
            .addCase(postOrder.rejected, (state, action) => {
                state.fetchOrders = 'failed';
                state.error = action.error.message;
            })
            
    }
});

export default ordersSlice.reducer;