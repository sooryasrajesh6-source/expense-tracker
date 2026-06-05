
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedData = localStorage.getItem("transactions");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();

    if (text.trim() === "" || amount === "") {
      alert("Please enter description and amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      text,
      amount: Number(amount),
      type,
    };

    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
    setType("income");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const balance = income - expense;

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      <div className="balance-card">
        <h2>Current Balance</h2>
        <h3>₹{balance}</h3>
      </div>

      <div className="summary">
        <div className="income">
          <h3>Income</h3>
          <p>₹{income}</p>
        </div>

        <div className="expense">
          <h3>Expense</h3>
          <p>₹{expense}</p>
        </div>
      </div>

      <form onSubmit={addTransaction} className="form">
        <input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button type="submit">Add Transaction</button>
      </form>

      <h2 className="history-title">Transaction History</h2>

      <ul className="history">
        {transactions.length === 0 ? (
          <p className="empty">No transactions added yet</p>
        ) : (
          transactions.map((item) => (
            <li key={item.id} className={item.type}>
              <span>{item.text}</span>
              <strong>
                {item.type === "income" ? "+" : "-"}₹{item.amount}
              </strong>
              <button onClick={() => deleteTransaction(item.id)}>X</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
