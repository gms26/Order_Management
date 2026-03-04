import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        navigate("/");
    };

    const getStatusStyle = (status) => {
        if (status === "PLACED") return { background: "#fef3c7", color: "#92400e" };
        if (status === "COOKING") return { background: "#e0e7ff", color: "#3730a3" };
        if (status === "READY") return { background: "#d1fae5", color: "#065f46" };
        if (status === "DELIVERED") return { background: "#f1f5f9", color: "#475569" };
        return { background: "#f1f5f9", color: "#64748b" };
    };

    const getStatusLabel = (status) => {
        if (status === "PLACED") return "🕐 Order Placed";
        if (status === "COOKING") return "🍳 Being Prepared";
        if (status === "READY") return "✅ Ready for Pickup";
        if (status === "DELIVERED") return "📦 Delivered";
        return status;
    };

    return (
        <>
            <nav className="navbar">
                <h1 className="logo">Smart Orders</h1>
                <div className="nav-links">
                    <Link to="/menu" className="nav-link">Menu</Link>
                    <Link to="/my-orders" className="nav-link active">My Orders</Link>
                    <button onClick={handleLogout} style={{ fontSize: "0.85rem", padding: "0.4rem 1rem", background: "#f1f5f9", color: "#64748b", boxShadow: "none", border: "1px solid #e2e8f0" }}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container animate-fade-in">
                <h2>My Orders</h2>

                <div style={{ textAlign: "right", marginBottom: "1.5rem" }}>
                    <button
                        onClick={fetchOrders}
                        style={{ fontSize: "0.85rem", padding: "0.5rem 1rem", background: "#f1f5f9", color: "var(--text-main)", boxShadow: "none", border: "1px solid #e2e8f0" }}
                    >
                        🔄 Refresh
                    </button>
                </div>

                {loading ? (
                    <div className="card">
                        <h3 style={{ textAlign: "center" }}>Loading your orders...</h3>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="card">
                        <h3 style={{ textAlign: "center", color: "var(--text-muted)" }}>No orders yet</h3>
                        <p style={{ textAlign: "center", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                            Browse the <Link to="/menu" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}>menu</Link> to place your first order!
                        </p>
                    </div>
                ) : (
                    <div className="grid-container">
                        {orders.map((order) => {
                            const statusStyle = getStatusStyle(order.status);
                            return (
                                <div key={order.id} className="card">
                                    <div className="flex" style={{ marginBottom: "1rem" }}>
                                        <h3 style={{ margin: 0, fontSize: "1rem" }}>
                                            Order #{order.id?.substring(0, 8)}
                                        </h3>
                                        <span
                                            style={{
                                                ...statusStyle,
                                                padding: "0.3rem 0.75rem",
                                                borderRadius: "0.375rem",
                                                fontSize: "0.75rem",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {order.status}
                                        </span>
                                    </div>

                                    <p style={{ fontSize: "1rem", marginBottom: "0.75rem" }}>
                                        {getStatusLabel(order.status)}
                                    </p>

                                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "0.75rem", borderTop: "1px solid #f1f5f9" }}>
                                        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                                            {new Date(order.createdAt).toLocaleString()}
                                        </span>
                                        <span style={{ fontWeight: "700", color: "var(--primary)" }}>
                                            ₹{order.totalPrice?.toFixed(0)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default MyOrdersPage;
