import { useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Expenses() {

  const [expenses, setExpenses] = useState([]);
  // We have set the initial value to an empty array

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  // We are using string in amount as well, and not int.

  const { authTokens} = useContext(AuthContext);
  // We pull authTokens from AuthContext

  const { logout } = useContext(AuthContext);

  const handleAddExpense = async(event) => {
    event.preventDefault();
    try {
      const response = await api.post("expense/",
      {
        title: title,
        amount:amount,
      });

      setExpenses([response.data, ...expenses])
      // Here we are using the spread operator of JS
      // response.data is the data brand new expense data we created now by clicking on add expense.
      // ...expenses mean take all the exisitng data and unpack them here
      // [] - the square brackets creates a new array containing the new item first and then the old items

      // clearing inputs
      setTitle("");
      setAmount("");

      console.log("Expenese added!");
    } catch (error) {
      console.log("Error adding expense:", error);
    }
  };

  const handleDelete = async(id) => {
    // id is the unique identifier for the expense, without this server wouldn't know which specific expense to delete.
    try {
      await api.delete(`expense/${id}/`);
      setExpenses(expenses.filter((expense) => expense.id !== id));
      // Here expenses.filter creates a brand new array, we do not change the original array
      // The logic is, is the id same as deleted id, if no then add to the list and if yes kick it out.
      // setExpenses replaces the old list with a new list, because the state changed, react re renders and the deleted expenses vanishes instantly.

      console.log("Expense deleted successfully");
    } catch (error) {
      console.log("Error deleting expense:", error);
    }
  };

  useEffect(() => {
    // useEffect tells run this code after rendering or when the page appears.
    // We use useEffect to control when the code runs
  const fetchExpenses = async () => {
    try {
      const response = await api.get("expense/");

      console.log("API RESPONSE:", response.data);
      setExpenses(response.data.results);
          // We used results at the end because, response.data due to pagination will give dictionary object and not a list
          // We however expect list, because .map() only works on arrays, without we were getting only object and not list.
          // This apparently small problem took me an hour to debug. Phew 
    } catch (error) {
      console.log(error);
    }
  };
  
  if (authTokens) {
    fetchExpenses();
  }

  // Here we are calling the function, first we define it and then we call it.
}, [authTokens]);
// useEffect accepts two arguments. The second argument is optional.
// Without the empty array they component will run on every render
// We can write [user], it means render when user changes.
// In other words, when page loads run fetchExpenses once.

  return (
    <div>
      <h2>Expenses</h2>

      <button onClick={logout}>Logout</button>

      <form onSubmit={handleAddExpense}>
        <input 
          type="text"
          placeholder="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input 
          type="text"
          placeholder="amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        <button type="submit">Add Expense</button>
      </form>

      {expenses.map((expense) => (
        <p key={expense.id}>
          {expense.title} - {expense.amount}
          <button onClick={() => handleDelete(expense.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
}

export default Expenses;
