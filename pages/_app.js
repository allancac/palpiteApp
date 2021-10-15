import React from 'react';

import '../css/styles.css';

/* O NextJS carrega automaticamente o _app.js como página inicial
  Um componente espera como parâmetro um outro componente e as propriedades desse componente.
*/
const MyApp = ({ Component, pageProps }) => {

  /* "..." é uma técnica chamada de spread que 'espalha' todas propriedades do objeto pageprops
    no componente atual
  */
  return (
    <div>
      <h1>My APP</h1>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp;