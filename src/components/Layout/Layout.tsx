import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.css'

const Layout = () => {
    return (
        <>
            <Header />
            <main className={styles.content}>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </>
    )
}

export default Layout