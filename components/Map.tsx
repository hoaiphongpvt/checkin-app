import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Region,
} from 'react-native-maps'

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
    latitude: location.latitude || 1,
    longitude: location.longitude || 1,
    latitudeDelta: 1,
    longitudeDelta: 1,
  })

  useEffect(() => {
    setRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
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
      provider={PROVIDER_DEFAULT}
      ref={mapRef}
      region={region}
      showsUserLocation={true}
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
