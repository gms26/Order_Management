import { useEffect, useState } from "react";
import API from "../services/api";

function KitchenDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      const sorted = res.data.sort((a, b) => b.priorityScore - a.priorityScore);
      setOrders(sorted);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Status Update Failed!");
    }
  };

  const getStatusBadgeStyle = (status) => {
    const base = {
      padding: "0.25rem 0.75rem",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "700",
      textTransform: "uppercase"
    };

    if (status === "PENDING") return { ...base, background: "rgba(245, 158, 11, 0.1)", color: "#f59e0b", border: "1px solid rgba(245, 158, 11, 0.2)" };
    if (status === "COOKING") return { ...base, background: "rgba(99, 102, 241, 0.1)", color: "#818cf8", border: "1px solid rgba(99, 102, 241, 0.2)" };
    if (status === "READY") return { ...base, background: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.2)" };
    if (status === "DELIVERED") return { ...base, background: "rgba(148, 163, 184, 0.1)", color: "#94a3b8", border: "1px solid rgba(148, 163, 184, 0.2)" };
    return base;
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Kitchen Orders</h2>
        <div className="card">
          <h3 style={{ textAlign: "center" }}>Fetching active orders...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      <div className="flex" style={{ marginBottom: "2rem" }}>
        <h2>Kitchen Dashboard</h2>
        <div style={{ background: "rgba(255,255,255,0.05)", padding: "0.5rem 1rem", borderRadius: "0.75rem" }}>
          <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Live Updates Active</span>
        </div>
      </div>

      <div className="grid-container">
        {orders.length === 0 ? (
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <h3 style={{ textAlign: "center", color: "var(--text-muted)" }}>No Orders in Queue</h3>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="flex" style={{ marginBottom: "1rem" }}>
                  <h3 style={{ margin: 0 }}>Order #{order.id}</h3>
                  <span style={getStatusBadgeStyle(order.status)}>{order.status}</span>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ color: "var(--text-muted)" }}>Priority Score</span>
                    <span style={{ fontWeight: "700", color: order.priorityScore > 50 ? "var(--secondary)" : "var(--accent)" }}>
                      {order.priorityScore}
                    </span>
                  </div>
                  <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ width: `${Math.min(100, order.priorityScore)}%`, height: "100%", background: "var(--primary)" }}></div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <button
                  className="status-btn"
                  onClick={() => changeStatus(order.id, "COOKING")}
                  disabled={order.status === "COOKING" || order.status === "READY" || order.status === "DELIVERED"}
                  style={{ fontSize: "0.8rem", padding: "0.5rem" }}
                >
                  Cooking
                </button>

                <button
                  className="deliver-btn"
                  onClick={() => changeStatus(order.id, "READY")}
                  disabled={order.status === "READY" || order.status === "DELIVERED"}
                  style={{ fontSize: "0.8rem", padding: "0.5rem" }}
                >
                  Ready
                </button>

                <button
                  className="logout-btn"
                  onClick={() => changeStatus(order.id, "DELIVERED")}
                  disabled={order.status === "DELIVERED"}
                  style={{ gridColumn: "1 / -1", fontSize: "0.8rem", padding: "0.5rem" }}
                >
                  Mark Delivered
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default KitchenDashboard;