import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="logo-container">
        <h2 className="logo">FoodApp</h2>
      </div>

      <div className="nav-links">
        <Link 
          className={`nav-link ${isActive("/") ? "active" : ""}`} 
          to="/"
        >
          Login
        </Link>
        <Link 
          className={`nav-link ${isActive("/menu") ? "active" : ""}`} 
          to="/menu"
        >
          Menu
        </Link>
        <Link
          className={`nav-link ${isActive("/kitchen") ? "active" : ""}`}
          to="/kitchen"
        >
          Kitchen
        </Link>
        <Link
          className={`nav-link ${isActive("/admin") ? "active" : ""}`}
          to="/admin"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;