import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import styles from './loader.module.css'

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#FF00CC" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  )
}

export default Loader