import React from 'react'
import styles from './button.module.css'

const Button = (props) => {
  const { title, onClick } = props
  return (
    <button className={styles.Button} onClick={onClick}>{title}</button>
  )
}

export default Button