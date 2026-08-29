import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../api';
import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load tasks');
    }
  };

  useEffect(() => {
    loadTasks();
    const socket = io(window.location.origin, { path: '/socket.io' });
    socket.on('tasksChanged', loadTasks);
    return () => socket.disconnect();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await api.post('/tasks', { title, description });
      setTitle('');
      setDescription('');
      await loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create task');
    }
  };

  const toggle = async (task) => {
    await api.put(`/tasks/${task._id}`, { completed: !task.completed });
    await loadTasks();
  };

  const remove = async (id) => {
    await api.delete(`/tasks/${id}`);
    await loadTasks();
  };

  return (
    <main className="dashboard">
      <header>
        <div>
          <h1>My Tasks</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={logout}>Logout</button>
      </header>

      <form onSubmit={addTask} className="task-form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task title" />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" />
        <button>Add Task</button>
      </form>

      {error && <p className="error">{error}</p>}

      <section>
        {tasks.length === 0 ? <p>No tasks yet.</p> : tasks.map(task => (
          <article key={task._id} className={`task ${task.completed ? 'done' : ''}`}>
            <div>
              <h3>{task.title}</h3>
              {task.description && <p>{task.description}</p>}
            </div>
            <div className="actions">
              <button onClick={() => toggle(task)}>{task.completed ? 'Undo' : 'Done'}</button>
              <button onClick={() => remove(task._id)}>Delete</button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
