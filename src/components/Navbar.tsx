import { Link, NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav>
      <Link to={'/'}>Home</Link>
      <NavLink to={'/create'}>Create New Thread</NavLink>
    </nav>
  )
}

export default Navbar