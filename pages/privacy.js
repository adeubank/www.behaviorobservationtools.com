import Layout from "./layout";
import styles from "../styles/Home.module.css";

export default function Privacy() {
	return (
		<Layout>
			<div className={styles.grid}>
				<div className={styles.code}>
					<h2>Privacy Policy</h2>

					<p>Last updated 01/19/2023.</p>

					<p>
						Your privacy is important to us. It is Allen Eubank Technology's
						policy to respect your privacy regarding any information we may
						collect from you through our app, Behavior Observation: BOSS.
					</p>

					<h3>Types of Data We Collect</h3>

					<p>
						We use the following data for app functionality and usage analytics.
					</p>

					<ul>
						<li>Product Interaction</li>
						<li>Other Usage Data</li>
						<li>Crash Data</li>
						<li>Performance Data</li>
						<li>Other Diagnostic Data</li>
					</ul>

					<p>
						Student, school, and observation session data is only transferred
						off the device in the event of an app crash to aid in
						troubleshooting app usage issues and as necessary to provide you
						with your requested service. This information is not used for any
						other purpose. This data is never retained for more than 14 days and
						can be deleted on request.
					</p>

					<h3>Personal Information</h3>
					<p>
						We only ask for personal information when we truly need it to
						provide a service to you. We collect it by fair and lawful means,
						with your knowledge and consent. We also let you know why we’re
						collecting it and how it will be used.
					</p>

					<p>
						We only retain collected information for as long as necessary to
						provide you with your requested service. What data we store, we’ll
						protect within commercially acceptable means to prevent loss and
						theft, as well as unauthorized access, disclosure, copying, use or
						modification.
					</p>

					<p>
						We don’t share any personally identifying information publicly or
						with third-parties, except when required to by law.
					</p>

					<p>
						You are free to refuse our request for your personal information,
						with the understanding that we may be unable to provide you with
						some of your desired services.
					</p>

					<h3>Data Retention & Deletion</h3>

					<p>
						Crash data is retained only for 14 days or as long as needed to
						resolve app usage issues. Other data may retained in a
						non-personally identifiable format to provide us with usage
						analytics.
					</p>

					<p>
						You may request deletion of the data we have collected by notifying
						us at behaviorobservationtools@gmail.com. Users of the app are
						custodians of their device and the app data storage within the
						device. We are not responsible for data loss on a device for any
						reason. Parents can request deletion of student data by notifying
						users of our app and by emailing us at
						behaviorobservationtools@gmail.com.
					</p>

					<h3>Data Security and Confidentiality</h3>

					<p>
						To ensure data security and confidentiality, we follow the{" "}
						<a
							target="_blank"
							href="https://studentprivacy.ed.gov/sites/default/files/resource_document/file/checklist_data_breach_response_092012_0.pdf"
							rel="nofollow"
						>
							Data Breach Response Checklist (PTAC-CL, Sep 2012) provided by the
							Privacy Techinical Assistance Center
						</a>
						<a href="1">
							<sup>1</sup>
						</a>
						.
					</p>

					<p>
						Each release of the app is audited for data security and integrity.
						We continously monitor for personally indentifiable information and
						other sensitive data leakage and loss. In the event a data breach
						becomes known to you, please notify us immediately at
						behaviorobservationtools@gmail.com.
					</p>

					<p>
						Your continued use of our app will be regarded as acceptance of our
						practices around privacy and personal information. If you have any
						questions about how we handle user data and personal information,
						feel free to contact us.
					</p>

					<p>This policy is effective as of 26 October 2021.</p>

					<footer style={{ fontSize: "0.6rem" }}>
						<ol>
							<li id="1">
								<small>
									PTAC-CL, Sep 2012{" "}
									<a
										target="_blank"
										href="https://studentprivacy.ed.gov/sites/default/files/resource_document/file/checklist_data_breach_response_092012_0.pdf"
										rel="nofollow"
									>
										https://studentprivacy.ed.gov/sites/default/files/resource_document/file/checklist_data_breach_response_092012_0.pdf
									</a>
								</small>
							</li>
						</ol>
					</footer>
				</div>
			</div>
		</Layout>
	);
}
