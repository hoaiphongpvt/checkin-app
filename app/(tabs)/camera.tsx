import React from 'react'
import { StyleSheet, View } from 'react-native'
import CameraComponent from '@/components/CameraComponent'

const Camera = () => {
  return (
    <View style={styles.container}>
      <CameraComponent />
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

export default Camera
