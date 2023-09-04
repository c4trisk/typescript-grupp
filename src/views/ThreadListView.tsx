import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Thread } from '../interfaces/Interfaces';

// Lista över alla trådar
const ThreadListView = () => {


  const [threads, setThreads] = useState<Thread[]>([])

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setThreads(JSON.parse(savedData))
      console.log(threads)
    }

  }, []);
  

  return (
    <div>
      {threads.map(thread => (
        <Link to={`/details/${thread.id}`}> 
          <p key={thread.id}>{thread.title}</p>
        </Link>
      ))}
    </div>
  )
}

export default ThreadListView