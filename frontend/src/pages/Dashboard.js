import API from "../api/axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks").then(res => setTasks(res.data));
  }, []);

  const createTask = (data) => API.post("/tasks", data);
  const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
  const deleteTask = (id) => API.delete(`/tasks/${id}`);
  

};

export default Dashboard;
