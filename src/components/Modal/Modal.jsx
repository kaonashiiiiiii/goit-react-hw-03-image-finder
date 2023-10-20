import { Component } from 'react'
import styles from './modal.module.css'

class Modal extends Component {
  handleEscapeKey = (event) => {
    if (event.key === 'Escape' && this.props.isOpen) {
      this.props.closeModal()
    }
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleEscapeKey)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleEscapeKey)
  }

  render () {
    if (!this.props.isOpen) return null
    return (
      <div className={styles.Overlay} onClick={this.props.closeModal}>
        <div className={styles.Modal}>
          <img src={this.props.currentImage.largeImageURL} alt="" />
        </div>
      </div>
    )
  }
}

export default Modal