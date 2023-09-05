import './App.css'
import { Routes, Route } from 'react-router-dom'
import ThreadListView from './views/ThreadListView'
import ThreadDetailView from './views/ThreadDetailView'
import ThreadCreationView from './views/ThreadCreationView'
import Navbar from './components/Navbar'
// import Lottie from 'lottie-web'
// import animation from './lotties/chat-bot.json'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<ThreadListView /> } />
        <Route path='/details/:id' element={<ThreadDetailView />} />
        <Route path='/create' element={<ThreadCreationView />} />
      </Routes>
    </>
  )
}

export default App
