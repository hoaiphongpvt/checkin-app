import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  _id: string
  name: string
  email: string
  photo: string
  role: string
}

const initialState: UserState = {
  _id: '',
  name: '',
  email: '',
  photo: '',
  role: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      const { _id, name, email, photo, role } = action.payload
      state._id = _id
      state.name = name
      state.email = email
      state.photo = photo
      state.role = role
    },
    logout: (state) => {
      state._id = ''
      state.name = ''
      state.email = ''
      state.photo = ''
      state.role = ''
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
