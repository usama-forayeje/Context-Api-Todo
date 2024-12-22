import { useState } from "react";
import { useTodo } from "../contexts";
import { Edit3, Save, Trash, CheckSquare } from "lucide-react"; 

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { editTodo, removeTodo, toggleTodo } = useTodo();

  const updatedTodo = () => {
    editTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleTodo(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      {/* Checkbox to mark todo as completed */}
      <CheckSquare
        className={`cursor-pointer ${todo.completed ? "text-green-500" : "text-gray-500"}`}
        onClick={toggleCompleted}
      />
      {/* Input field to display or edit the todo */}
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable} // Makes input non-editable if not in edit mode
      />
      {/* Button to toggle between edit and save */}
      <button
        className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded-lg border-black/10 bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return; // Prevent editing completed todos
          if (isTodoEditable) {
            updatedTodo(); // Save changes
          } else {
            setIsTodoEditable((prev) => !prev); // Enter edit mode
          }
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? <Save size={16} /> : <Edit3 size={16} />}
      </button>
      {/* Button to delete the todo */}
      <button
        className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded-lg border-black/10 bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => removeTodo(todo.id)}
      >
        <Trash size={16} />
      </button>
    </div>
  );
}

export default TodoItem;
