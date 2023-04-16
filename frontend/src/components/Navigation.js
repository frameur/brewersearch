import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  const handleNavLinkClick = (event) => {
    // Retirer la classe "nav-active" de tous les éléments de navigation
    const navLinks = document.querySelectorAll('.navigation li')
    navLinks.forEach((link) => {
      link.classList.remove('nav-active')
    })

    // Appliquer la classe "nav-active" à l'élément de navigation cliqué
    event.target.classList.add('nav-active')
  }
  return (
    <div className="navigation">
      <NavLink to="/">
        <ul>
          <li onClick={handleNavLinkClick}>register</li>
        </ul>
      </NavLink>
      <NavLink to="/home">
        <ul>
          <li onClick={handleNavLinkClick}>les brasseurs</li>
        </ul>
      </NavLink>
      <NavLink to="/about">
        <ul>
          <li onClick={handleNavLinkClick}>le brasseur</li>
        </ul>
      </NavLink>
      <NavLink to="/histoire">
        <ul>
          <li onClick={handleNavLinkClick}>histoire de la biere</li>
        </ul>
      </NavLink>
      <NavLink to="/tableau">
        <ul>
          <li onClick={handleNavLinkClick}>brewers table</li>
        </ul>
      </NavLink>
    </div>
  )
}

export default Navigation
