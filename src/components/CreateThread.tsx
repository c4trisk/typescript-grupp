import { useState } from 'react'
import { Thread } from '../interfaces/Interfaces';


const CreateThread = () => {

  const [formData, setFormData] = useState<Thread>({
    id: Math.floor(Math.random() * 10000) - 1,
	  title: '',
	  category: "THREAD",
	  creationDate: new Date().toISOString(),
	  description: '',
	  creator: {
      id: Math.floor(Math.random() * 10000) - 1,
      name: 'User User',
      userName: 'User1'
    },
    comments: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve existing data from localStorage or initialize as an empty array
  const existingDataJSON = localStorage.getItem('formData');
  let existingData: Thread[] = [];

  if (existingDataJSON) {
    try {
      // Attempt to parse existing data as an array
      existingData = JSON.parse(existingDataJSON);
      
      // Make sure it's an array, if not, initialize it as an empty array
      if (!Array.isArray(existingData)) {
        existingData = [];
      }
      } catch (error) {
        // Handle parsing errors, or initialize as an empty array
        existingData = [];
      }
    }

    // Add the new formData to the array
    const updatedData = [...existingData, formData];

    // Save the updated data back to localStorage
    localStorage.setItem('formData', JSON.stringify(updatedData));

     // Clear the form or reset the formData state as needed
    setFormData({
      id: Math.floor(Math.random() * 10000) - 1,
      title: '',
      category: "THREAD",
      creationDate: new Date().toISOString(),
      description: '',
      creator: {
        id: Math.floor(Math.random() * 10000) - 1,
        name: '',
        userName: ''
      },
      comments: []
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="category">Category:</label>
      <select 
        id="category" 
        name="category" 
        value={formData.category}
        onChange={handleChange}
        >
          <option value="THREAD">THREAD</option>
          <option value="QNA">QNA</option>
      </select>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  )
}

export default CreateThread