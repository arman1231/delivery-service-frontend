import { GiPolarStar } from 'react-icons/gi';
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
        <article className={styles.logo}>
            <GiPolarStar className={styles.logoIcon} />
            <span className={styles.orangeText}>D</span><span>elivery</span><span className={styles.orangeText}>S</span><span>ervice</span>
        </article>
    </header>
  )
}

export default Header