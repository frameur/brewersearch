import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import data from '../services/data'
import CustomPagination from '../components/Pagination'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [numOfPages, setNumOfPages] = useState(0)

  // eslint-disable-next-line array-callback-return
  const filteredData = data.filter((val) => {
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

  useEffect(() => {
    setNumOfPages(Math.ceil(filteredData.length / itemsPerPage))
  }, [filteredData])

  const itemsPerPage = 10
  const startIndex = (page - 1) * itemsPerPage
  const displayData = filteredData.slice(startIndex, startIndex + itemsPerPage)

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

        {displayData
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
              <div className="cards">
                <p key={key}>
                  <a href="./about">
                    <div className="poster">
                      {val ? <img src={val?.img} alt="logo brasserie" /> : ''}

                      <div className="details">
                        <h2 className="title">brasserie {val.nameBrass} </h2>
                        <h5>{val.phone}</h5>
                        <h5>{val.address}</h5>
                        <h5>{val.nameTown}</h5>
                      </div>
                    </div>
                  </a>
                  {/* <span>{val.link}</span> */}
                </p>
              </div>
            )
          })}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Home
