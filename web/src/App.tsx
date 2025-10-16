import { useEffect, useState } from "react";
import { ToDoEntry } from "../../shared/types/ToDoEntry.js";
import { DummyData } from "../../shared/dummyData/dummyData.js";

function App() {
  const [entries, setTodos] = useState<ToDoEntry[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/todo")
      .then(res => res.json())
      .then(setTodos);
  }, []);

  const addTodo = async () => {
    const res = await fetch("http://localhost:4000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo: ToDoEntry = await res.json();
    setTodos([...entries, newTodo]);
    setText("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>ToDo List</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {entries.map(t => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
