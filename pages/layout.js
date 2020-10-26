import Head from 'next/head'

import Footer from './footer'
import styles from '../styles/Home.module.css'

export default function Layout({ children, props }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Behavior Observation Tools</title>
        <link rel="icon" href="/img/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>


        <header className={styles.header}>
          <a href="/">
          <img className={styles.logo} src="/img/icon.png" alt="Behavior Observation: BOSS Logo"/>
          <h1 className={styles.title}>
            Behavior&nbsp;Observation&nbsp;Tools
          </h1>
          </a>
        </header>

      <main className={styles.main}>
      {children}
      </main>

      <Footer/>
    </div>
  )
}