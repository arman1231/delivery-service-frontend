import React from 'react'
import styles from './OrderControls.module.css'
import { FaPlusCircle } from 'react-icons/fa'


export const OrderControls = () => {
  return (
    <section className={styles.orderControls}>
        <button className={styles.control}><FaPlusCircle />Add Order</button>
    </section>
  )
}
