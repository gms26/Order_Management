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
    <div className="login-screen">
      <div className="card login-card animate-fade-in">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Welcome Back</h2>
          <p style={{ color: "var(--text-muted)" }}>Please select your role to continue</p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label>Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ maxWidth: "100%" }}
          >
            <option value="customer">Customer</option>
            <option value="kitchen">Kitchen</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          onClick={handleLogin}
          style={{ width: "100%", padding: "1rem" }}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default LoginPage;