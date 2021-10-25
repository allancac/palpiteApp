import { data } from 'autoprefixer';
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
      Nota: ''
    }
  )
  /* 
  Evento sintético ao ser disparado o evento onChange dos inputs do formulário
  responsável por alterar as variáves de estado do componente
  */
  const mudarState = (objInput) => {
    console.log(objInput.target.value)
    const key = objInput.target.name    //recebe o nome do input
    const valor = objInput.target.value //recebe o valor do input
    //método para alterar os valores das variáveis de evento do componente
    setForm(old => ({
      ...old,
      [key]: valor
    }))

  }

  //variáveis de estado para controlar a resposta da requisião HTTP
  const [ successRes, setSuccessRes ] = useState(false)
  const [ returnValue, setReturnValue ] = useState({})

  //método para fazer a requisição POST para a API
  const save = async () => {
    try {
      const response = await fetch('/api/post-comment', {
        method: 'POST',
        body: JSON.stringify(form)
      })
      const data = await response.json()
      setSuccessRes(true)
      setReturnValue(data)
      
    } catch (error) {
      console.log(error)
    }

  }
  //Array com notas que irão compor os Radio Buttons da Nota de avaliação.
  const arrayNotas = ["1","2","3","4","5"]
  
  return (
    
    <div className='text-center'>
      <div className="text-xl mt-6 py-10"> Agradecemos pela sua opinião!</div>
      {!successRes && 
      <div>
        <h1 className='tracking-wider uppercase text-center text-lg font-bold leading-10 my-8'>Críticas e Sugestões</h1>

        <div className='flex justify-start my-6 md:w-600 mx-auto' >
          <label className='px-4 text-md w-1/2 font-bold text-left' htmlFor='userName'>Nome:</label><br />
          <input className='bg-blue-100 rounded-md h-6 w-full p-4 text-lg font-sans'
            name='Nome' value={form.Nome} type="text" id='userName' placeholder='Digite seu Nome' onChange={mudarState} />
        </div>

        <div className='flex justify-start my-6 md:w-600 mx-auto' >
          <label className='px-4 text-md w-1/2 font-bold text-left' htmlFor='userEmail'>E-mail:</label><br />
          <input className='bg-blue-100 rounded-md h-6 w-full p-4 text-lg font-sans'
            name='Email' value={form.Email} type="email" id='userEmail' placeholder='Digite seu E-mail' onChange={mudarState} />
        </div>

        <div className='flex justify-start my-6 md:w-600 mx-auto' >
          <label className='px-4 text-md w-1/2 font-bold text-left' htmlFor='userWhatsapp'>WhatsApp:</label><br />
          <input className='bg-blue-100 rounded-md h-6 w-full py-4 px-6 text-lg font-sans'
            name='Whatsapp' value={form.Whatsapp} type="tel" id='userWhatsapp ' pattern='[0-9]{2} [0-9]{5}-[0-9]{4}' required placeholder='Digite seu número de Whatsapp' onChange={mudarState} />
        </div>

        <div className='flex justify-start my-6 md:w-600 mx-auto' >
          <label className='px-4 text-md w-1/2 font-bold text-left' htmlFor='critica'>Crítica ou Sugestão:</label><br />
          <textarea className='px-6 bg-blue-100 rounded-md h-8 w-full text-lg font-sans' placeholder='Digite sua crítica/sugestão' rows={1} cols={20}
            name='Critica' value={form.Critica} id='Critica' onChange={mudarState} />
        </div>

        <div> 
          <div>Qual sua nota para nosso atendimento?</div>
          {arrayNotas.map((valor)=> 
            <div className='inline px-4'>{`${valor} `}
              <input type="radio" name="Nota" id="nota" value={valor} onChange={mudarState}/>
            </div>
          )}
        </div>

        <button className="text-center px-10 py-4 my-10 bg-blue-500 rounded-xl font-bold hover:bg-green-500 text-white" onClick={save}>Salvar</button>
      </div>
      }

      {successRes && returnValue.showCupom &&
        <div> 
          <div className="text-xl mt-6"> 
            Você recebeu
            <span className='text-2xl font-black px-2'>
              {` ${returnValue.promoValue}% `} 
            </span>
              de desconto<br/>na sua próxima compra!
          </div>
          <div className='text-center text-md font-mono 
          w-1/3 mx-auto p-4 my-20 
          bg-yellow-100 rounded-SM shadow-2xl 
          border-double border-4 border-black rounded-'>
            <div>Código do Cupom: </div>
            <div className='py-8 text-2xl sm:text-md font-black tracking-widest'>
               {returnValue.cupomValue}
            </div>
            <div>Cupom válido por 30 dias.</div>
            <div>Cupom gerado em: <br/>{returnValue.data} </div>

          </div>
        </div>
      }

    </div>

  )
}

export default Pesquisa;