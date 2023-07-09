import { GiPolarStar } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/auth/slice";

const Header = () => {
  const isAuth = useSelector((state: any) => state.auth.user);
  const dispatch: any = useDispatch()
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user)
  
  const logoutFunc = () => {
    dispatch(logout())
    localStorage.clear()
    navigate('/')
  }

  const handleButtonClick = () => {
    logoutFunc();
  }
  return (
    <header className={styles.header}>
      <article className={styles.logo}>
        <NavLink to="/" className={styles.logoLink}>
          <GiPolarStar className={`${styles.logoIcon} ${styles.rotateIcon}`} />
          <span className={styles.orangeText}>D</span>
          <span>elivery</span>
          <span className={styles.orangeText}>S</span>
          <span>ervice</span>
        </NavLink>
      </article>
      {isAuth ? (
        <nav>
          <ul className={styles.nav}>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.active}`
                    : styles.navItem
                }
              >
                <FaUserCircle className={styles.navItemIcon} /> {!!user ? user.principal.name : 'Profile'}
              </NavLink>
            </li>
            <li>
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.active}`
                    : styles.navItem
                }
              >
                <button className={styles.orderBtn}>Dashboard</button>
              </NavLink>
            </li>
            <li>
              <button onClick={handleButtonClick} className={styles.logoutBtn}>Logout</button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className={styles.nav}>
            <li>
              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.active}`
                    : styles.navItem
                }
              >
                <FaUserCircle className={styles.navItemIcon} /> Sign up
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navItem} ${styles.active}`
                    : styles.navItem
                }
              >
                <BsFillArrowRightCircleFill className={styles.navItemIcon} />{" "}
                Sign in
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
