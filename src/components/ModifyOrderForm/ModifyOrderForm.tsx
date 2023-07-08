import React, { useState } from "react";
import styles from "./ModifyOrderForm.module.css";
import { ParselTypes, TOrder } from "../../utils/api/types";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { postOrder } from "../../services/orders/slice";
import { SlMinus } from 'react-icons/sl';

interface IAddOrderFormProps {
  handleCloseModal: () => void;
  id: any;
}

export const ModifyOrderForm = ({ handleCloseModal, id }: IAddOrderFormProps) => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const orders = useSelector((state: any) => state.orders.orders);

  const currentOrder: TOrder = orders?.find((el: any) => el.id === id);
  console.log('currentOrder', currentOrder);
  
    
  const [state, setState] = useState({
    city: currentOrder.destination.city,
    district: currentOrder.destination.district,
    receiverName: currentOrder.destination.receiverName,
    receiverPhone: currentOrder.destination.receiverPhone,
    receiverSurname: currentOrder.destination.receiverSurname,
    parsels: currentOrder.parcels,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("parsels")) {
      const index = parseInt(name.split("-")[1]);
      console.log(name);
      setState((prevState) => ({
        ...prevState,
        parsels: prevState.parsels.map((p, i) =>
          i === index ? { ...p, [name.split("-")[2]]: value } : p
        ),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: name === "weight" ? parseInt(value) : value,
      }));
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setState({
      city: "",
      district: "",
      receiverName: "",
      receiverPhone: "",
      receiverSurname: "",
      parsels: [{ type: "", weight: 0 }],
    });
    handleCloseModal();
    console.log(state);
    dispatch(
      postOrder({
        destination: {
          city: state.city,
          district: state.district,
          receiverName: state.receiverName,
          receiverPhone: state.receiverPhone,
          receiverSurname: state.receiverSurname,
        },
        parcels: state.parsels.map((parcel) => ({
          ...parcel,
          weight: Number(parcel.weight),
        })),
      })
    );
  };

  const handleAddParsel = () => {
    setState((prevState) => ({
      ...prevState,
      parsels: [...prevState.parsels, { type: "", weight: 0 }],
    }));
  };

  const handleRemoveParcel = (i: number) => {
    setState((prevState) => ({
      ...prevState,
      parsels: prevState.parsels.filter((parsel, id) => id !== i)
    }))
  }
  console.log(state);

  return (
    <div className={styles.addOrderForm}>
      <h2 className={styles.addOrderFormCaption}>Modify Order</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <h3 className={styles.fieldsetCaption}>Destination</h3>
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            onChange={handleInputChange}
            value={state.city}
            minLength={3}
            required
          />
          <label htmlFor="district">District</label>
          <input
            type="text"
            name="district"
            onChange={handleInputChange}
            value={state.district}
            minLength={3}
            required
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <h3 className={styles.fieldsetCaption}>Reciever</h3>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="receiverName"
            onChange={handleInputChange}
            value={state.receiverName}
            minLength={2}
            required
          />
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            name="receiverSurname"
            onChange={handleInputChange}
            value={state.receiverSurname}
            minLength={2}
            required
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            name="receiverPhone"
            onChange={handleInputChange}
            value={state.receiverPhone}
            minLength={7}
            required
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <h3 className={styles.fieldsetCaption}>Parcel</h3>
          {state.parsels.map((p, i) => (
            <div className={styles.parsel} key={i}>
              <label htmlFor={`parsels-${i}-type`}>Type</label>
              <select
                name={`parsels-${i}-type`}
                value={p.type}
                onChange={handleInputChange}
                disabled
                required
              >
                <option value="" disabled>
                  -- Select type --
                </option>
                {Object.values(ParselTypes).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <label htmlFor={`parsels-${i}-weight`}>Weight (kg)</label>
              <input
                type="number"
                name={`parsels-${i}-weight`}
                value={p.weight}
                onChange={handleInputChange}
                disabled
                required
              />
              {i !== 0 && <SlMinus className={styles.removeParcelIcon} onClick={() => handleRemoveParcel(i)} />}
            </div>
          ))}
        </fieldset>
        <div className={styles.buttonWrapper}>
          {/* <button
            type="button"
            onClick={handleAddParsel}
            className={`${styles.submitButton} ${styles.addParsel}`}
          >
            Add Parsel
          </button> */}
          <button className={styles.submitButton} type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};
