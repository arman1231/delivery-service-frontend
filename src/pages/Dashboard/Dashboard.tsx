import PageTitle from "../../components/PageTitle/PageTitle";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import { OrderControls } from "../../components/OrderControls/OrderControls";
import { Modal } from "../../components/Modal/Modal";
import { AddOrderForm } from "../../components/AddOrderForm/AddOrderForm";
import { OrdersList } from "../../components/OrdersList/OrdersList";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    addOrderModal: false,
    sortByModal: false
  });

  const handleCloseModal = () => {
    setIsModalOpen({ ...isModalOpen, addOrderModal: false, sortByModal: false })
  }

  const handleOpenAddOrderModal = () => {
    setIsModalOpen({ ...isModalOpen, addOrderModal: !isModalOpen.addOrderModal })
  }

  const handleOpenSortByModal = () => {
    setIsModalOpen({ ...isModalOpen, sortByModal: !isModalOpen.sortByModal })
  }

  const options = [
    { value: "assigned", name: "Assigned" },
    { value: "created", name: "Created" },
    { value: "canceled", name: "Canceled" },
  ];

  return (
    <section className={styles.dashboard}>
      <PageTitle>Dashboard</PageTitle>
      <OrderControls handleOpenAddOrderModal={handleOpenAddOrderModal} handleOpenSortByModal={handleOpenSortByModal} />
      <OrdersList />
      {!!isModalOpen.addOrderModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <AddOrderForm handleCloseModal={handleCloseModal} />
        </Modal>
      )}
      {!!isModalOpen.sortByModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <div className={styles.filters}>
            <form>
              <label htmlFor="status">Status:</label>
              <select
                name="status"
                value="-- Select order status --"
                id="status-select"
                onChange={(e) => console.log(e.target.value)}
              >
                <option value="" disabled>
                  -- Select order status --
                </option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Dashboard;
