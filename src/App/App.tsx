import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.content}>
        <Main />
        <Footer />
      </div>
    </div>
  );
}

export default App;
