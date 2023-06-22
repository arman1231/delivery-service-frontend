import React, { useState } from 'react'
import styles from './AddOrderForm.module.css'

export const AddOrderForm = () => {
    const [state, setState] = useState({
          "city": "string",
          "district": "string",
          "receiverName": "string",
          "receiverPhone": "string",
          "receiverSurname": "string",
            "type": "EXTRA_LARGE",
            "weight": 0
          
      });
    const handleInputChange = (e) => {

    }
    return (
        <div className={styles.addOrderForm}>
            <h2 className={styles.addOrderFormCaption}>
                Add Order
            </h2>
            <form className={styles.form}>
                <fieldset className={styles.fieldset}>
                    <h3>Destination</h3>
                    <label htmlFor='city'>
                        City
                    </label>
                    <input type='text' name='city'/>
                    <label htmlFor='district'>
                        District
                    </label>
                    <input type='text' name='district' />
                </fieldset>
                <fieldset className={styles.fieldset}>
                    <h3>Reciever</h3>
                    <label htmlFor='name'>
                        Name
                    </label>
                    <input type='text' name='name' />
                    <label htmlFor='surname'>
                        Surname
                    </label>
                    <input type='text' name='surname' />
                    <label htmlFor='phone'>
                        Phone
                    </label>
                    <input type='text' name='phone' />
                </fieldset>
            </form>
        </div>
    )
}
