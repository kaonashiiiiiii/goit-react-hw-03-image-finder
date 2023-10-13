import React, { useState } from 'react'
import styles from './app.module.css'
import PixabayService from 'services/PixabayService'
import { Button, ImageGallery, Loader, Modal, Searchbar } from 'components'

const App = () => {
  const [query, setQuery] = useState('')
  const [lastSearchedQuery, setLastSearchedQuery] = useState('')
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [perPage] = useState(12)
  const { getImages, loading, error } = PixabayService()
  const [isOpen, setIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)


  async function doSearch (e) {
    e.preventDefault()
    const params = {
      page: 1,
      per_page: perPage,
      q: query
    }
    const data = await getImages(params)
    setPage(1)
    setImages(data)
    setLastSearchedQuery(query)
  }

  async function loadMore () {
    const params = {
      q: lastSearchedQuery,
      perPage,
      page: page + 1
    }
    const data = await getImages(params)
    setImages([...images, ...data])
    setPage(prev => prev + 1)
  }

  function openModal (image) {
    setIsOpen(true)
    setCurrentImage(image)
  }

  function closeModal () {
    setIsOpen(false)
    setCurrentImage(null)
  }

  const spinner = loading ? <Loader /> : null
  const errorMessage = error ? <h2>Error occured</h2> : null 
  return (
    <div className={styles.App}>
      <Modal isOpen={isOpen} closeModal={closeModal} currentImage={currentImage}/>
      <Searchbar query={query} setQuery={setQuery} doSearch={doSearch}/>
      {errorMessage}
      {spinner}
      <ImageGallery imageList={images} openModal={openModal}/>
      <div className={styles.flexCentered}>
        { images.length > 0 && <Button title="Load more" onClick={loadMore}/> }
      </div>
    </div>
  )
}

export default App