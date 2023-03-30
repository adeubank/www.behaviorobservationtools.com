import Layout from "./layout";
import styles from "../styles/Home.module.css";
import Head from "next/head";

export default function HowItWorks() {
  return (
    <Layout>
      <Head>
        <title>
          How It Works - Behavior Observation of Students in School (BOSS)
        </title>
      </Head>
      <div className={styles.grid}>
        <div className={[styles.card, styles.active].join(" ")}>
          <h1>
            How It Works - Behavior Observation of Students in School (BOSS)
          </h1>

          <p>
            The BOSS tool is designed to facilitate the observation and
            recording of student behavior in a classroom setting. Observations
            are conducted in intervals, and data is collected regarding
            students' engagement in tasks, as well as specific non-engaged
            behaviors. The tool also allows for peer comparison by tracking
            behavior data for a peer at specified intervals.
          </p>

          <h3>Peer Comparison</h3>

          <p>
            During an observation, every 5th interval is designated for tracking
            behavior data for a peer. To begin, select one peer at the corner of
            the room or desk, and then move to the next peer each time the peer
            screen appears. This process ensures that data is collected for
            multiple peers within a single observation. Alternatively, if you
            prefer to focus on the same peer for the entire observation, you can
            choose to record data for that specific peer each time the peer
            screen appears.
          </p>

          <h3>Momentary Time Sampling: Engaged Behaviors</h3>

          <p>
            Momentary time sampling is used to assess student engagement in
            tasks at the end of each interval. There are two levels of
            engagement to consider:
          </p>

          <h4>Actively Engaged in Task</h4>
          <p>Indicators of active engagement include:</p>
          <ul>
            <li>Writing</li>
            <li>Raising their hand</li>
            <li>
              Answering/asking questions (to the teacher or other students
              during group work)
            </li>
            <li>Turning a page</li>
            <li>Reading (silently or aloud)</li>
          </ul>

          <h4>Passively Engaged in Task</h4>
          <p>Indicators of passive engagement include:</p>
          <ul>
            <li>Body and eye gaze oriented toward the speaker or task</li>
          </ul>

          <p>
            If the student is not engaged in the task at all, do not select
            either of the engagement options.
          </p>

          <h3>Partial Interval Recording: Non-Engaged Behaviors</h3>

          <p>
            Partial interval recording is used to capture instances of specific
            non-engaged behaviors during each interval. If a student engages in
            any of the following behaviors at any moment during the interval,
            record the corresponding behavior:
          </p>

          <ul>
            <li>
              Passive: Student looks away from the speaker or task for at least
              10 seconds
            </li>
            <li>
              Verbal: Student speaks to anyone other than the designated speaker
              or speaks out of turn (includes verbal self-stimulation behavior)
            </li>
            <li>
              Motor: Student engages in any motor behavior unrelated to the task
              for at least 3 seconds
            </li>
          </ul>

          <p>
            A student may exhibit none, one, or multiple non-engaged behaviors
            during a given interval.
          </p>

          <p>
            We hope you find the BOSS tool helpful for observing and tracking
            student behavior in the classroom. If you have any questions or
            feedback, please visit our{" "}
            <a href="https://www.behaviorobservationtools.com/contact">
              contact page
            </a>{" "}
            and drop us a line!
          </p>

          <p>
            Happy Tracking!
            <br />
            Vennesa and Allen from the BOSS app team ❤️
          </p>
        </div>
      </div>
    </Layout>
  );
}
