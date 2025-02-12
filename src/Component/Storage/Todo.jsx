import { useState } from "react";

function Todo() {
  const localData = sessionStorage.getItem("todo")
    ? JSON.parse(sessionStorage.getItem("todo"))
    : [];
  const [todo, setTodo] = useState(localData);
  const [value, setValue] = useState("");
  // const [editValue, setEditValue] = useState("");
  function submitHandler(e) {
    e.preventDefault();
    if (!value) return;
    const newTodo = { title: value, id: Date.now() };
    setTodo((prevValue) => {
      const updatedTodo = [...prevValue, newTodo];
      sessionStorage.setItem("todo", JSON.stringify(updatedTodo));
      return updatedTodo;
    });
    setValue("");
  }
  function inputChangeHandler(e) {
    const value = e.target.value;
    setValue(value);
  }
  function removeHandler(id) {
    if (!id) return;
    const filterTodo = todo.filter((todo) => todo.id !== id);
    setTodo(filterTodo);
    sessionStorage.setItem("todo", JSON.stringify(filterTodo));
  }

  function editHandler(id) {
    const data = todo.find((todo) => todo.id === id);
    console.log(data);
    setValue(data.title);
    const updatedTodo = todo.map((todo) => {
      if (todo.id === id) {
        return { title: value, id: id };
      }
    });
    setTodo(updatedTodo);
  }
  return (
    <div>
      <form className="flex" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter you todo"
          className="p-1 w-full border border-black rounded-md"
          value={value}
          onChange={inputChangeHandler}
        />
        <button
          type="submit"
          className="p-2 m-1 border border-black
         w-24 rounded-md"
        >
          Add todo
        </button>
      </form>
      <div>
        <ul>
          {todo.map((todo, i) => {
            return (
              <div key={todo.id} className="flex justify-between">
                <li className="my-6 text-2xl">{todo.title}</li>
                <button
                  onClick={() => removeHandler(todo.id)}
                  className="p-2 m-1 border border-red-500
         w-24 rounded-md"
                >
                  Remove
                </button>
                <button
                  onClick={() => editHandler(todo.id, i)}
                  className="p-2 m-1 border border-red-500
         w-24 rounded-md"
                >
                  Edit
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
