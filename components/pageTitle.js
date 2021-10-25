import Head from 'next/head'

const PageTitle = ({ title }) => {
  return (
    <Head>
      <title>{title} - PalpiteApp</title>
    </Head>
  )

}

export default PageTitle