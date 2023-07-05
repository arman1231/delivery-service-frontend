import styles from "./OrdersList.module.css";
import { Order } from "../Order/Order";
import { useEffect } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../services/orders/slice";
import { TOrder } from "../../utils/api/types";

export const OrdersList = () => {
  const orders = useSelector((state: any) => state.orders.orders);
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  console.log(orders);

  return (
    <div className={styles.orders}>
      {orders.length === 0 ? <p>There are no orders...</p> : orders?.map((order: TOrder) => {
        return <Order key={order.id} order={order} />;
      })}
    </div>
  );
};
