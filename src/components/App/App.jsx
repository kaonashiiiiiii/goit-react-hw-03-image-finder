import { Component } from 'react'
import styles from './app.module.css'
import { getImages } from 'api/pixabay.api'
import { Button, ImageGallery, Loader, Modal, Searchbar } from 'components'

class App extends Component {
  state = {
    query: '',
    loading: false,
    error: null,
    lastSearchedQuery: '',
    images: [],
    page: 1,
    perPage: 12,
    isModalOpen: false,
    currentImage: null
  }

  doSearch = async (e) => {
    e.preventDefault()
    try {
      this.setState({
        loading: true
      })
      const params = {
        page: 1,
        per_page: this.state.perPage,
        q: this.state.query
      }
      const data = await getImages(params)
      this.setState({
        page: 1,
        images: data,
        lastSearchedQuery: this.state.query,
        loading: false
      })
    } catch (e) {
      this.setState({
        error: true,
      })
    } finally {
      this.setState({
        loading: false,
      })
    }
  }

  loadMore = async () => {
    const params = {
      q: this.state.lastSearchedQuery,
      perPage: this.state.perPage,
      page: this.state.page + 1
    }
    const data = await getImages(params)
    this.setState({
      images: [...this.state.images, ...data],
      page: this.state.page + 1
    })
  }

  openModal = (image) => {
    this.setState({
      currentImage: image,
      isModalOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      currentImage: null,
      isModalOpen: false
    })
  }

  setSpecificState = (value, prop) => {
    this.setState({
      [prop]: value
    })
  }

  render () {
    const spinner = this.state.loading ? <Loader /> : null
    const errorMessage = this.state.error ? <h2>Error occured</h2> : null 
    return (
      <div className={styles.App}>
        <Modal isOpen={this.state.isModalOpen} closeModal={this.closeModal} currentImage={this.state.currentImage}/>
        <Searchbar query={this.state.query} setQuery={this.setSpecificState} doSearch={this.doSearch}/>
        {errorMessage}
        {spinner}
        <ImageGallery imageList={this.state.images} openModal={this.openModal}/>
        <div className={styles.flexCentered}>
          { this.state.images.length > 0 && <Button title="Load more" onClick={this.loadMore}/> }
        </div>
      </div>
    )
  }
}

export default App