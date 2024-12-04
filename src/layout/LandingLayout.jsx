import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../components/landing/NavbarComponent'

const LandingLayout = () => {
  return (
    <>
      <NavbarComponent />
      <Outlet />
    </>

  )
}

export default LandingLayout
