import Layout from './layout'
import styles from '../styles/Home.module.css'

export default function HowItWorks() {
  return <Layout>
  <div className={styles.grid}>
    <div className={[styles.card , styles.active].join(' ')}>
      <h1>How It Works</h1>

       <h2>Behavior Observation of Students in School (BOSS)</h2>

      <h3>Momentary Time Sampling: Engaged Behaviors</h3>
      <p>At the end of the each interval, tap whether the student is passively engaged in the task or actively engaged in the task. <em>If the student <b>is not</b> engaged in the task at all, do not tap either of those options.</em></p>

      <h4>Actively Engaged in Task</h4>
      <p>Student is writing, raising their hand, answering/asking questions (to the teacher or, if participating in group work, other students), turning a page, or reading (silently or aloud).</p>
      <h4>Passively Engaged in Task</h4>
      <p>Student has their body and eye gaze oriented toward the speaker or task.</p>

      <br/>

      <h3>Partial Interval Recording: Non-Engaged Behaviors</h3>

      <p>If at <b>ANY</b> moment during the interval, the student performs any
      of the following behaviors, tap the corresponding behavior accordingly.
      A student can engage in none, one, or more than one in a given interval.</p>
      <br/>
      <p>For example, if a student looks away from the speaker for more than 10
      seconds, and then performs self-stimulation behavior, the observer would
      tap both the <b>Passive</b> and the <b>Motor</b> buttons. </p>
      <br />
      <table>
        <thead>
          <tr>
            <th width="33%">Non-Engaged Behavior</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Passive</td>
            <td>Student looks away for at least 10 seconds. </td>
          </tr>
          <tr>
            <td>Verbal</td>
            <td>Student speaks to anyone who is not the designated speaker or speaks out of turn. This includes verbal self-stimulation behavior. </td>
          </tr>
          <tr>
            <td>Motor</td>
            <td>Student engages in any motor behavior that is not related to the task for at least 3 seconds. </td>
          </tr>
        </tbody>
      </table>

      <br/>
      <p>We hope you enjoy using the BOSS app. Please leave us a review and if you have any questions or concerns, please visit our <a href="/contact" className={styles.underline}>contact page and drop us a line!</a></p>

      <br/>
      <h5><em>Happy Tracking! Vennesa and Allen from the BOSS app team ❤️</em></h5>
    </div>
  </div>
</Layout>
}
