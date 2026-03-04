import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const getActiveStyle = (path) => {
    return location.pathname === path
      ? { background: "#2563eb", padding: "8px 14px", borderRadius: "10px" }
      : {};
  };

  return (
    <div className="navbar">
      <h2 className="logo">FoodApp</h2>

      <div className="nav-links">
        <Link className="nav-link" style={getActiveStyle("/")} to="/">
          Login
        </Link>
        <Link className="nav-link" style={getActiveStyle("/menu")} to="/menu">
          Menu
        </Link>
        <Link
          className="nav-link"
          style={getActiveStyle("/kitchen")}
          to="/kitchen"
        >
          Kitchen
        </Link>
        <Link
          className="nav-link"
          style={getActiveStyle("/admin")}
          to="/admin"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}

export default Navbar;