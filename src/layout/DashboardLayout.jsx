import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarDashboardComponent from '../components/dashboard/NavbarDashboardComponent'
import SidebarDashboardComponent from '../components/dashboard/SidebarDashboardComponent'

const DashboardLayout = () => {
  return (

    <main className='flex'>
      {/* <NavbarDashboardComponent /> */}
      <SidebarDashboardComponent />
      <Outlet />
    </main>

  )
}

export default DashboardLayout
