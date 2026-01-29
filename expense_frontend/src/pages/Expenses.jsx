import { useEffect, useState } from "react";
import api from "../api/axios";

function Expenses() {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
  const fetchExpenses = async () => {
    try {
      const response = await api.get("expense/");
      setExpenses(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchExpenses();
}, []);

  return (
    <div>
      <h2>Expenses</h2>

      {expenses.map((expense) => (
        <p key={expense.id}>
          {expense.title} - {expense.amount}
        </p>
      ))}
    </div>
  );
}

export default Expenses;
