import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "PENDING") return "#f59e0b";
    if (status === "COOKING") return "#818cf8";
    if (status === "READY") return "#10b981";
    if (status === "DELIVERED") return "#94a3b8";
    return "#fff";
  };

  const stats = [
    { label: "Total Orders", value: orders.length, color: "var(--primary)" },
    { label: "Pending", value: orders.filter(o => o.status === "PENDING").length, color: "#f59e0b" },
    { label: "Delivered", value: orders.filter(o => o.status === "DELIVERED").length, color: "#10b981" },
  ];

  if (loading) {
    return (
      <div className="container">
        <h2>Admin Overview</h2>
        <div className="card">
          <h3 style={{ textAlign: "center" }}>Loading system statistics...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      <h2>Admin Dashboard</h2>

      <div className="grid-container" style={{ marginBottom: "3rem" }}>
        {stats.map((stat, i) => (
          <div key={i} className="card" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <p style={{ textTransform: "uppercase", fontSize: "0.75rem", fontWeight: "700", opacity: 0.6 }}>{stat.label}</p>
            <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0" }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="flex" style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ margin: 0 }}>Order History</h3>
          <button onClick={fetchOrders} style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", background: "rgba(255,255,255,0.05)", color: "var(--text-main)", boxShadow: "none" }}>
            Refresh Data
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <th style={{ padding: "1rem", color: "var(--text-muted)", fontWeight: "600" }}>Order ID</th>
                <th style={{ padding: "1rem", color: "var(--text-muted)", fontWeight: "600" }}>Status</th>
                <th style={{ padding: "1rem", color: "var(--text-muted)", fontWeight: "600" }}>Priority</th>
                <th style={{ padding: "1rem", color: "var(--text-muted)", fontWeight: "600" }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>No order records found</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "1rem", fontWeight: "600" }}>#{order.id}</td>
                    <td style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: getStatusColor(order.status) }}></div>
                        {order.status}
                      </div>
                    </td>
                    <td style={{ padding: "1rem" }}>{order.priorityScore}</td>
                    <td style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.875rem" }}>
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;