import React from 'react'
import styles from './OrderControls.module.css'
import { FaPlusCircle } from 'react-icons/fa'

interface IOrderControls {
  handleCloseModal: () => void;
}

export const OrderControls = ({ handleCloseModal }: IOrderControls) => {
  return (
    <section className={styles.orderControls}>
        <button onClick={handleCloseModal} className={styles.control}><FaPlusCircle />Add Order</button>
    </section>
  )
}
