import React from 'react'
import { getCurrentUser } from '../services/auth'

const Profile = () => {
  const { name } = getCurrentUser()

  return (
    <div>
      <p>Welcome back, {name}!</p>
    </div>
  )
}

export default Profile
