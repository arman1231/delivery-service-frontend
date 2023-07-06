import styles from "./App.module.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Homepage from "../../pages/Homepage/Homepage";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import NotFound from "../../pages/NotFound/NotFound";
import Layout from "../Layout/Layout";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Profile from "../../pages/Profile/Profile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../../services/auth/slice";
import ProtectedRoute from "../../hocs/ProdectedRoute/ProtectedRoute";

function App() {
  const isAuthenticated = useSelector((state: any) => state.auth.user);
  const dispatch: any = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <div className={styles.page}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route
            path="/sign-in"
            element={
              isAuthenticated ? (
                <Navigate to={location?.state?.from?.pathname || "/dashboard"} />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="sign-up"
            element={
              isAuthenticated ? (
                <Navigate to={location?.state?.from?.pathname || "/"} />
              ) : (
                <Register />
              )
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
