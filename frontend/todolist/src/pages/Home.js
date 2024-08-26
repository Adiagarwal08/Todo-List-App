import { useState, useEffect } from "react";

import TodoList from "../components/TodoList.js";
import TodoItemForm from "../components/TodoItemForm.js";
import CustomPieChart from "../components/PieChart.js";

const Home = () => {
  const [todoitems, settooitems] = useState(null);
  const [minDatetime, setMinDatetime] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTodoItems = async () => {
      const response = await fetch("/api/todoitems");
      const json = await response.json();

      if (response.ok) {
        settooitems(json);
      }
    };

    fetchTodoItems();
  }, []);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const currentDatetime = `${year}-${month}-${day}T${hours}:${minutes}`;
    setMinDatetime(currentDatetime);
  }, []);

  useEffect(() => {
    const fetchStatusCount = async () => {
      const response = await fetch("/api/todoitems/count");
      const json = await response.json();

      if (response.ok) {
        setData(json);
      }
    };
    fetchStatusCount();
  }, [todoitems]);

  const handleDelete = (id) => {
    settooitems((prevTodoItems) =>
      prevTodoItems.filter((todoitem) => todoitem._id !== id)
    );
  };

  const addItem = (newItem) => {
    settooitems((todoitems) => [newItem, ...todoitems]);
  };

  const handleStatusUpdate = (updatedItem) => {
    settooitems((prev) =>
      prev.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );
  };

  return (
    <div className="home">
      <div className="todoitems">
        {todoitems &&
          todoitems.map((todoItem) => (
            <TodoList
              key={todoItem._id}
              todoItem={todoItem}
              onDelete={handleDelete}
              onStatusUpdate={handleStatusUpdate}
              currentDatetime={minDatetime}
            />
          ))}
      </div>
      <div>
        <TodoItemForm addItem={addItem} minDateTime={minDatetime} />
        <CustomPieChart data={data} />
      </div>
    </div>
  );
};

export default Home;
