import React from 'react'
import styles from './imageGalleryItem.module.css'

const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <li className={styles.ImageGalleryItem} onClick={() => openModal(image)}>
      <img src={image.webformatURL} alt="" className={styles['ImageGalleryItem-image']}/>
    </li>
  )
}

export default ImageGalleryItem