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
    setCart({ ...cart, [id]: qty });
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

  if (loading) {
    return (
      <div className="container">
        <h2>Menu Page</h2>
        <div className="card">
          <h3>Loading menu...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Menu Page</h2>

      {menu.length === 0 ? (
        <div className="card">
          <h3>No Menu Items Available</h3>
        </div>
      ) : (
        menu.map((item) => (
          <div key={item.id} className="card">
            <div className="flex">
              <div>
                <h3>{item.name}</h3>
                <p>Price: ₹{item.price}</p>
              </div>

              <div>
                <label>Quantity</label>
                <input
                  type="number"
                  min="0"
                  value={cart[item.id] || 0}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
        ))
      )}

      <div className="card">
        <h3>Total Bill: ₹{totalPrice}</h3>
        <button onClick={placeOrder} disabled={placingOrder}>
          {placingOrder ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}

export default MenuPage;