import React from 'react';
import styles from "./Modal.module.css";
import { createPortal } from "react-dom"
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import { FaWindowClose } from 'react-icons/fa';

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModalProps {
    children: React.ReactNode;
    handleCloseModal: () => void;
}

export const Modal = ({ children, handleCloseModal }: IModalProps): React.ReactPortal => {
    return createPortal(
        <>
            <ModalOverlay handleCloseModal={handleCloseModal} />
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={() => handleCloseModal()}>
                    <FaWindowClose className={styles.closeIcon} />
                </button>
                {children}
            </div>
        </>,
        modalRoot
    )
}
