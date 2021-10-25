import React from 'react';
import Link from 'next/link'
import useSWR from 'swr'
import PageTitle from '../components/pageTitle';

const Index = () => {
  const fetcher = (...args) => fetch(...args).then(resultado => resultado.json())
  const { data, err } = useSWR('/api/get-promo', fetcher)
  return (
    <div className='tracking-wider uppercase text-center text-lg font-bold leading-10 my-8'>
      <PageTitle title='Conte-nos sua opinião.' />
      <p >O nosso restaurante sempre busca o<br />
        melhor atendimento aos nossos clientes.<br />
        Por isso, estamos atentos à sua opinião/sugestão.
      </p>

      {!err && data && data.showCoupon &&
        <div className='text-center text-md text-white 
         w-1/3 mx-auto p-4 my-20 
         bg-green-700 rounded-SM transform -rotate-6 shadow-2xl 
         border-dashed border-4 border-white animate-pulse'>
          <p>{`${data.message[0]} ${data.discount} % ${data.message[1]}`}</p>
        </div>
      }
      {!data && <p className="animate-bounce">PROCURANDO PROMOÇOES...</p>}

      <div className='text-center my-8'>
        <Link href='/pesquisa'>
          <a className='px-6 py-4 bg-blue-500 rounded-xl font-bold hover:bg-green-500 text-white'>
            AVALIAR!
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Index;
