import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '@/components/Button'
import { useAppDispatch, useAppSelector } from '@/hooks/type'
import { logout } from '@/store/slices/userSlice'

const User = () => {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logout())
    router.replace('/(auth)/login')
  }

  if (!user || !user.name) {
    return (
      <View style={styles.container}>
        <Text>User not logged in</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>User: {user.name}</Text>
      <Button
        title='LOGOUT'
        onPress={handleLogout}
        customStyles={{ backgroundColor: 'blue' }}
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
  userName: {
    padding: 10,
    fontSize: 24,
    color: 'white',
  },
})

export default User
