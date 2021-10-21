import React from 'react';
import Link from 'next/link'

const Index = () => {
  return (
    <div className='tracking-wider uppercase text-center text-lg font-bold leading-10 my-8'>
      <p >O nosso restaurante sempre busca o<br />
        melhor atendimento aos nossos clientes.<br />
        Por isso, estamos atentos à sua opinião/sugestão.
      </p>

      <div className='text-center my-8'>
        <Link href='/pesquisa'>
          <a className='px-6 py-4 bg-blue-300 rounded-md font-bold hover:bg-green-400'>DEIXAR OPINIÃO OU SUGESTÃO</a>
        </Link>
      </div>

      <div className='text-center my-8 text-sm text-gray-400'>
        <p>Ao dar sua opinião, ganhe <span>15</span>% na sua próxima compra</p>
      </div>
    </div>
  )
}

export default Index;
