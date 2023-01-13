import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // State variabel för att spara lista över todos
  const [todos, setTodos] = useState([]);

  // State variabel för att spara texten av nya todos
  const [text, setText] = useState("");
  // State variabel för att spara dagens datum
  const today = new Date();
  const [date, setDate] = useState(today.toISOString().substr(0, 10));

  // State variabel för kategori
  const [selectCategory, setSelectCategory] = useState("");

  // State variabel för radio knappar
  const [radioCategory, setRadioCategory] = useState("all");

  // State variabel för filter funktion
  const [filter, setFilter] = useState("");

  // useEffect hook för att söka fram lagrade todos lokalt och sedan ladda upp dem
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Event handler för att lägga in todos
  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos([...todos, { text, date, category: selectCategory }]);
    // Sparar nya todos lokalt
    localStorage.setItem(
      "todos",
      JSON.stringify([...todos, { text, date, category: selectCategory }])
    );
    setText("");
    setDate(today.toISOString().substr(0, 10));
    setSelectCategory("");
  };

  // Event handler för ta bort kanppen
  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  //Filterfunktion 
  const filteredTodos = todos.filter((todo) => {
    if (filter) {
      return todo.text.toLowerCase().includes(filter.toLowerCase());
    }
    if (radioCategory !== "all") {
      return todo.category === radioCategory;
    }
    return true;
  });

  //Event handler för att rensa alla todos och tar bort dom lokalt
  const handleClear = () => {
    localStorage.clear();
    setTodos([]);
  };

  const todoClasses = (date) => {
    let classes = "";
    if(date < today.toISOString().substr(0, 10)){
        classes += " old-todo";
    }
    return classes;
};


  return (
    <div className="App">
      <h1>My Todo in React</h1>
      <form onSubmit={handleSubmit}>
        <label>Lägg till en todo:</label>
        <br />
        <input className="writeTodo"
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
      <label>Filtrera todo:</label>
      <input
        className="filter"
        type="text"
        placeholder="Filtrera"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />

      <div className="radio-btns">
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
          <li className={todoClasses(todo.date)} key={index}>
            {todo.text} ({todo.date}) {todo.category}
            <button type="button" className="delete-btn" onClick={() => handleDelete(index)}>Ta bort</button>
          </li>

        ))}
      </ul>
      <button className="buttonClear" onClick={handleClear}>Rensa alla Todo</button>
    </div>
  );
}

export default App;