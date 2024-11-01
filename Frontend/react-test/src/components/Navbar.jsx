import React from 'react' 
import { Link } from 'react-router-dom' 
import './Navbar.css' 

function Navbar() {
  return (
    <nav className='navbar'>
      <Link to='/employees'>Employees</Link>
      <Link to='/departments'>Departments</Link>
    </nav>
  ) 
}

export default Navbar 
