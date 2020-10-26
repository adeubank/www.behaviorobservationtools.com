import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Behavior Observation Tools</title>
        <link rel="icon" href="/img/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>


        <header className={styles.header}>
          <img className={styles.logo} src="/img/icon.png" alt="Behavior Observation: BOSS Logo"/>
          <h1 className={styles.title}>
            Behavior&nbsp;Observation&nbsp;Tools
          </h1>
        </header>

      <main className={styles.main}>

        <div className={styles.hero}>
        <h2 className={styles.subtitle}>
          Behavior Observation of Students in School
        </h2>

        <p className={styles.description}>
          <span className={styles.textGray}>Presenting the behavior observation tool,</span>
          <br/>Behavior observation of students in school (BOSS).
        </p>

            <img className={styles.feature} src="/img/screenshot-1.png" alt="Behavior Observation of Students in School"/>

            </div>
         <div className={styles.grid}>

         <div className={styles.row}>
            <a
              href="https://apps.apple.com/us/app/behavior-observation-boss/id1534801113"
              className={styles.card}
            >
              <h3>On iOS</h3>
            </a>

            <a
               href="#"
              onClick="alert('coming soon...')"
              className={styles.card}
            >
              <h3>On&nbsp;Android</h3>
              <p><i>coming soon...</i></p>
            </a>
         </div>
         </div>

        <div className={styles.grid}>

         <div className={styles.row}>
         <div className={styles.card}>
           <h3>In Classroom</h3>
           <p>Observe students in the classroom, systematically.</p>
         <img src="/img/classroom.jpg" alt="Behavior Observation of Students in School"/>

         </div>

         <div className={styles.card}>
           <h3>Virtually</h3>
           <p>Observe students virtually. Includes methods for evaluating student
             participation in a remote setting.</p>
           <img src="/img/virtual-meetings.jpg" alt="Virtual Behavior Observation of Students in School"/>

         </div>
         </div>

         <div className={styles.card}>
           <h3>Features:</h3>
           <ul>
             <li>Track behavior, systematically.</li>
             <li>Client and peer tracking for baseline.</li>
             <li>In-app feedback for focused tracking.</li>
             <li>Unlimited sessions.</li>
             <li>Graphs for Engaged, Non-Engaged, and Virtual behaviors.</li>
             <li>Export session to PDF.</li>
           </ul>
         </div>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
