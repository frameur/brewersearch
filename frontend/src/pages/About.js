import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navigation'
import brasseurData from '../services/projectsData'
import './SingleContent.css'

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
      <h1 className="pageTitle">le brasseur</h1>
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
        <div className="media">
          <div className="poster">
            {brasseurState ? <img src={brasseurState?.img} alt="" /> : ''}
          </div>
          <div className="contentInfos">
            {brasseurState ? (
              <h2 className="title">BRASSEUR {brasseurState?.nameBrass}</h2>
            ) : (
              ''
            )}
            {brasseurState ? (
              <h3>
                {brasseurState?.address} <br /> {brasseurState?.nameTown}
                {brasseurState?.address2} <br /> {brasseurState?.nameTown2}
                {brasseurState?.phone}
                {brasseurState?.phone2}
              </h3>
            ) : (
              ''
            )}
            {brasseurState ? (
              <h3>
                <a
                  className="subTitle"
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

          <div className="content_text">
            <h4>{brasseurState?.title}</h4>
          </div>
          <p>{brasseurState?.infos}</p>
        </div>
      </div>
    </div>
  )
}

export default About
