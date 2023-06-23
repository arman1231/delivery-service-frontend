import React, { ChangeEventHandler, useState } from "react";
import styles from "./AddOrderForm.module.css";
import { ParselTypes } from "../../utils/api/types";
import { useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { postOrder } from "../../services/orders/slice";

interface IAddOrderFormProps {
  handleCloseModal: () => void;
}

export const AddOrderForm = ({ handleCloseModal }: IAddOrderFormProps) => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [state, setState] = useState({
    city: "",
    district: "",
    receiverName: "",
    receiverPhone: "",
    receiverSurname: "",
    parsels: [{ type: "", weight: 0 }],
  });

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   setState({ ...state, [e.target.name]: e.target.value });
  // };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("parsels")) {
      const index = parseInt(name.split("-")[1]);
      setState((prevState) => ({
        ...prevState,
        parsels: prevState.parsels.map((p, i) =>
          i === index ? { ...p, [name.split("-")[2]]: value } : p
        ),
      }));
    } else {
      setState({ ...state, [name]: value });
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
    console.log({
      destination: {
        city: state.city,
        district: state.district,
        receiverName: state.receiverName,
        receiverPhone: state.receiverPhone,
        receiverSurname: state.receiverSurname,
      },
      parcels: state.parsels,
    });
    dispatch(postOrder({
      destination: {
        city: state.city,
        district: state.district,
        receiverName: state.receiverName,
        receiverPhone: state.receiverPhone,
        receiverSurname: state.receiverSurname,
      },
      parcels: state.parsels,
    }))
  };

  const handleAddParsel = () => {
    setState((prevState) => ({
      ...prevState,
      parsels: [...prevState.parsels, { type: "", weight: 0 }],
    }));
  };
  console.log(state);

  return (
    <div className={styles.addOrderForm}>
      <h2 className={styles.addOrderFormCaption}>Add Order</h2>
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
                required
              />
            </div>
          ))}
        </fieldset>
        <div className={styles.buttonWrapper}>
          <button
            type="button"
            onClick={handleAddParsel}
            className={`${styles.submitButton} ${styles.addParsel}`}
          >
            Add Parsel
          </button>
          <button className={styles.submitButton} type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
