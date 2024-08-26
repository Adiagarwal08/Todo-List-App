import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState, useEffect } from "react";

const TodoList = ({ todoItem, onDelete, onStatusUpdate, currentDatetime }) => {
  const [item, setItem] = useState(todoItem);

  useEffect(() => {
    const checkAndUpdateStatus = async () => {
      if (
        item.status === "Ongoing" &&
        new Date(currentDatetime) > new Date(item.deadline)
      ) {
        const response = await fetch("/api/todoitems/" + item._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "Missed",
          }),
        });

        if (response.ok) {
          const json = await response.json();
          setItem({ ...item, status: "Missed" });
          onStatusUpdate(json);
        }
      }
    };

    checkAndUpdateStatus();
  }, [currentDatetime, item]);

  const handleClick = async () => {
    const response = await fetch("/api/todoitems/" + todoItem._id, {
      method: "DELETE",
    });

    const json = await response.json();

    if (response.ok) {
      onDelete(todoItem._id);
    }
  };

  const handleStatus = async () => {
    if (item.status === "Ongoing") {
      item.status = "Completed";
    } else if (item.status === "Missed") {
      item.status = "Completed";
    } else {
      item.status = "Ongoing";
    }
    const response = await fetch("/api/todoitems/" + todoItem._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: item.status,
      }),
    });
    setItem({
      ...item,
      status: item.status,
    });

    const json = await response.json();

    if (response.ok) {
      onStatusUpdate(json);
    }
  };

  return (
    <div className="TodoList-details">
      <h4>{item.title}</h4>
      <p className={item.status}>
        <strong>Status : </strong>
        {item.status}
      </p>
      <p>
        <strong>Deadline : </strong>
        {new Date(item.deadline).toLocaleString()}
      </p>

      <p>
        {formatDistanceToNow(new Date(todoItem.createdAt), { addSuffix: true })}
      </p>
      <div className="mark-as-complete">
        <input
          type="checkbox"
          onChange={handleStatus}
          checked={item.status === "Completed"}
        />
        <p>Mark as complete</p>
      </div>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default TodoList;
