import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await API.get("/menu");
      setMenu(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (id, qty) => {
    const newQty = Math.max(0, qty);
    if (newQty === 0) {
      const newCart = { ...cart };
      delete newCart[id];
      setCart(newCart);
    } else {
      setCart({ ...cart, [id]: newQty });
    }
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const totalPrice = menu.reduce((sum, item) => {
    const qty = cart[item.id] || 0;
    return sum + qty * item.price;
  }, 0);

  const placeOrder = async () => {
    const items = Object.keys(cart).map((id) => ({
      itemId: id,
      quantity: cart[id],
    }));

    if (items.length === 0) {
      alert("Please add items to your cart first!");
      return;
    }

    try {
      setPlacingOrder(true);
      await API.post("/orders", { items });
      alert("Order Placed Successfully!");
      setCart({});
      fetchMenu(); // Refresh menu to show updated stock
    } catch (err) {
      console.log(err);
      const errorMsg = err.response?.data?.message || "Order Failed!";
      alert(errorMsg);
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const getItemEmoji = (name) => {
    const lowered = name.toLowerCase();
    if (lowered.includes("pizza")) return "🍕";
    if (lowered.includes("burger")) return "🍔";
    if (lowered.includes("pasta") || lowered.includes("penne")) return "🍝";
    if (lowered.includes("salad")) return "🥗";
    if (lowered.includes("coffee")) return "☕";
    if (lowered.includes("juice") || lowered.includes("orange")) return "🍹";
    if (lowered.includes("shake") || lowered.includes("chocolate")) return "🥤";
    return "🍽️";
  };

  if (loading) {
    return (
      <>
        <nav className="navbar">
          <h1 className="logo">Smart Orders</h1>
          <div className="nav-links">
            <span className="nav-link active">Menu</span>
          </div>
        </nav>
        <div className="container">
          <h2>Our Menu</h2>
          <div className="card">
            <h3 style={{ textAlign: "center" }}>Loading delicious options...</h3>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <nav className="navbar">
        <h1 className="logo">Smart Orders</h1>
        <div className="nav-links">
          <Link to="/menu" className="nav-link active">Menu</Link>
          <Link to="/my-orders" className="nav-link">My Orders</Link>
          <button onClick={handleLogout} style={{ fontSize: "0.85rem", padding: "0.4rem 1rem", background: "#f1f5f9", color: "#64748b", boxShadow: "none", border: "1px solid #e2e8f0" }}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container animate-fade-in">
        <h2>Explore Our Menu</h2>

        <div className="grid-container">
          {menu.length === 0 ? (
            <div className="card" style={{ gridColumn: "1 / -1" }}>
              <h3 style={{ textAlign: "center" }}>No Menu Items Available</h3>
            </div>
          ) : (
            menu.map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <div key={item.id} className="card">
                  <div style={{ fontSize: "3rem", marginBottom: "1rem", textAlign: "center" }}>
                    {getItemEmoji(item.name)}
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <h3 style={{ margin: 0 }}>{item.name}</h3>
                    <p style={{ fontWeight: "600", color: "var(--primary)", marginTop: "0.25rem" }}>
                      ₹{item.price}
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "#94a3b8", margin: "0.25rem 0 0" }}>
                      {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <button
                      onClick={() => handleQuantityChange(item.id, qty - 1)}
                      disabled={qty === 0}
                      style={{ padding: "0.5rem", minWidth: "36px", background: "#f1f5f9", color: "var(--text-main)", boxShadow: "none" }}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={qty}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                      style={{ textAlign: "center", width: "60px", padding: "0.5rem" }}
                    />
                    <button
                      onClick={() => handleQuantityChange(item.id, qty + 1)}
                      disabled={item.stock <= 0}
                      style={{ padding: "0.5rem", minWidth: "36px", background: "#f1f5f9", color: "var(--text-main)", boxShadow: "none" }}
                    >
                      +
                    </button>
                    {qty > 0 && (
                      <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--primary)", marginLeft: "0.5rem" }}>
                        ₹{(qty * item.price).toFixed(0)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {menu.length > 0 && (
          <div className="card" style={{ marginTop: "3rem", borderTop: "2px solid var(--primary)", position: "sticky", bottom: "1rem" }}>
            <div className="flex">
              <div>
                <p style={{ textTransform: "uppercase", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.05em" }}>
                  {totalItems > 0 ? `${totalItems} item${totalItems > 1 ? "s" : ""} in cart` : "Your Cart"}
                </p>
                <h3 style={{ fontSize: "2rem", margin: 0 }}>₹{totalPrice.toFixed(0)}</h3>
              </div>
              <button
                onClick={placeOrder}
                disabled={placingOrder || totalPrice === 0}
                style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}
              >
                {placingOrder ? "Placing Order..." : "Place Order Now"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MenuPage;