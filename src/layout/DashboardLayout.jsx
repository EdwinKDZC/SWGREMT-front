import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarDashboardComponent from '../components/dashboard/NavbarDashboardComponent'

const DashboardLayout = () => {
  return (

    <>
      <NavbarDashboardComponent />
      <Outlet />
    </>

  )
}

export default DashboardLayout
