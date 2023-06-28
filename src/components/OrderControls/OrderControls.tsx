import React from 'react'
import styles from './OrderControls.module.css'
import { FaPlusCircle } from 'react-icons/fa'
import { MdOutlineSort } from 'react-icons/md';

interface IOrderControls {
  handleOpenAddOrderModal: () => void;
  handleOpenSortByModal: () => void;
}

export const OrderControls = ({ handleOpenAddOrderModal, handleOpenSortByModal }: IOrderControls) => {
  return (
    <section className={styles.orderControls}>
        <button onClick={() => handleOpenAddOrderModal()} className={styles.control}><FaPlusCircle />Add Order</button>
        <button onClick={() => handleOpenSortByModal()} className={styles.control}><MdOutlineSort />Sort by status</button>
    </section>
  )
}
