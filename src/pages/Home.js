import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import data from '../services/data'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div>
      <Navigation />
      <h1>accueil</h1>

      <div className="chearchName">
        <input
          type="text"
          placeholder="Rentrer code département...."
          onChange={(event) => {
            setSearchTerm(event.target.value)
          }}
        />
        {data
          // eslint-disable-next-line array-callback-return
          .filter((val) => {
            if (searchTerm === '') {
              return val
            } else if (
              val.ville_departement
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return val
            }
          })
          .map((val, key) => {
            return (
              <div>
                <p className="brewer" key={key}>
                  <a href="./about">
                    <span className="brewerName">brasseur</span> {val.nameBrass}{' '}
                    <br />
                    <h5>{val.nameTown}</h5>
                  </a>
                  {/* <span>{val.link}</span> */}
                </p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Home
