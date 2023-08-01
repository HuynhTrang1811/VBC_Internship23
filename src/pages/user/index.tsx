import React from 'react'
import UserProfile from './UserProfile';
import UserInfo from './UserInfo';
import {LoadingContextProvider} from '../loading'
const User = () => {
  return (
    <>
      {/* <UserProfile/> */}
      <LoadingContextProvider>
      <UserInfo />
      </LoadingContextProvider>
    </>
  )
}

export default User