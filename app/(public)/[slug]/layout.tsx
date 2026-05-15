import React from 'react'
import "@/app/globals.css";


const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
      {children}
    </main>
  )
}

export default layout
