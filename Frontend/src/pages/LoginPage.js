import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function LoginPage() {
  const [role, setRole] = useState("customer");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (role === "customer") {
      localStorage.setItem("userRole", "customer");
      navigate("/menu");
      return;
    }

    if (!password) {
      setError("Password is required for this role");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post("/api/auth/login", { role, password });
      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("userRole", role);
        localStorage.setItem("isLoggedIn", "true");
        if (role === "kitchen") navigate("/kitchen");
        if (role === "admin") navigate("/admin");
      } else {
        setError(data.message || "Invalid password");
      }
    } catch (err) {
      setError("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="card login-card animate-fade-in">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Welcome Back</h2>
          <p style={{ color: "var(--text-muted)" }}>Please select your role to continue</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            color: "rgb(239, 68, 68)",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
            fontSize: "0.875rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "1.5rem" }}>
          <label>Select Role</label>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setError("");
              setPassword("");
            }}
            style={{ maxWidth: "100%" }}
          >
            <option value="customer">Customer</option>
            <option value="kitchen">Kitchen</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {(role === "kitchen" || role === "admin") && (
          <div style={{ marginBottom: "1.5rem" }} className="animate-fade-in">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{ width: "100%" }}
            />
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%", padding: "1rem" }}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;