import { useState } from "react";
const TodoItemForm = ({ addItem, minDateTime }) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todoItem = { title, deadline };

    const response = await fetch("/api/todoitems", {
      method: "POST",
      body: JSON.stringify(todoItem),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      addItem(json);
      setTitle("");
      setDeadline("");
      setError(null);
      setEmptyFields([]);
      console.log("new item added", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Task</h3>

      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Deadline:</label>
      <input
        type="datetime-local"
        onChange={(e) => setDeadline(e.target.value)}
        value={deadline}
        min={minDateTime}
        className={emptyFields.includes("deadline") ? "error" : ""}
      />

      <button>Add item</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TodoItemForm;
