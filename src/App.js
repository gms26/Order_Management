import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import KitchenDashboard from "./pages/KitchenDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/kitchen" element={<KitchenDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;