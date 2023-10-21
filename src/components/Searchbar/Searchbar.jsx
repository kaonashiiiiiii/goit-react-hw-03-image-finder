import React, { Component } from 'react'
import styles from './searchbar.module.css'

class Searchbar extends Component {
  state = {
    value: '',
  };

  onSearchSubmit = (e) => {
    e.preventDefault()
    if (this.state.value.length < 1) return
    this.props.onSubmit(this.state.value)
  }

  setSearchQuery = (e) => {
    const searchQuery = e.target.value.toLowerCase().trim()
    this.setState({
      value: searchQuery
    });
  }
  render () {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.onSearchSubmit}>
          <button type="submit" className={styles['SearchForm-button']}>
            <span className={styles['SearchForm-button-label']}>Search</span>
          </button>
  
          <input
            className={styles['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.setSearchQuery}
          />
        </form>
      </header>
    )
  }
}

export default Searchbar