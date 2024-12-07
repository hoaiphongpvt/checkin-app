import React, { useRef } from 'react'
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera'
import { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image'
import Button from './Button'

export default function CameraComponent() {
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<CameraView | null>(null)
  const [imageUri, setImageUri] = useState<string>('')

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='Grant permission' />
      </View>
    )
  }

  const toggleCameraFacing = () =>
    setFacing((current: string) => (current === 'back' ? 'front' : 'back'))

  const handleTakePic = async () => {
    console.log('Take Pic')
    const options = {
      quality: 1,
    }
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync(options)
        if (picture?.uri) {
          setImageUri(picture.uri)
          console.log('Picture URI:', picture.uri)
        }
      } catch (error) {
        console.error('Error while taking picture:', error)
      }
    }
  }

  const handleSavePicture = () => {
    Alert.alert('Success', 'Checkin Success')
    setImageUri('')
  }

  return (
    <View style={styles.container}>
      {imageUri ? (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imageUri} />
          <View style={styles.buttonContainer}>
            <Button
              title='Return'
              iconColor='white'
              iconName='chevron-back'
              onPress={() => setImageUri('')}
              size={30}
            />
            <Button
              title='Save'
              iconName='checkmark'
              iconColor='white'
              onPress={handleSavePicture}
              size={30}
              customStyles={{ flexDirection: 'row-reverse' }}
            />
          </View>
        </View>
      ) : (
        <>
          <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
          <View style={styles.buttonContainer}>
            <Button iconName='images' iconColor='white' size={30} />
            <Button
              iconName='camera'
              iconColor='white'
              size={80}
              onPress={handleTakePic}
            />
            <Button
              iconName='camera-reverse-outline'
              iconColor='white'
              size={30}
              onPress={toggleCameraFacing}
            />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    color: 'white',
    paddingBottom: 10,
  },
  camera: {
    width: 400,
    height: 400,
    padding: 20,
    borderRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 64,
  },
  imageContainer: {
    gap: 10,
  },
  image: {
    width: 400,
    height: 400,
    borderRadius: 20,
  },
})
