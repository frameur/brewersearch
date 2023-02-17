import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const MapModal = () => {
  const mapRef = useRef(null)

  useEffect(() => {
    mapRef.current = L.map('map').setView([47.2167, -1.55], 8)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current)

    let marker = L.marker([47.2167, -1.55]).addTo(mapRef.current)
    marker.bindPopup('je suis la').openPopup()
  }, [])

  return <div id="map" style={{ height: '500px', width: '100%' }} />
}

export default MapModal
