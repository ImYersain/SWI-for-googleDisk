import React, { FC } from 'react'
import { Navbar } from './Navbar'

type TLayout = {
  children: React.ReactNode
}

export const Layout:FC<TLayout> = ({children}) => {
  return (
    <div>
      <Navbar />
      <div className='container mx-auto'>
      {children}
    </div>
    </div>
    
  )
}
