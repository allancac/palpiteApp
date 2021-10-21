import React from "react";
import styles from './styles.module.css'
import Link from 'next/link'


const Header = () => {
  return (
    <React.Fragment>
      <div className={styles.wrapper}>
        <div className={styles.containerHeader}>
          <Link href='/pesquisa'>
            <a><img className={styles.img} src="/logoPalpitebox.png" alt="PalpiteApp" /></a>
          </Link>
        </div>
      </div >

      <div className={styles.navMenu}>
        <Link href='/pesquisa'><a className={styles.navLinks}>Pesquisa</a></Link>
        <Link href='/sobre'><a className={styles.navLinks}>Sobre</a></Link>
        <Link href='/contato'><a className={styles.navLinks}>Contato</a></Link>
      </div>
    </React.Fragment>
  )
}

export default Header