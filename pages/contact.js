import Layout from './layout'
import styles from '../styles/Home.module.css'

export default function Contact() {
  return <Layout>
  <div className={styles.grid}>
  <div className={styles.code}>
  <h2>Contact</h2>
  <p>Send us an email by clicking the button below,
    and we will get back to you as soon as we can.
  </p>
<br/>
  <h3>
  <a className={styles.button} href="mailto:behaviorobservationtools@gmail.com">behaviorobservationtools@gmail.com</a>
  </h3>
  </div>
  </div>
  </Layout>
}
