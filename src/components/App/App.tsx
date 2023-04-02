import styles from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from '../../pages/Homepage/Homepage';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import NotFound from '../../pages/NotFound/NotFound';
import Layout from '../Layout/Layout';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Profile from '../../pages/Profile/Profile';

function App() {
  return (
    <div className={styles.page}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='sign-in' element={<Login />} />
          <Route path='sign-up' element={<Register />} />
          <Route path='profile' element={<Profile />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
