import axios from 'axios'
import PageTitle from '../../components/PageTitle/PageTitle'
import styles from './Dashboard.module.css'
import { useEffect } from 'react'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../services/orders/slice'
import { Order, Parsel } from '../../utils/api/types'

const Dashboard = () => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const orders = useSelector((state: any) => state.orders.orders);
  console.log(orders);


  useEffect(() => {
    dispatch(fetchOrders())
  }, []);

  const options = [
    { value: 'petersburg', name: 'Санкт-Петербург' },
    { value: 'samara', name: 'Самара' },
    { value: 'perm', name: 'Пермь' },
    { value: 'novosibirsk', name: 'Новосибирск' }
  ]


  return (
    <section className={styles.dashboard}>
      <PageTitle>Dashboard</PageTitle>
      <div className={styles.filters}>
        <form>
          <label htmlFor="city-select">Ваш город</label>
          <select name="city" value="-- Выберите город --" id="city-select" onChange={(e) => console.log(e.target.value)
          }>
            <option value="" disabled>-- Выберите город --</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.name}</option>
            ))}
          </select>
        </form>
      </div>
      <div className={styles.orders}>
        {orders && orders?.length !== 0 ? orders.map((order: Order) => {
          const { destination, id, status, parcels } = order;
          return (
            <div key={order.id} className={styles.order}>
              <h3 className={styles.orderTitle}>Order #{id}</h3>
              <div className={styles.orderDestination}>
                {Object.keys(destination).map((key) => (
                  <div key={key} className={styles.orderDestinationItem}>
                    <span className={styles.orderDestinationItemCaption}>{key.includes('receiver') ? key.replace('receiver', 'Receiver').split(/(?=[A-Z])/).join(' ') : key.charAt(0).toUpperCase() + key.slice(1)}: {" "}</span>
                    <span className={styles.orderDestinationItemValue}>{destination[key]}</span>
                  </div>
                ))}
              </div>
              <div className={styles.orderParsels}>
                {
                  parcels.map((parcel: Parsel) => (
                    <div className={styles.orderDestinationItem}>
                      <p style={{textAlign: 'center', fontWeight: 'bold'}}>Parsels:</p>
                      {Object.keys(parcel).map((key, i) => (
                        <div key={i} className={styles.orderDestinationItem}>
                          <span className={styles.orderDestinationItemCaption}>{key.includes('receiver') ? key.replace('receiver', 'Receiver').split(/(?=[A-Z])/).join(' ') : key.charAt(0).toUpperCase() + key.slice(1)}: {" "}</span>
                          <span className={styles.orderDestinationItemValue}>{parcel[key]}</span> </div>
                      ))
                      }
                    </div>
                  ))
                }
              </div>
              <div className={styles.orderStatusContainer}> <h4 className={styles.orderStatus}>Status: {status}</h4>
                <div className={`${styles.dot} ${status === 'CREATED' ? styles.red : styles.green}`} /></div>
            </div>
          )
        }) : <p>There is no orders...</p>}
      </div>
    </section>
  )
}

export default Dashboard