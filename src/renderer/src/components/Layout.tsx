/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

export function Layout(): ReactNode {
  return (
    <main className='h-screen flex flex-col'>
        <Nav/>
        <Outlet/>
    </main>
  )
}
