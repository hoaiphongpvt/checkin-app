import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Location from 'expo-location'
import Button from '@/components/Button'
import Map from '@/components/Map'
import { Redirect } from 'expo-router'
import { useAppSelector } from '@/hooks/type'
import CameraComponent from '@/components/CameraComponent'

type Location = {
  latitude: number
  longitude: number
}

export default function Index() {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  })
  const [isClicked, setIsClicked] = useState(false)

  const user = useAppSelector((state) => state.user)
  if (!user._id) {
    return <Redirect href='/(auth)/login' />
  }

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

  const handleCheckin = () => {
    setIsClicked(true)
  }

  return (
    <View style={styles.container}>
      {isClicked ? (
        <CameraComponent />
      ) : (
        <>
          <View style={styles.map}>
            <Map location={location} />
          </View>
          <View style={styles.buttonGroup}>
            {location.latitude == 0 && location.longitude == 0 && (
              <Button
                onPress={handleGetCurrentLocation}
                title='Get Current Location'
                customStyles={{
                  width: 200,
                  backgroundColor: '#ffd33d',
                }}
              />
            )}
            {location.latitude !== 0 && location.longitude !== 0 && (
              <Button
                title='CHECKIN'
                onPress={handleCheckin}
                customStyles={{
                  width: 200,
                  backgroundColor: '#ffd33d',
                }}
              />
            )}
          </View>
        </>
      )}
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
  map: {
    width: '100%',
    height: '80%',
    borderRadius: 20,
  },
  buttonGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    gap: 20,
  },
})
