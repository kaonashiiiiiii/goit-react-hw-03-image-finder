import React from 'react'
import styles from './searchbar.module.css'

const Searchbar = (props) => {
  const { query, setQuery, doSearch } = props
  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={(e) => doSearch(e)}>
        <button type="submit" className={styles['SearchForm-button']}>
          <span className={styles['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={styles['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </header>
  )
}

export default Searchbar