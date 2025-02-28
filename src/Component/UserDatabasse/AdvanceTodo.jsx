import React, { useCallback, useEffect, useState } from "react";
import { useMemo } from "react";
const todoData = [
  {
    id: 1,
    label: "Normal",
    category: "normal",
  },
  {
    id: 2,
    label: "Done",
    category: "done",
  },
  {
    id: 3,
    label: "Progress",
    category: "progress",
  },
];

// function NormalTodo({ todos, handleFilterTodo }) {
//   console.log("normal Todo Called");
//   const normalTodos = useMemo(() => {
//     console.log("useMemo called inside normal");
//     return todos.filter((todo) => todo.category === "normal");
//   }, [todos]);
//   // const normalTodos =
//   return (
//     <div className=" border border-red-400 border-2px w-1/3">
//       <h1>Normal Todo</h1>
//       {normalTodos.map((todo) => {
//         return (
//           <h2 key={todo.id} onClick={() => handleFilterTodo(todo.id)}>
//             {todo.value}
//           </h2>
//         );
//       })}
//     </div>
//   );
// }

// function DoneTodos({ todos, handleFilterTodo }) {
//   console.log("Done  Todo Called");
//   const donelTodos = useMemo(() => {
//     console.log("useMemo called inside done");
//     return todos.filter((todo) => todo.category === "done");
//   }, [todos]);

//   return (
//     <div className=" border border-red-400 border-2px w-1/4 h-[757px]">
//       <h1>Done Todo</h1>
//       {todos &&
//         donelTodos.map((todo) => {
//           return (
//             <h2 key={todo.id} onClick={() => handleFilterTodo(todo.id)}>
//               {todo.value}
//             </h2>
//           );
//         })}
//     </div>
//   );
// }

// function ProgressTodos({ todos, handleFilterTodo }) {
//   console.log("progress  Todo Called");

//   const progressTodo = useMemo(() => {
//     console.log("useMemo called inside done");
//     return todos.filter((todo) => todo.category === "progress");
//   }, [todos]);

//   return (
//     <div className="border border-red-400 border-2px w-1/4 h-[757px]">
//       <h1>Progress</h1>
//       {todos &&
//         progressTodo.map((todo) => {
//           return (
//             <h2 key={todo.id} onClick={() => handleFilterTodo(todo.id)}>
//               {todo.value}
//             </h2>
//           );
//         })}
//     </div>
//   );
// }

function TodoList({
  todos,
  handleFilterTodo,
  title,
  handleEdit,
  isEdit,
  setIsEdit,
}) {
  return (
    <div className="border border-red-400 border-2px w-1/4 h-[757px]">
      <h1 className="text-emerald-50 text-2xl">{title} </h1>
      {todos &&
        todos.map((todo) => {
          return (
            <div key={todo.id}>
              <h2 onClick={() => handleFilterTodo(todo.id)}>{todo.value}</h2>
              <button
                onClick={() => handleEdit(todo.id)}
                className="p-3 w-40 border border-2px rounded-md"
              >
                Edit
              </button>
            </div>
          );
        })}
    </div>
  );
}

function AdvanceTodo() {
  const [selectValue, setSelectValue] = useState("done");
  const [data, seData] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    document.body.style.background = "black";
  }, []);

  const handleFilterTodo = useCallback(
    (id) => {
      const filterdTodo = data.filter((todo) => todo.id !== id);
      seData(filterdTodo);
    },
    [data]
  );

  function handlesubmitTodo(e) {
    e.preventDefault();
    seData((prevState) => [
      ...prevState,
      { id: Date.now(), value: todoValue, category: selectValue },
    ]);
    setTodoValue("");
  }

  const returnFilterData = useMemo(() => {
    return todoData.map((todo) => {
      return {
        ...todo,
        todos: data.filter((td) => td.category === todo.category),
      };
    });
  });

  function handleEdit(id) {
    // e.preventDefault();
    // setIsEdit(true);
    // const isIndex = data.findIndex((data) => data.id === id);
    // const newData = [...data];
    // const findData = newData[isIndex];
    // console.log(findData, "findData ");
    // if (isIndex <= -1) {
    //   alert("data not found");
    //   return;
    // }

    // setTodoValue(findData.value);
    // setSelectValue(findData.category);
    // setIsEdit(true);
    // setEditId(id);
    const findItem = data.find((data) => data.id === id);
    setTodoValue(findItem.value);
    setIsEdit(true);
    setEditId(id);
  }

  function saveTodoValue(e) {
    e.preventDefault();
    const newData = [...data];
    const findItem = newData.find((data) => data.id === editId);

    findItem["value"] = todoValue;
    findItem["category"] = selectValue;

    console.log(newData, "new Data");
    seData(newData);
    setIsEdit(false);
    setEditId(null);
    setTodoValue("");
  }

  return (
    <div className="text-white ">
      <h2>Advance Todo</h2>
      <form
        onSubmit={!isEdit ? handlesubmitTodo : saveTodoValue}
        className="border m-4 flex justify-center p-3"
      >
        <input
          type="text"
          name="todo"
          className=" p-3 text-black rounded-md w-full"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
        />
        <select
          onChange={(e) => setSelectValue(e.target.value)}
          defaultValue={"done"}
          className="text-black p-3 mx-4 rounded-md"
        >
          {todoData.map((data) => {
            return (
              <option value={data.category} key={data.id}>
                {data.label}
              </option>
            );
          })}
        </select>
        <button type="submit" className="p-3 w-40 border border-2px rounded-md">
          {!isEdit ? "Add Todo" : "save Todo"}
        </button>
      </form>
      <div className="flex gap-3 flex-wrap w-full border justify-between">
        {returnFilterData &&
          returnFilterData.map((data, i) => {
            return (
              <TodoList
                todos={data.todos}
                title={data.category}
                handleFilterTodo={handleFilterTodo}
                key={i}
                handleEdit={handleEdit}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />
            );
          })}

        {/* <NormalTodo todos={data} handleFilterTodo={handleFilterTodo} />
        <DoneTodos todos={data} handleFilterTodo={handleFilterTodo} />
        <ProgressTodos todos={data} handleFilterTodo={handleFilterTodo} /> */}
      </div>
    </div>
  );
}

export default AdvanceTodo;
