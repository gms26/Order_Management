import { useEffect, useState } from "react";
import API from "../services/api";

function KitchenDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

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
    if (status === "PENDING") return { color: "#f59e0b", fontWeight: "bold" };
    if (status === "COOKING") return { color: "#2563eb", fontWeight: "bold" };
    if (status === "READY") return { color: "#16a34a", fontWeight: "bold" };
    if (status === "DELIVERED") return { color: "#6b7280", fontWeight: "bold" };
    return { color: "black", fontWeight: "bold" };
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Kitchen Dashboard</h2>
        <div className="card">
          <h3>Loading orders...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Kitchen Dashboard</h2>

      {orders.length === 0 ? (
        <div className="card">
          <h3>No Orders Available</h3>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card">
            <h3>Order #{order.id}</h3>
            <p style={getStatusStyle(order.status)}>Status: {order.status}</p>
            <p>Priority Score: {order.priorityScore}</p>

            <div style={{ marginTop: "10px" }}>
              <button
                className="status-btn"
                onClick={() => changeStatus(order.id, "COOKING")}
              >
                Cooking
              </button>

              <button
                className="deliver-btn"
                onClick={() => changeStatus(order.id, "READY")}
              >
                Ready
              </button>

              <button
                className="logout-btn"
                onClick={() => changeStatus(order.id, "DELIVERED")}
              >
                Delivered
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default KitchenDashboard;