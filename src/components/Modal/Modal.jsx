import React, { useEffect } from 'react'
import styles from './modal.module.css'

const Modal = (props) => {
  const {isOpen, closeModal, currentImage } = props
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        closeModal()
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null
  return (
    <div className={styles.Overlay} onClick={closeModal}>
      <div className={styles.Modal}>
        <img src={currentImage.largeImageURL} alt="" />
      </div>
    </div>
  )
}

export default Modal