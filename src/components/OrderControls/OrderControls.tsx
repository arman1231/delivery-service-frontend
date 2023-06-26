import React from 'react'
import styles from './OrderControls.module.css'
import { FaPlusCircle } from 'react-icons/fa'
import { MdOutlineSort } from 'react-icons/md';

interface IOrderControls {
  handleCloseModal: () => void;
}

export const OrderControls = ({ handleCloseModal }: IOrderControls) => {
  return (
    <section className={styles.orderControls}>
        <button onClick={handleCloseModal} className={styles.control}><FaPlusCircle />Add Order</button>
        <button onClick={handleCloseModal} className={styles.control}><MdOutlineSort />Sort by status</button>
    </section>
  )
}
