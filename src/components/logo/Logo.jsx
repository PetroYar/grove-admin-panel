import React from 'react'

import styles from './Logo.module.css'

const Logo = (props)=>{
  return (
    <div className={styles.logo}>
      <img src="/logo.png" alt="grove-logo" />
    </div>
  );
}

export default Logo