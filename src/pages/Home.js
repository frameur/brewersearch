import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import data from '../services/projectsData'
import CustomPagination from '../components/Pagination'
import ContentModal from '../components/ContentModal'
// import TextField from '@mui/material/TextField'
import MapModal from '../components/MapModal'

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
        .includes(searchTerm.toLocaleLowerCase()) ||
      val.nameTown
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      val.nameBrass.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    ) {
      return val
    }
  })

  useEffect(() => {
    setNumOfPages(Math.ceil(filteredData.length / itemsPerPage))
  }, [filteredData])

  const itemsPerPage = 12
  const startIndex = (page - 1) * itemsPerPage
  const displayData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div>
      <Navigation />

      <h1 className="pageTitle">les brasseurs</h1>
      <div className="resultSearch">
        <input
          type="text"
          // id="standard-basic"
          // label="Département"
          // variant="outlined"
          placeholder="Entrer code postal, ville, brasseur...."
          onChange={(event) => {
            setSearchTerm(event.target.value)
          }}
        />
      </div>

      <div className="chearchName">
        {/* <div></div> */}
        {displayData
          // eslint-disable-next-line array-callback-return
          .filter((val) => {
            if (searchTerm === '') {
              return val
            } else if (
              val.ville_departement
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase()) ||
              val.nameTown
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase()) ||
              val.nameBrass
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return val
            }
          })

          .map((val, key) => {
            return (
              <div key={key} className="cards">
                <div>
                  <div className="poster">
                    {val ? <img src={val?.img} alt="logo brasseur" /> : ''}

                    <div className="details">
                      <h2 className="title">brasserie {val.nameBrass} </h2>
                      <h5>{val.phone}</h5>
                      <h5>{val.address}</h5>
                      <h5>{val.nameTown}</h5> <br />
                      <span>
                        {' '}
                        <a
                          className="subTitle"
                          href={val.link}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {val.link}
                        </a>
                      </span>
                      <br />
                      <ContentModal>
                        <div className="poster_modal">
                          {val ? (
                            <img src={val?.img} alt="logo brasseur" />
                          ) : (
                            ''
                          )}
                        </div>

                        <div className="carteAffichage">
                          {' '}
                          <MapModal latitude={val.lat} longitude={val.lng} />
                        </div>
                        <div className="content_textmodal">
                          <h2>{val.title}</h2>
                          <p>{val.infos}</p>
                        </div>
                      </ContentModal>
                    </div>
                  </div>
                </div>
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
