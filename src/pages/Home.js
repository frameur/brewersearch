import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import data from '../services/projectsData'
import CustomPagination from '../components/Pagination'
import ContentModal from '../components/ContentModal'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import icon from '../assets/beer.svg' // replace with the path to your custom icon
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
} from '@mui/material'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

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

  // créer un objet pour stocker le nombre de brasseries dans chaque département
  let nbBrasseriesParDepartement = {}

  // parcourir le tableau de brasseries et compter le nombre de brasseries dans chaque département
  for (let brasserie of data) {
    let departement = brasserie.ville_departement
    if (nbBrasseriesParDepartement[departement]) {
      nbBrasseriesParDepartement[departement]++
    } else {
      nbBrasseriesParDepartement[departement] = 1
    }
  }

  // afficher le nombre de brasseries dans chaque département
  const handleSelect = (event) => {
    setSearchTerm(event.target.value)
  }
  // const handleUserInput = (event) => {
  //   setSearchTerm(event.target.value)
  // }
  const filteredDepartments = Object.keys(nbBrasseriesParDepartement).filter(
    (dep) => {
      return (
        dep.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        dep.split(' ')[0] === searchTerm
      )
    }
  )
  // affiche le total des brasseurs
  const totalBrasseries = Object.values(nbBrasseriesParDepartement).reduce(
    (acc, curr) => acc + curr,
    0
  )

  return (
    <div>
      <Navigation />

      <h1 className="pageTitle">les brasseurs</h1>
      <div className="departmentList">
        {searchTerm.length > 1 &&
          filteredDepartments.map((dep) => (
            <div key={dep} className="departmentItem">
              <span>Dans le {dep}</span>
              <span> il y a {nbBrasseriesParDepartement[dep]} brasseurs</span>
            </div>
          ))}
      </div>
      <div className="resultSearch">
        {/* <input
          type="text"
          id="standard-basic"
          label="Département"
          variant="outlined"
          placeholder="Entrer code postal, Brasseur...."
          onChange={handleUserInput}
        /> */}
        <select value={searchTerm} onChange={handleSelect}>
          <option value="">Tous les départements.....</option>
          {filteredDepartments.map((dep) => (
            <option key={dep} value={dep}>
              {dep}
            </option>
          ))}
        </select>
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
              val.nameBrass
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            ) {
              return val
            }
          })

          .map((val, key) => {
            const position = [val.lat, val.lng]
            const markerIcon = new L.Icon({
              iconUrl: icon, // Chemin vers l'icône du marqueur
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, -41],
            })
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
                        <a
                          className="subTitle"
                          href={val.link2}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {val.link2}
                        </a>
                      </span>
                      <br />
                      {/* le modal pour chaque brasseur */}
                      <ContentModal>
                        <div className="poster_modal">
                          {val ? (
                            <img src={val?.img} alt="logo brasseur" />
                          ) : (
                            ''
                          )}
                        </div>

                        <div className="carteAffichage">
                          <MapContainer
                            center={position}
                            zoom={13}
                            scrollWheelZoom={true}
                            style={{ height: '400px' }}
                          >
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              attribution="&amp;copy; OpenStreetMap contributors"
                            />
                            <Marker position={position} icon={markerIcon}>
                              <Popup>
                                Brasserie {val.nameBrass} <br /> {val.nameTown}
                              </Popup>
                            </Marker>
                          </MapContainer>
                          {/* {' '}
                          <MapModal
                            key={val.id}
                            latitude={val.lat}
                            longitude={val.lng}
                          /> */}
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

      {/* la pagination */}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
      <br />

      {/* tableau de l'ensemble des brasseurs par département */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Classement</StyledTableCell>
              <StyledTableCell align="left">CP Département</StyledTableCell>
              <StyledTableCell align="left">
                Nb de brasseries ({totalBrasseries})
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(nbBrasseriesParDepartement)
              .sort((a, b) => b[1] - a[1])
              .map(([departement, nbBrasseries], index) => (
                <StyledTableRow key={departement}>
                  {/* <StyledTableCell></StyledTableCell> */}
                  <StyledTableCell align="left">{index + 1}</StyledTableCell>
                  <StyledTableCell align="left">{departement}</StyledTableCell>
                  <StyledTableCell align="left">{nbBrasseries}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home
