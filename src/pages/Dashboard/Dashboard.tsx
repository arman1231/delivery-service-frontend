import PageTitle from "../../components/PageTitle/PageTitle";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../services/orders/slice";
import { TOrder } from "../../utils/api/types";
import { OrderControls } from "../../components/OrderControls/OrderControls";
import { Modal } from "../../components/Modal/Modal";
import { AddOrderForm } from "../../components/AddOrderForm/AddOrderForm";
import { OrdersList } from "../../components/OrdersList/OrdersList";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  const options = [
    { value: "petersburg", name: "Санкт-Петербург" },
    { value: "samara", name: "Самара" },
    { value: "perm", name: "Пермь" },
    { value: "novosibirsk", name: "Новосибирск" },
  ];

  return (
    <section className={styles.dashboard}>
      <PageTitle>Dashboard</PageTitle>
      <OrderControls handleCloseModal={handleCloseModal} />
      <div className={styles.filters}>
        <form>
          <label htmlFor="city-select">Ваш город</label>
          <select
            name="city"
            value="-- Выберите город --"
            id="city-select"
            onChange={(e) => console.log(e.target.value)}
          >
            <option value="" disabled>
              -- Выберите город --
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </form>
      </div>
      <OrdersList />
      {isModalOpen && (
        <Modal handleCloseModal={handleCloseModal}>
          <AddOrderForm handleCloseModal={handleCloseModal} />
        </Modal>
      )}
    </section>
  );
};

export default Dashboard;
