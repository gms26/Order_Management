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

  const getStatusStyle = (status) => {
    if (status === "PLACED") return { background: "#fef3c7", color: "#92400e" };
    if (status === "COOKING") return { background: "#e0e7ff", color: "#3730a3" };
    if (status === "READY") return { background: "#d1fae5", color: "#065f46" };
    if (status === "DELIVERED") return { background: "#f1f5f9", color: "#475569" };
    return { background: "#f1f5f9", color: "#64748b" };
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
        <h2 style={{ marginBottom: 0 }}>Kitchen Orders</h2>
        <span style={{ background: "#d1fae5", color: "#065f46", padding: "0.4rem 1rem", borderRadius: "0.5rem", fontSize: "0.8rem", fontWeight: "600" }}>
          ● Live
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="card">
          <h3 style={{ textAlign: "center", color: "var(--text-muted)" }}>No Orders in Queue</h3>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "1rem", textAlign: "left" }}>Order</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Status</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Priority</th>
                <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const statusStyle = getStatusStyle(order.status);
                return (
                  <tr key={order.id}>
                    <td style={{ padding: "1rem", fontWeight: "600" }}>#{order.id?.substring(0, 8)}</td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{
                        ...statusStyle,
                        padding: "0.25rem 0.75rem",
                        borderRadius: "0.375rem",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        textTransform: "uppercase"
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", fontWeight: "500" }}>{order.priorityScore?.toFixed(0)}</td>
                    <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                        <button
                          className="status-btn"
                          onClick={() => changeStatus(order.id, "COOKING")}
                          disabled={order.status !== "PLACED"}
                          style={{ fontSize: "0.75rem", padding: "0.35rem 0.75rem" }}
                        >
                          Cooking
                        </button>
                        <button
                          className="deliver-btn"
                          onClick={() => changeStatus(order.id, "READY")}
                          disabled={order.status !== "COOKING"}
                          style={{ fontSize: "0.75rem", padding: "0.35rem 0.75rem" }}
                        >
                          Ready
                        </button>
                        <button
                          onClick={() => changeStatus(order.id, "DELIVERED")}
                          disabled={order.status === "DELIVERED"}
                          style={{ fontSize: "0.75rem", padding: "0.35rem 0.75rem", background: order.status === "DELIVERED" ? "#e2e8f0" : "#6366f1" }}
                        >
                          Delivered
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default KitchenDashboard;