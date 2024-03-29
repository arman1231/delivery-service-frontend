import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrdersService from "../../utils/api/ordersApi";
import { TOrder, PostOrderPayload, OrderDestination } from "../../utils/api/types";

interface IInitialState {
  orders: TOrder[];
  fetchOrders: string;
  error: null | string | undefined;
}

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
    const token = localStorage.getItem("token")
? `Bearer ${localStorage.getItem("token")}`
: "";
  try {
    const { data } = await OrdersService.getOrders(token);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const postOrder = createAsyncThunk(
  "orders/postOrder",
  async (order: PostOrderPayload) => {
    const token = localStorage.getItem("token")
? `Bearer ${localStorage.getItem("token")}`
: "";
    try {
      const { data } = await OrdersService.addOrder(order, token);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const changeOrder = createAsyncThunk(
    "orders/changeOrder",
    async ({ order, id }: { order: OrderDestination, id: number }) => {
      try {
        const { data } = await OrdersService.changeOrderDestination(id, order);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

export const deleteOrderById = createAsyncThunk(
  "orders/deleteOrderById",
  async (id: number) => {
    try {
      const { data } = await OrdersService.deleteOrder(id);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState: IInitialState = {
  orders: [],
  fetchOrders: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(changeOrder.pending, (state) => {
        state.fetchOrders = "loading";
      })
      .addCase(changeOrder.fulfilled, (state, action) => {
        state.fetchOrders = "succeeded";
        state.orders = state.orders.map((order) => {
            if (order.id === action.payload.id) {
              return {
                ...order,
                destination: action.payload.destination,
              };
            }
            return order;
          });
        console.log(action);
        
      })
      .addCase(changeOrder.rejected, (state, action) => {
        state.fetchOrders = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteOrderById.pending, (state) => {
        state.fetchOrders = "loading";
      })
      .addCase(deleteOrderById.fulfilled, (state, action) => {
        state.fetchOrders = "succeeded";
        state.orders = state.orders.filter((order) => order.id !== action.meta.arg);
      })
      .addCase(deleteOrderById.rejected, (state, action) => {
        state.fetchOrders = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.fetchOrders = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.fetchOrders = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.fetchOrders = "failed";
        state.error = action.error.message;
      })
      .addCase(postOrder.pending, (state) => {
        state.fetchOrders = "loading";
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.fetchOrders = "succeeded";
        state.orders = [...state.orders, action.payload];
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.fetchOrders = "failed";
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;

// export const { deleteOrder } = ordersSlice.actions;
