import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink to="/" className={(nav) => (nav.isActive ? 'nav-active' : '')}>
        <ul>
          <li>accueil</li>
        </ul>
      </NavLink>
      <NavLink
        to="/about"
        className={(nav) => (nav.isActive ? 'nav-active' : '')}
      >
        <ul>
          <li>brasseurs</li>
        </ul>
      </NavLink>
    </div>
  )
}

export default Navigation
