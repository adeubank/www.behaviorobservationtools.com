import Head from 'next/head'
import Layout from './layout'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout>
        <div className={styles.hero}>
        <h2 className={styles.subtitle}>
          Behavior Observation of Students in School
        </h2>

        <p className={styles.description}>
          <small>
            Presenting<br/>
            the behavior observation tool,
          </small>
          <br/><b>Behavior Observation: BOSS</b>.
        </p>

           <div className={styles.feature} >
            <img src="/img/screenshot-1.png" alt="Behavior Observation of Students in School"/>
          </div>


          <div className={styles.row}>
             <a
               href="https://apps.apple.com/us/app/behavior-observation-boss/id1534801113"
               className={styles.cta}
             >
               <img src="img/get-on-app-store.png" alt="Download iOS version on App Store"/>
             </a>

             <a
                href="#"
               onClick={() => {alert('coming soon...'); return}}
               className={styles.cta}
             >
               <img src="img/get-on-google-play.png" alt="Download Android version on Google Play"/>
             </a>
          </div>

        </div>

        <div className={styles.grid}>

         <div className={styles.row}>
         <div className={styles.card}>
           <h3><small>Observe students,</small><br/>In Classroom</h3>
           <p>Observe students in the classroom, systematically. Track in-classroom behaviors easily and reliably.</p>
         <img src="/img/classroom.jpg" alt="Behavior Observation of Students in School"/>

         </div>

         <div className={styles.card}>
           <h3><small>Observe students,</small><br/>Virtually</h3>
           <p>Observe students virtually. Using the <b>Virtual</b> method, 
           enables features for evaluating student participation in a remote setting.</p>
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
    </Layout>
  )
}
