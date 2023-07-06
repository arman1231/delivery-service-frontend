import { Link } from 'react-router-dom'
import PageTitle from '../../components/PageTitle/PageTitle'
import styles from './Homepage.module.css'

const Homepage = () => {
  return (
    <section className={styles.homepage}>
      <PageTitle>Welcome to Delivery Service Homepage!</PageTitle>
      <p>
        Here you can manage your deliveries fast and secure. "Delivery Service" is another level product. We can provide you with many usefull services and features that could be very helpful doing your everyday routine.
      </p>
      <p>Please be patient and proceed to <Link className={styles.textLink} to='sign-up'>register</Link> or <Link className={styles.textLink} to='sign-in'>sign-in</Link> using an existing account.</p>
      <p>Visit <Link className={styles.textLink} to='dashboard'>dashboard</Link> if you already signed in.</p>
    </section>
  )
}

export default Homepage