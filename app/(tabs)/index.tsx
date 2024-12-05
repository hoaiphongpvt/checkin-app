import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Location from 'expo-location'
import Button from '@/components/Button'
import Map from '@/components/Map'

export default function Index() {
  const [location, setLocation] = useState({
    latitude: 28.79564973396328,
    longitude: 91.73718381391139,
  })

  const handleGetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      console.log('Permission to access location was denied')
      return
    }

    let { coords } = await Location.getCurrentPositionAsync({})
    console.log(coords)
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
  }

  return (
    <View style={styles.container}>
      {/* <Map location={location} /> */}
      <Button
        onPress={handleGetCurrentLocation}
        title='Get Current Location'
        customStyles={{
          backgroundColor: 'blue',
          position: 'absolute',
          bottom: 20,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
})
