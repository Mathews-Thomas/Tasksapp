import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [task, SetTask] = useState(''); // Task should be a string, not an array
  const [allTasks, SetAllTasks] = useState([]);

  const AddTask = (e) => {
    e.preventDefault();
    if (!task) {
      alert("Please enter a task");
      return;
    }
    axios
      .post("http://localhost:3001/api/addtask", { task })
      .then((res) => {
        console.log(res);
        alert("Task Added");
        SetTask(''); // Clear the input field after adding the task
        listAllTasks(); // Fetch updated tasks after adding a new one
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const listAllTasks = () => {
    axios
      .get("http://localhost:3001/api/listalltasks")
      .then((res) => {
        console.log(res.data.data);
        SetAllTasks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:3001/api/deletetask/${id}`)
      .then((res) => {
        console.log(res);
        alert("Task Deleted");
        listAllTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    listAllTasks();
  }, []);

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-10 px-5">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold uppercase text-blue-700 mb-8">Todo App</h1>
          </div>
          <form onSubmit={AddTask} className="mb-6">
            <div className="flex justify-center">
              <input
                className="w-full text-xl border-2 border-blue-300 p-4 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-2 rounded-md transition-all"
                type="text"
                placeholder="Enter a new task..."
                value={task}
                onChange={(e) => SetTask(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-600 transition-all"
              >
                Add Task
              </button>
            </div>
          </form>
          <div className="text-center mb-4">
            <h2 className="text-3xl font-semibold text-gray-700 uppercase">Tasks</h2>
          </div>
          <div className="space-y-4">
            {allTasks.length > 0 ? (
              allTasks.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-blue-100 p-4 rounded-md shadow-sm"
                >
                  <h1 className="text-lg font-medium text-gray-800">{item.task}</h1>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all"
                    onClick={() => deleteTask(item._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No tasks available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
