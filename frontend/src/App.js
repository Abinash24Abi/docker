import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [editId, setEditId] = useState(null);

  const getData = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      setData(res.data);
    } catch (err) {
      toast.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    if (!title) return;

    try {
      if (editId) {
        await axios.put(`${API_URL}/tasks/${editId}`, { title });
        toast.success('Task updated');
      } else {
        await axios.post(`${API_URL}/tasks`, { title });
        toast.success('Task added');
      }

      setTitle('');
      setEditId(null);
      getData();
    } catch (err) {
      toast.error('Operation failed');
    }
  };

  const handleUpdate = (info) => {
    setEditId(info._id);
    setTitle(info.title);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      toast.success('Task deleted');
      getData();
    } catch (err) {
      toast.error('Error deleting task');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>To Do list</h1>

      <label>{editId ? 'Update' : 'Add'} Task</label>
      <br />

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={handleSubmit}>
        {editId ? 'Update' : 'Add'}
      </button>

      <hr />

      {data.map((info) => (
        <div key={info._id}>
          <h3>{info.title}</h3>
          <button onClick={() => handleUpdate(info)}>Edit</button>
          <button onClick={() => handleDelete(info._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
