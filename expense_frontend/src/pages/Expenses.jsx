import { useCallback, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Expenses() {

  const [expenses, setExpenses] = useState([]);
  // We have set the initial value to an empty array

  const { authTokens} = useContext(AuthContext);
  // We pull authTokens from AuthContext

  useEffect(() => {
    // useEffect tells run this code after rendering or when the page appears.
    // We use useEffect to control when the code runs
  const fetchExpenses = async () => {
    try {
      const response = await api.get("expense/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      });

      console.log("API RESPONSE:", response.data);
      setExpenses(response.data.results);
          // We used results at the end because, response.data due to pagination will give dictionary object and not a list
          // We however expect list, because .map() only works on arrays, without we were getting only object and not list.
          // This apparently small problem took me an hour to debug. Phew 
    } catch (error) {
      console.log(error);
    }
  };
  
  fetchExpenses();

  // Here we are calling the function, first we define it and then we call it.
}, []);
// useEffect accepts two arguments. The second argument is optional.
// Without the empty array they component will run on every render
// We can write [user], it means render when user changes.
// In other words, when page loads run fetchExpenses once.

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
