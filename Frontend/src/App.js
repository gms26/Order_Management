import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import KitchenDashboard from "./pages/KitchenDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route
          path="/kitchen"
          element={
            <ProtectedRoute allowedRoles={["kitchen"]}>
              <KitchenDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;