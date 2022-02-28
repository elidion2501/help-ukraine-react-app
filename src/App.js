import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import SignUpPage from "./pages/Auth/SignUpPage";
import LogoutAction from "./components/Auth/LogoutAction";
import NotFoundPage from "./pages/NotFoundPage";
import Cars from "./pages/Cars";
import AddCarPage from "./pages/AddCarPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/have" element={<Cars />} />
        <Route path="/cars/need" element={<Cars />} />
        <Route path="/cars/border" element={<Cars />} />
        <Route path="/cars/have/create" element={<AddCarPage />} />
        <Route path="/cars/need/create" element={<AddCarPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/logout" element={<LogoutAction />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
