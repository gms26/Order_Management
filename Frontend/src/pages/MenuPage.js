import { useEffect, useState } from "react";
import API from "../services/api";

function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

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
    } catch (err) {
      console.log(err);
      alert("Order Failed!");
    } finally {
      setPlacingOrder(false);
    }
  };

  // Helper to get image based on name (simulated)
  const getItemEmoji = (name) => {
    const lowered = name.toLowerCase();
    if (lowered.includes("pizza")) return "🍕";
    if (lowered.includes("burger")) return "🍔";
    if (lowered.includes("pasta")) return "🍝";
    if (lowered.includes("salad")) return "🥗";
    if (lowered.includes("coffee")) return "☕";
    if (lowered.includes("juice")) return "🍹";
    return "🍽️";
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Our Menu</h2>
        <div className="card">
          <h3 style={{ textAlign: "center" }}>Loading delicious options...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      <h2>Explore Our Menu</h2>

      <div className="grid-container">
        {menu.length === 0 ? (
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <h3 style={{ textAlign: "center" }}>No Menu Items Available</h3>
          </div>
        ) : (
          menu.map((item) => (
            <div key={item.id} className="card">
              <div style={{ fontSize: "3rem", marginBottom: "1rem", textAlign: "center" }}>
                {getItemEmoji(item.name)}
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                <p style={{ fontWeight: "600", color: "var(--primary)", marginTop: "0.25rem" }}>
                  ₹{item.price}
                </p>
              </div>

              <div className="flex" style={{ justifyContent: "flex-start", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <label>Quantity</label>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <button
                      onClick={() => handleQuantityChange(item.id, (cart[item.id] || 0) - 1)}
                      style={{ padding: "0.5rem", minWidth: "36px", background: "rgba(255,255,255,0.05)", boxShadow: "none" }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="0"
                      value={cart[item.id] || 0}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value) || 0)
                      }
                      style={{ textAlign: "center", width: "60px", padding: "0.5rem" }}
                    />
                    <button
                      onClick={() => handleQuantityChange(item.id, (cart[item.id] || 0) + 1)}
                      style={{ padding: "0.5rem", minWidth: "36px", background: "rgba(255,255,255,0.05)", boxShadow: "none" }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {menu.length > 0 && (
        <div className="card" style={{ marginTop: "3rem", borderTop: "2px solid var(--primary)", position: "sticky", bottom: "2rem" }}>
          <div className="flex">
            <div>
              <p style={{ textTransform: "uppercase", fontSize: "0.75rem", fontWeight: "700", letterSpacing: "0.05em" }}>Your Total</p>
              <h3 style={{ fontSize: "2rem", margin: 0 }}>₹{totalPrice}</h3>
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
  );
}

export default MenuPage;