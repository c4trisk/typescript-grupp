import { Link, NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
      <Link to={'/'} className='nav-link'>Home</Link>
      <NavLink to={'/create'} className='nav-link'>Create New Thread</NavLink>
    </nav>
  )
}

export default Navbar