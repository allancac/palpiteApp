import React from 'react';
import Link from 'next/link';

const Pesquisa = () => {

  const save = async () => {
    const dados = {
      nome: 'aaa',
      email: 'bbb',
      whatsapp: 'ccc'
    }
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(dados)
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {

    }

  }
  return (
    <div>
      <h1 className='tracking-wider uppercase text-center text-lg font-bold leading-10 my-8'>Críticas e Sugestões</h1>
      <div className='flex justify-start my-6 md:w-600 mx-auto' >
        <label className='px-4 text-md w-1/2 font-bold' htmlFor='userName'>Nome:</label><br />
        <input className='bg-blue-100 rounded-md h-6 w-full p-4 text-lg font-sans' type="text" id='userName' />
      </div>
      <div className='flex justify-start my-6 md:w-600 mx-auto' >
        <label className='px-4 text-md w-1/2 font-bold' htmlFor='userEmail'>E-mail:</label><br />
        <input className='bg-blue-100 rounded-md h-6 w-full p-4 text-lg font-sans' type="email" id='userEmail' />
      </div>
      <div className='flex justify-start my-6 md:w-600 mx-auto' >
        <label className='px-4 text-md w-1/2 font-bold' htmlFor='userWhatsapp'>WhatsApp:</label><br />
        <input className='bg-blue-100 rounded-md h-6 w-full p-4 text-lg font-sans' type="tel" id='userWhatsapp'
          pattern='[0-9]{2} [0-9]{5}-[0-9]{4}' required />
      </div>
      <div className='flex justify-start my-6 md:w-600 mx-auto' >
        <label className='px-4 text-md w-1/2 font-bold' htmlFor='critica'>Crítica ou Sugestão:</label><br />
        <textarea className='bg-blue-100 rounded-md h-8 w-full p-4 text-lg font-sans' id='critica' rows={4} cols={20} />

      </div>
      <button className="px-6 py-4 bg-blue-500 rounded-xl font-bold hover:bg-green-500 text-white" onClick={save}>Salvar</button>
    </div>
  )
}

export default Pesquisa;