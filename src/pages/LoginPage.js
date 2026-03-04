import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "customer") navigate("/menu");
    if (role === "kitchen") navigate("/kitchen");
    if (role === "admin") navigate("/admin");
  };

  return (
    <div className="container">
      <h2>Login Page</h2>

      <div className="card">
        <label>Select Role</label>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="customer">Customer</option>
          <option value="kitchen">Kitchen</option>
          <option value="admin">Admin</option>
        </select>

        <br />
        <br />

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default LoginPage;