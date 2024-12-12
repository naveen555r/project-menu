
import React, { useState } from 'react';
import { addMenu } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddMenuPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMenu = { name, description };
    await addMenu(newMenu);
    navigate('/');
  };

  return (
    <div>
      <h1>Create Menu</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Menu Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Menu Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Create Menu</button>
      </form>
    </div>
  );
};

export default AddMenuPage;
