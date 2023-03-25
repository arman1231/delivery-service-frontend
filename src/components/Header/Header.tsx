import { GiPolarStar } from 'react-icons/gi';
import { FaUserCircle } from 'react-icons/fa'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className={styles.header}>
      <article className={styles.logo}>
        <NavLink to='/' className={styles.logoLink}>
          <GiPolarStar className={styles.logoIcon} />
          <span className={styles.orangeText}>D</span><span>elivery</span><span className={styles.orangeText}>S</span><span>ervice</span>
        </NavLink>
      </article>
      <nav>
        <ul className={styles.nav}>
          <li><NavLink to='/sign-up' className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}><FaUserCircle className={styles.navItemIcon} /> Sign up</NavLink></li>
          <li><NavLink to='/sign-in' className={({isActive}) => isActive ? `${styles.navItem} ${styles.active}` : styles.navItem}><BsFillArrowRightCircleFill className={styles.navItemIcon} /> Sign in</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header