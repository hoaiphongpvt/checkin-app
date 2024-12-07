import Button from '@/components/Button'
import { useAppDispatch } from '@/hooks/type'
import api from '@/services/api'
import { login } from '@/store/slices/userSlice'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password!')
      return
    }
    try {
      const response = await api.post('/users/login', {
        email,
        password,
      })

      if (response.data.status === 'success') {
        const user = response.data.data.user
        dispatch(login(user))
        router.replace('/(tabs)')
      } else {
        Alert.alert(
          'Login Failed',
          'Invalid Email or Password. Please try again.'
        )
      }
    } catch (error) {
      console.error('Error posting data: ', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder='Enter your email...'
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder='Enter your password...'
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Button
            title='LOGIN'
            onPress={handleLogin}
            customStyles={{ backgroundColor: '#ffd33d' }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
  },
  formContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    gap: 20,
  },
  inputContainer: {
    gap: 4,
  },
  label: {
    fontSize: 18,
    color: '#fff',
  },
  input: {
    width: 350,
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
})

export default Login
