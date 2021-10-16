import React from "react";
import styles from './styles.module.css'

const Header = () => {
  return (
    <div className={styles.wrapper}>
      <div className="container mx-auto">
        <h1 className={styles.vermelho}> PalpiteAPP Header</h1>
      </div>
    </div >
  )
}

export default Header