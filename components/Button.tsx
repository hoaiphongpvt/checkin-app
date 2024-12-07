import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TouchableOpacity,
} from 'react-native'

type ButtonProps = {
  onPress?: (event: GestureResponderEvent) => void
  iconName?: string
  title?: string
  customStyles?: ViewStyle
  size?: number
  iconColor?: string
}

export default function Button(props: ButtonProps) {
  const {
    onPress,
    title = '',
    customStyles = {},
    iconName = '',
    iconColor = '',
    size = 24,
  } = props
  return (
    <TouchableOpacity style={[styles.button, customStyles]} onPress={onPress}>
      {iconName ? (
        <Ionicons name={iconName} color={iconColor} size={size} />
      ) : null}
      {title ? <Text style={styles.text}>{title}</Text> : null}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 4,
    gap: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})
