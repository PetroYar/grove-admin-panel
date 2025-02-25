import React from 'react'

import styles from './H2.module.css'

const H2 = ({children})=>{
  return (
    <h2 className={styles.title}>{children}</h2>
  )
}

export default H2