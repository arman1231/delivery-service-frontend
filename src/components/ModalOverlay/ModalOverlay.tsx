import React, { useEffect } from 'react'
import styles from "./ModalOverlay.module.css";

interface IModalOverlay {
    handleCloseModal: () => void;
}

export const ModalOverlay = ({ handleCloseModal }: IModalOverlay) => {
    const closeOnOverlay: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if (e.currentTarget === e.target) {
            handleCloseModal();
        }
    }
    const closeOnESC: (this: Window, e: KeyboardEvent) => void = (e) => {
        if (e.key === "Escape") handleCloseModal()
    }
    useEffect(() => {
        window.addEventListener('keydown', closeOnESC)
        return () => {
            window.removeEventListener('keydown', closeOnESC)
        }
    }, [])

    return (
        <div onClick={closeOnOverlay} className={styles.modalOverlay}></div>
    )
}
