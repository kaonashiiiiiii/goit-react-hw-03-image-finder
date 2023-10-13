import React from 'react'
import styles from './imageGallery.module.css'
import { ImageGalleryItem } from 'components'

const ImageGallery = ({ imageList, openModal }) => {
  return (
    <ul className={styles.ImageGallery}>
      {imageList.map(image => (
        <ImageGalleryItem key={image.id} image={image} openModal={openModal}/>
      ))}
    </ul>
  )
}

export default ImageGallery