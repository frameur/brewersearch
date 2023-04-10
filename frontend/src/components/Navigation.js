import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink to="/" className={(nav) => (nav.isActive ? 'nav-active' : '')}>
        <ul>
          <li>register</li>
        </ul>
      </NavLink>
      <NavLink
        to="/home"
        className={(nav) => (nav.isActive ? 'nav-active' : '')}
      >
        <ul>
          <li>les brasseurs</li>
        </ul>
      </NavLink>
      <NavLink
        to="/about"
        className={(nav) => (nav.isActive ? 'nav-active' : '')}
      >
        <ul>
          <li className={(nav) => (nav.isActive ? 'nav-active' : '')}>
            le brasseur
          </li>
        </ul>
      </NavLink>
      <NavLink
        to="/histoire"
        className={(nav) => (nav.isActive ? 'nav-active' : '')}
      >
        <ul>
          <li>histoire de la biere</li>
        </ul>
      </NavLink>
      <NavLink
        to="/tableau"
        className={(nav) => (nav.isActive ? 'nav-active' : '')}
      >
        <ul>
          <li>brewers table</li>
        </ul>
      </NavLink>
    </div>
  )
}

export default Navigation
