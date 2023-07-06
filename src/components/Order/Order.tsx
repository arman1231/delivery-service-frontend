import React from "react";
import styles from "./Order.module.css";
import { TParsel, TOrder } from "../../utils/api/types";
import { SlOptionsVertical } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { AiFillDelete } from "react-icons/ai";
import { MdAssignmentInd } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteOrderById } from "../../services/orders/slice";
import { RxUpdate } from "react-icons/rx";
interface IOrderProps {
  order: TOrder;
}

export const Order = ({ order }: IOrderProps) => {
  const { destination, id, status, parcels } = order;
  const [modifyOrderValue, setModifyOrderValue] = React.useState("");
  const [isTooltipOpen, setTooltipOpen] = React.useState(false);
  const [isModifyOrderOpen, setIsModifyOrderOpen] = React.useState(false);
  const dispatch: any = useDispatch();

  const handleDeleteOrder = () => {
    dispatch(deleteOrderById(id));
  };

  const handleCloseTooltip = () => {
    setTooltipOpen(false);
    setIsModifyOrderOpen(false);
    setModifyOrderValue("")
  };

  const handleModifyOrderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;

    setModifyOrderValue(value)
console.log(modifyOrderValue);

  };
  return (
    <div key={order.id} className={styles.order}>
      <h3 className={styles.orderTitle}>Order #{id}</h3>
      <SlOptionsVertical
        className={styles.orderTooltipContols}
        onClick={() => setTooltipOpen(true)}
      />
      {isTooltipOpen && (
        <div className={styles.orderTooltip}>
          <IoCloseCircleOutline
            className={styles.closeIcon}
            onClick={handleCloseTooltip}
          />
          <ul className={styles.orderTooltipMenu}>
            {isModifyOrderOpen ? (
              <li className={styles.orderTooltipMenuItem}>
                <div className={styles.modifyOrderInputContainer}>
                  <input
                    type="text"
                    name="destination"
                    onChange={handleModifyOrderChange}
                    value={modifyOrderValue}
                    minLength={3}
                    className={styles.modifyOrderInput}
                  />
                  <IoCloseCircleOutline
                    onClick={() => setIsModifyOrderOpen(!isModifyOrderOpen)}
                    className={styles.orderModifyOrderContols}
                  />
                </div>
              </li>
            ) : (
              <li
                className={styles.orderTooltipMenuItem}
                onClick={() => setIsModifyOrderOpen(!isModifyOrderOpen)}
              >
                <CiEdit className={styles.menuItemIcon} />
                Modify Destination
              </li>
            )}

            <li
              className={styles.orderTooltipMenuItem}
              onClick={handleDeleteOrder}
            >
              <AiFillDelete className={styles.menuItemIcon} />
              Delete Order
            </li>
            <li className={styles.orderTooltipMenuItem}>
              <MdAssignmentInd className={styles.menuItemIcon} />
              Assign Order
            </li>
          </ul>
        </div>
      )}
      <div className={styles.orderDestination}>
        {Object.keys(destination).map((key) => (
          <div key={key} className={styles.orderDestinationItem}>
            <span className={styles.orderDestinationItemCaption}>
              {key.includes("receiver")
                ? key
                    .replace("receiver", "Receiver")
                    .split(/(?=[A-Z])/)
                    .join(" ")
                : key.charAt(0).toUpperCase() + key.slice(1)}
              :{" "}
            </span>
            <span className={styles.orderDestinationItemValue}>
              {destination[key]}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.orderParsels}>
        <p style={{ textAlign: "center", fontWeight: "bold" }}>Parsels:</p>
        {parcels.map((parcel: TParsel) => (
          <div className={styles.orderDestinationItem}>
            {Object.keys(parcel).map((key, i) => (
              <div key={i} className={styles.orderDestinationItem}>
                <span className={styles.orderDestinationItemCaption}>
                  {key.includes("receiver")
                    ? key
                        .replace("receiver", "Receiver")
                        .split(/(?=[A-Z])/)
                        .join(" ")
                    : key.charAt(0).toUpperCase() + key.slice(1)}
                  :{" "}
                </span>
                <span className={styles.orderDestinationItemValue}>
                  {parcel[key]}
                </span>{" "}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.orderStatusContainer}>
        {" "}
        <h4 className={styles.orderStatus}>Status: {status}</h4>
        <div
          className={`${styles.dot} ${
            status === "CREATED" ? styles.red : styles.green
          }`}
        />
      </div>
    </div>
  );
};
