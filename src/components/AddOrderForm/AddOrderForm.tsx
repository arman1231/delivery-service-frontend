import React, { ChangeEventHandler, useState } from "react";
import styles from "./AddOrderForm.module.css";
import { ParselTypes } from "../../utils/api/types";

interface IAddOrderFormProps {
    handleCloseModal: () => void;
}

export const AddOrderForm = ({ handleCloseModal }: IAddOrderFormProps) => {
  const [state, setState] = useState({
    city: "",
    district: "",
    receiverName: "",
    receiverPhone: "",
    receiverSurname: "",
    type: "",
    weight: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setState({
        city: "",
        district: "",
        receiverName: "",
        receiverPhone: "",
        receiverSurname: "",
        type: "",
        weight: 0,
      })
    handleCloseModal();
    console.log({
        "destination": {
          "city": state.city,
          "district": state.district,
          "receiverName": state.receiverName,
          "receiverPhone": state.receiverPhone,
          "receiverSurname": state.receiverSurname
        },
        "parcels": [
          {
            "type": state.type,
            "weight": state.weight
          }
        ]
      });
    
  }
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
          />
          <label htmlFor="district">District</label>
          <input
            type="text"
            name="district"
            onChange={handleInputChange}
            value={state.district}
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
          />
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            name="receiverSurname"
            onChange={handleInputChange}
            value={state.receiverSurname}
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="receiverPhone"
            onChange={handleInputChange}
            value={state.receiverPhone}
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <h3 className={styles.fieldsetCaption}>Parcel</h3>
          <label htmlFor="type">Type</label>
          <select
            name="type"
            value={state.type}
            onChange={handleInputChange}
            id="parcel-type-select"
          >
            <option value="" disabled>-- Select type --</option>
            {Object.values(ParselTypes).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="surname">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            onChange={handleInputChange}
            value={state.weight}
          />
        </fieldset>
        <div className={styles.buttonWrapper}>
          <button className={styles.submitButton} type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
