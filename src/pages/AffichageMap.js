import React from 'react'
import MapModal from '../components/MapModal'
import 'leaflet/dist/leaflet.css'
import Navigation from '../components/Navigation'

const AffichageMap = () => {
  return (
    <div className="content_textmodal">
      <Navigation />
      <MapModal />
    </div>
  )
}

export default AffichageMap
