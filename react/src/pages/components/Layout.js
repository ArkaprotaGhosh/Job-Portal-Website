import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {

  return (
    <div>
      <div>
        <section>

          <Header />
          <section>
            <Outlet />
          </section>

          <Footer />
        </section>
      </div>
    </div>
  )
}

export default Layout