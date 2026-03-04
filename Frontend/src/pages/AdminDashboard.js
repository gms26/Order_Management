import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({ totalRevenue: 0, pendingOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ordersRes, analyticsRes] = await Promise.all([
        API.get("/orders"),
        API.get("/admin/analytics"),
      ]);
      setOrders(ordersRes.data);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "PLACED") return "#f59e0b";
    if (status === "COOKING") return "#818cf8";
    if (status === "READY") return "#10b981";
    if (status === "DELIVERED") return "#94a3b8";
    return "#64748b";
  };

  const stats = [
    { label: "Total Revenue", value: `₹${(analytics.totalRevenue || 0).toFixed(2)}`, color: "#10b981" },
    { label: "Total Orders", value: orders.length, color: "#6366f1" },
    { label: "Pending Orders", value: analytics.pendingOrders || 0, color: "#f59e0b" },
    { label: "Delivered", value: orders.filter(o => o.status === "DELIVERED").length, color: "#06b6d4" },
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
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2rem" }}>
        <h2 style={{ margin: 0, textAlign: "left" }}>Admin Dashboard</h2>
        <button onClick={fetchData} style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
          Refresh
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {stats.map((stat, i) => (
          <div key={i} className="card" style={{ margin: 0, animation: "none", transform: "none", boxShadow: "none", border: "1px solid #ddd" }}>
            <p style={{ fontSize: "0.8rem", color: "#666", marginBottom: "0.25rem" }}>{stat.label}</p>
            <h3 style={{ fontSize: "1.5rem", margin: 0 }}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="card" style={{ animation: "none", transform: "none", boxShadow: "none", border: "1px solid #ddd" }}>
        <h3 style={{ marginBottom: "1rem" }}>Order History</h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: "0.75rem", textAlign: "left", fontSize: "0.85rem" }}>ID</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontSize: "0.85rem" }}>Status</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontSize: "0.85rem" }}>Price</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontSize: "0.85rem" }}>Priority</th>
              <th style={{ padding: "0.75rem", textAlign: "left", fontSize: "0.85rem" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: "1.5rem", textAlign: "center" }}>No orders found</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.75rem" }}>#{order.id?.substring(0, 8)}</td>
                  <td style={{ padding: "0.75rem" }}> {order.status} </td>
                  <td style={{ padding: "0.75rem" }}>₹{order.totalPrice?.toFixed(2)}</td>
                  <td style={{ padding: "0.75rem" }}>{order.priorityScore?.toFixed(0)}</td>
                  <td style={{ padding: "0.75rem", color: "#666", fontSize: "0.85rem" }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;