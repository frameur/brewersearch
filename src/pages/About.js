import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
// import Select from 'react-select'
// import data from '../services/data'
import brasseurData from '../services/projectsData'

const About = () => {
  const [brasseurState, setBrasseurState] = useState()

  const onChangeComBox = (e) => {
    const selectedId = e.target.value
    // eslint-disable-next-line eqeqeq
    const selectedBrasseurState = brasseurData.filter(
      // eslint-disable-next-line eqeqeq
      (d) => d.id == selectedId
    )[0]
    setBrasseurState(selectedBrasseurState)
    console.log(selectedBrasseurState)
  }

  useEffect(() => {
    setBrasseurState(brasseurData[0])
  }, [])
  return (
    <div>
      <Navigation />
      <h1>brasseurs de france</h1>
      <div className="select_content ">
        <select
          name=""
          id=""
          className="custom-select"
          value={brasseurState?.id}
          onChange={(e) => {
            onChangeComBox(e)
          }}
        >
          {brasseurData.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nameTown} - Brasseur {d.nameBrass}
            </option>
          ))}
        </select>

        <div className="content_img">
          {brasseurState ? <img src={brasseurState?.img} alt="" /> : ''}
        </div>

        {brasseurState ? <h2>BRASSEUR {brasseurState?.nameBrass}</h2> : ''}
        {brasseurState ? (
          <h3>
            {brasseurState?.address} <br /> {brasseurState?.nameTown} <br />
            {brasseurState?.address2} <br /> {brasseurState?.nameTown2}
            <br />
            {brasseurState?.phone}
            <br />
            {brasseurState?.phone2}
          </h3>
        ) : (
          ''
        )}

        {brasseurState ? (
          <h3 className="linkWeb">
            <a
              href={brasseurState?.link}
              rel="noopener noreferrer"
              target="_blank"
            >
              {brasseurState?.link}
            </a>
          </h3>
        ) : (
          ''
        )}
      </div>

      <br />

      <p className="content_text">
        <h4>{brasseurState?.title}</h4>
        {brasseurState?.infos}
      </p>
    </div>
  )
}

export default About
