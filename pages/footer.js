import styles from '../styles/Home.module.css'

export default function Footer() {
  return <footer className={styles.footer}>
        <a
          href="/"
        >
          Behavior Observation: BOSS
        </a>
        |
        <a
          href="/privacy"
        >
          Privacy Policy
        </a>
        |
        <a
          href="/terms"
        >
          Terms
        </a>
      </footer>
}