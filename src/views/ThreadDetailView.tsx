// Tråddetaljer, lista över kommentarer, skapa ny kommentarer

import { useEffect, useState,  } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Comment, Thread } from '../interfaces/Interfaces';



const ThreadDetailView = () => {

  const [threads, setThreads] = useState<Thread[]>([])
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false)

  const navigate = useNavigate()

  // getting threads from local storage
  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setThreads(JSON.parse(savedData))
    }
  }, []);

  const { id } = useParams();
  let newId: number;
  
  // if there is an id in url - converting from string to number
  if (id) {
    newId = parseInt(id, 10);
    if (isNaN(newId)) {
      console.log('no thread available')
    }
  }

  // Using param id to find thread with the same id in our threads array
  const currentThread: Thread | undefined = threads.find((item: Thread) => item.id === newId);



  const [comment, setComment] = useState<Comment>({
    id: 0,
    thread: currentThread ? currentThread.id : 0, // if there is a currentThread - Use the ID of the thread to associate the comment with the thread - otherwise 0
    content: '',
    creator: {
      id: Math.random(),
      name: 'Jane Smith',
      userName: 'janesmith',
    },
  })
  

  //* Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };
  
  //* Handle Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Push the new comment to the comments array of the thread
    if(currentThread) {

      const newComment = {
        thread: currentThread.id,
        content: comment.content,
        creator: { id: 1, name: "Username", userName: "username123" }, // Exempel på en användare
        id: Math.floor(Math.random() * 10000) - 1
      };

      // Adding comment to comment array
      currentThread.comments.push(newComment);

      // Create a copy of the threads array with the updated thread
      const updatedThreads = threads.map(thread => {
        if (thread.id === currentThread.id) {
          return currentThread;
          }
        return thread;
        });

      // Overwriting localstorage key 'formData' with new value  
      localStorage.setItem('formData', JSON.stringify(updatedThreads))

      // Emptying form
      setComment({
        id: 0,
        thread: currentThread ? currentThread.id : 0, 
        content: '',
        creator: {
          id: Math.random(),
          name: 'Jane Smith',
          userName: 'janesmith',
        },
      })
    }
  } 

  const handleDeleteThread = () => {

    // Filter out the object to delete from the array
    if(currentThread) {
      const newThreads = threads.filter(item => item.id !== currentThread.id);
      
      // Update the data in local storage with the modified array
      localStorage.setItem('formData', JSON.stringify(newThreads)); // Replace with your storage key

      navigate('/')
    }
  }

  const handleDeleteComment = (commentId: number) => {

    if(currentThread) {
      currentThread.comments = currentThread.comments.filter(comment => comment.id !== commentId)

      const newData = threads.map(thread => thread.id === currentThread.id ? currentThread : thread)

      localStorage.setItem('formData', JSON.stringify(newData))

      setThreads(newData)
    }
  }

   // Function to handle updating the thread
   const handleUpdateThread = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentThread) {
      // Find the index of the current thread in the threads array
      const threadIndex = threads.findIndex((thread) => thread.id === currentThread.id);

      if (threadIndex !== -1) {
        // Create a copy of the current thread with updated title and description
        const updatedThread = {
          ...currentThread,
          title: updatedTitle,
          description: updatedDescription,
        };

        // Create a copy of the threads array with the updated thread
        const updatedThreads = [...threads];
        updatedThreads[threadIndex] = updatedThread;

        // Update the data in local storage with the modified array
        localStorage.setItem('formData', JSON.stringify(updatedThreads));

        // Reset the form and hide the update form
        setUpdatedTitle('');
        setUpdatedDescription('');
        setShowUpdateForm(false);
        navigate('/')
      }
    }
  };
  

  return (
    <div className="thread-detail-view">
      {currentThread && (
        <div className="thread-content">
          <p className="thread-heading-category">Category: {currentThread.category}</p>
          <p className='thread-title'>{currentThread.title}</p>
          <p>{currentThread.description}</p>
          <button className="thread-button" onClick={handleDeleteThread}>
            Delete Thread
          </button>
          <button
            className="thread-button"
            onClick={() => setShowUpdateForm((state) => !state)}
          >
            Update Thread
          </button>

          {showUpdateForm && (
            <form className="thread-form" onSubmit={handleUpdateThread}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              ></textarea>
              <button className="thread-button">Save Update</button>
            </form>
          )}
        </div>
      )}
      <div className="comment-container">
      <h2 className="thread-heading-comment">Comments:</h2>
      {currentThread &&
        currentThread.comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
            <button
              className="comment-button"
              onClick={() => handleDeleteComment(comment.id)}
            >
              Delete Comment
            </button>
          </div>
        ))}

      <h2 className="thread-heading-add">Add a new comment:</h2>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          name="content"
          placeholder="Write a comment here..."
          value={comment.content}
          onChange={handleChange}
        ></textarea>
        <button className="thread-button" type="submit">
          Submit
        </button>
      </form>
      </div>
    </div>
  );
};

export default ThreadDetailView;