import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Thread } from '../interfaces/Interfaces';

// Lista över alla trådar
const ThreadListView = () => {

  const examplesArray: Thread[] = [
    {
      id: Math.floor(Math.random() * 10000) - 1,
      title: 'I Have Inherited $2 Million USD M23, AMA.',
      category: "QNA",
      creationDate: new Date().toISOString(),
      description: 'Im single, no kids, one brother who received the same amount. Money was inherited from our dad. Mom is not in the picture. AMA.',
      creator: {
        id: Math.floor(Math.random() * 10000) - 1,
        name: 'User User',
        userName: 'cmerebooraah'
      },
      comments: []
    },
    {
      id: Math.floor(Math.random() * 10000) - 1,
      title: 'ELI5: How did NASA determine the appropriate angle of entry for spacecraft re-entering the atmosphere without burning up / skipping off?',
      category: "THREAD",
      creationDate: new Date().toISOString(),
      description: 'Seems like the US would have had to burn up a lot of capsules in order to figure this very small window between life and death. How did they do it?',
      creator: {
        id: Math.floor(Math.random() * 10000) - 1,
        name: 'User User',
        userName: 'JustAskn2022'
      },
      comments: []
    }
  ]


  const [threads, setThreads] = useState<Thread[]>([])

  useEffect(() => {

    const savedData = localStorage.getItem('formData');

    if (savedData) {
      setThreads(JSON.parse(savedData))
    } else {
      localStorage.setItem('formData', JSON.stringify(examplesArray))
      const extraData = localStorage.getItem('formData')
      if(extraData) {
        setThreads(JSON.parse(extraData))
      }
    }

  }, []);
  

  return (
    <div>
      {threads.map(thread => (
        <Link to={`/details/${thread.id}`} key={thread.id}> 
          <p>{thread.title}</p>
        </Link>
      ))}
    </div>
  )
}

export default ThreadListView