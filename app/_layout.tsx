import React from 'react'
import { Stack } from 'expo-router'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' />
          <Stack.Screen name='(auth)' options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </QueryClientProvider>
  )
}
