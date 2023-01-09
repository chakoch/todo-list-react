import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const today = new Date();
  const [date, setDate] = useState(today.toISOString().substr(0, 10));
  const [selectCategory, setSelectCategory] = useState("");
  const [radioCategory, setRadioCategory] = useState("all");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos([...todos, { text, date, category: selectCategory }]);
    localStorage.setItem(
      "todos",
      JSON.stringify([...todos, { text, date, category: selectCategory }])
    );
    setText("");
    setDate(today.toISOString().substr(0, 10));
    setSelectCategory("");
  };

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter) {
      return todo.text.toLowerCase().includes(filter.toLowerCase());
    }
    if (radioCategory !== "all") {
      return todo.category === radioCategory;
    }
    return true;
  });

  const handleClear = () => {
    localStorage.clear();
    setTodos([]);
  };

  return (
    <div className="App">
      <h1>My Todo in React</h1>
      <form onSubmit={handleSubmit}>
        <label>Lägg till en todo:</label>
        <br />
        <input
          type="text"
          placeholder="Skriv todo"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <br /> <br />
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <select
          value={selectCategory}
          onChange={(event) => setSelectCategory(event.target.value)}
        >
          <option value="">Välj kategori</option>
          <option value="housework">Hushållsarbete</option>
          <option value="job">Jobb</option>
        </select>
        <br />
        <button type="submit">Lägg till</button>
      </form>
      <br />
      <input
        type="text"
        placeholder="Filter todos"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />

      <div>
        <br />
        <input
          type="radio"
          id="all"
          name="category"
          value="all"
          checked={radioCategory === "all"}
          onChange={(event) => setRadioCategory(event.target.value)}
        />
        <label htmlFor="all">Alla</label>
        <input
          type="radio"
          id="housework"
          name="category"
          value="housework"
          checked={radioCategory === "housework"}
          onChange={(event) => setRadioCategory(event.target.value)}
        />
        <label htmlFor="housework">Hushållsarbete</label>
        <input
          type="radio"
          id="job"
          name="category"
          value="job"
          checked={radioCategory === "job"}
          onChange={(event) => setRadioCategory(event.target.value)}
        />
        <label htmlFor="job">Jobb</label>
      </div>
      <ul>
        {filteredTodos.map((todo, index) => (
          <li key={index}>
            {todo.text} ({todo.date}) ({todo.category})
            {new Date(todo.date).getTime() < new Date().getTime() && <span className="warning">Datumet har passerat</span>}

            <button className="buttonDelete" onClick={() => handleDelete(index)}>Ta bort</button>
          </li>
        ))}
      </ul>
      <button onClick={handleClear}>Rensa listan</button>
    </div>
  );
}

export default App;
