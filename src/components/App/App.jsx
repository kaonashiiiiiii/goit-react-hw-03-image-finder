import { Component } from 'react'
import styles from './app.module.css'
import { getImages } from 'api/pixabay.api'
import { Button, ImageGallery, Loader, Modal, Searchbar } from 'components'

class App extends Component {
  state = {
    query: '',
    loading: false,
    error: null,
    images: [],
    page: 1,
    perPage: 12,
    isModalOpen: false,
    currentImage: null,
    totalHits: 0,
    result: null
  }

  componentDidUpdate(_, prevState) {
    if (prevState.query !== this.state.query || prevState.page !== this.state.page) {
      this.doSearch()
    }
  }

  doSearch = async () => {
    try {
      this.setState({
        loading: true
      })
      const params = {
        page: this.state.page,
        per_page: this.state.perPage,
        q: this.state.query
      }
      const data = await getImages(params)
      if (data.hits.length === 0) {
        return
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        result: this.state.page * this.state.perPage,
        totalHits: data.totalHits,
      }));
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

  loadMore =  () => {
    this.setState(({ page }) => ({ page: page + 1 }));
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

  initInputData = (query) => {
    this.setState({
      query,
      images: [],
      page: 1,
    });
  }

  setSpecificState = (value, prop) => {
    this.setState({
      [prop]: value
    })
  }

  render () {
    const { loading, error, images, result, totalHits } = this.state
    const spinner = loading ? <Loader /> : null
    const errorMessage = error ? <h2>Error occured</h2> : null
    const showLoadMoreButton = images.length > 0 && result < totalHits
    return (
      <div className={styles.App}>
        <Modal isOpen={this.state.isModalOpen} closeModal={this.closeModal} currentImage={this.state.currentImage}/>
        <Searchbar onSubmit={this.initInputData}/>
        {errorMessage}
        {spinner}
        <ImageGallery imageList={this.state.images} openModal={this.openModal}/>
        <div className={styles.flexCentered}>
          { showLoadMoreButton &&  <Button title="Load more" onClick={this.loadMore}/> }
        </div>
      </div>
    )
  }
}

export default App