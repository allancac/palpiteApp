import React from 'react'
import Link from 'next/link'
import styles from './styles.module.css'


const Footer = () => {
  return (
    <div className='bg-gray-600'>
      <div className='container mx-auto font-bold text-center text-white p-4'>
        <span className='px-2'>
          Projeto Desenvolvido por: Allan Chaves/
        </span>
        <span>
          <Link href="https://www.linkedin.com/in/allancac/"><a className='hover:underline px-2'>Linkedin/</a></Link>
        </span>
        <span>
          <Link href="https://github.com/allancac/palpiteApp"><a className='hover:underline px-2'>Github</a></Link>
        </span>
        <div className='mx-auto'>
          <img className='inline p-4' src="./logo_semana_fsm.png" alt="Logotipo da Semana Full Satack" />
          <img className='inline p-4' src="./logo_devpleno.png" alt="Logotipo DevPleno" />
        </div>
      </div>

    </div>

  )

}

export default Footer