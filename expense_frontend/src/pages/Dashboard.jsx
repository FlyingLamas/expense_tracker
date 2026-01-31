import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAllExpenses = () => {
    navigate("/expenses");
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <button onClick={handleLogout}>Logout</button> */}
      <button onClick={logout}>Logout</button>
      <button onClick={handleAllExpenses}>Expenses</button>
    </div>
  );
}

export default Dashboard;
