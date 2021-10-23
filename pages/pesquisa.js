import React, { useState } from 'react';


const Pesquisa = () => {

  // Varíaveis de estado do componente com o uso do useState. 
  // método setForm é uma implementação do useState
  const [form, setForm] = useState(
    {
      Nome: '',
      Email: '',
      Whatsapp: '',
      Critica: "",
      Nota: '3'
    }
  )
    /* 
    Evento sintético ao ser disparado o evento onChange dos inputs do formulário
    responsável por alterar as variáves de estado do componente
    */
    const mudarState=(objInput)=>{
      console.log(objInput.target.value)
      const valor = objInput.target.value //recebe o valor do input
      const key = objInput.target.name
      //método para alterar os valores das variáveis de evento do componente
      setForm(valorAntigo=>({
        ...valorAntigo,
        [key]:valor
      }))
      
    }

  const save = async () => {
    try {
      const response = await fetch('/api/post-comment', {
        method: 'POST',
        body: JSON.stringify(form)
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div>
      <h1 className='tracking-wider uppercase text-center text-lg font-bold leading-10 my-8'>Críticas e Sugestões</h1>
      <div className='flex justify-start my-6 md:w-600 mx-auto' >
        <label className='px-4 text-md w-1/2 font-bold' htmlFor='userName'>Nome:</label><br />
        <input className='bg-blue-100 rounded-md h-6 w-full p-4 text-lg font-sans' 
        name='Nome' value={form.Nome} type="text" id='userName' placeholder='Digite seu Nome' onChange={mudarState} />
      </div>
      <div className='flex justify-start my-6 md:w-600 mx-auto' >
        <label className='px-4 text-md w-1/2 font-bold' htmlFor='userEmail'>E-mail:</label><br />
        <input className='bg-blue-100 rounded-md h-6 w-full p-4 text-lg font-sans' 
        name='Email' value={form.Email} type="email" id='userEmail' placeholder='Digite seu E-mail' onChange={mudarState}/>
      </div>
      <div className='flex justify-start my-6 md:w-600 mx-auto' >
        <label className='px-4 text-md w-1/2 font-bold' htmlFor='userWhatsapp'>WhatsApp:</label><br />
        <input className='bg-blue-100 rounded-md h-6 w-full p-4 text-lg font-sans' 
          name='Whatsapp' value={form.Whatsapp} type="tel" id='userWhatsapp ' pattern='[0-9]{2} [0-9]{5}-[0-9]{4}' required placeholder='Digite seu número de Whatsapp' onChange={mudarState}/>
      </div>
      <div className='flex justify-start my-6 md:w-600 mx-auto' >
        <label className='px-4 text-md w-1/2 font-bold' htmlFor='critica'>Crítica ou Sugestão:</label><br />
        <textarea className='bg-blue-100 rounded-md h-8 w-full p-4 text-lg font-sans'
        name='Critica' value={form.Critica} id='Critica' placeholder='Digite sua crítica/sugestão' rows={4} cols={20} onChange={mudarState}/>
      </div>
      <button className="px-6 py-4 bg-blue-500 rounded-xl font-bold hover:bg-green-500 text-white" onClick={save}>Salvar</button>

      {/* visualização do estado do componente */}

    </div>


  )
}

export default Pesquisa;