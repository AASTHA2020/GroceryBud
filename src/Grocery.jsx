import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Grocery() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  // This function handles the form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Check if the input field is empty after trimming whitespace
    if (inputValue.trim() === "") {
      toast.error("Please fill in the input field🙃", { autoClose: 2000 });
      return;
    }

    // Create a new task object with a unique ID and the task description
    const newTask = {
      task: inputValue,
      id: Date.now(),
    };

    // Add the new task to the tasks array and reset the input field
    setTasks([...tasks, newTask]);
    setInputValue("");

    toast.success("Item added to your list🥳", { autoClose: 2000 });
  }

  //completion status
  function handleCompleted(idToComplete) {
    // Check if the task is already marked as completed
    if (completedTask.includes(idToComplete)) {
      setCompletedTask(completedTask.filter((id) => id !== idToComplete));
      toast.info("Item marked as incomplete☹️", { autoClose: 2000 });
    } else {
      setCompletedTask([...completedTask, idToComplete]);
      toast.success("Item marked as complete😊", { autoClose: 2000 });
    }
  }

  // Save tasks to local storage whenever the tasks array changes

  useEffect(() => {

    if (tasks.length > 0) {
        
      // Convert tasks array to a string and save it in local storage

      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);
   //The dependency array tells React when to run the effect function. In this case, the effect function runs whenever the tasks state changes. React compares the current tasks state to its previous value, and if it detects a change, it runs the effect function.

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if(storedTasks){
        setTasks(storedTasks);
    }
  }, []);

  return(
    <>
      <div className="container">
        <div className="groceryContainer">

            <form onSubmit={handleSubmit}>
                <h1>Grocery Bud 🛍️</h1>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button>Add Items</button>
            </form>

            <ul className='groceryList'>
                        {tasks.map((item) => (
                            <li key={item.id}>
                                <div className='listname' style={{ textDecoration: completedTask.includes(item.id) ? "line-through" : "none" }}>
                                    <input type="checkbox" onClick={() => handleCompleted(item.id)} />
                                    {item.task}
                                </div>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <ToastContainer position="top-center"/>
    </>
  );
  
}

export default Grocery;
