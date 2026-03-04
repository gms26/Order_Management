import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [data, setData] = useState({
    totalRevenue: 0,
    pendingOrders: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/admin/analytics");
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Admin Dashboard</h2>
        <div className="card">
          <h3>Loading analytics...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      <div className="card">
        <h3>Total Revenue: ₹{data.totalRevenue}</h3>
        <h3>Pending Orders: {data.pendingOrders}</h3>
      </div>
    </div>
  );
}

export default AdminDashboard;