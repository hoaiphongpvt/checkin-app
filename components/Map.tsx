import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps'

type Location = {
  latitude: number
  longitude: number
}

type MapProps = {
  location: Location
}

const Map = (props: MapProps) => {
  const { location } = props
  const mapRef = useRef<MapView>(null)
  const [region, setRegion] = useState<Region>({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 2,
    longitudeDelta: 2,
  })

  useEffect(() => {
    setRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    })
  }, [location])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 1000)
    }
  }, [region])

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      ref={mapRef}
      region={region}
      showsUserLocation
    />
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
})

export default Map
