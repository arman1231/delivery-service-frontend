import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import ordersReducer from "./orders/slice"

export default configureStore({
    reducer: {
        auth: authReducer,
        orders: ordersReducer,
    }
});