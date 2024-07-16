import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post('/upload', formData);
    const imageUrl = response.data.imageUrl;

    await axios.post('/wardrobe', {
      userId: 'user-id-here', // replace with actual user id
      imageUrl,
      description,
    });

    navigate('/');
  };

  return (
    <div>
      <h1>Upload New Item</h1>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
