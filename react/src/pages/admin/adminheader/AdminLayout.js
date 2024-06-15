import React from 'react'
import AdminHeader from './AdminHeader'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div>
          <div>
            <section>
    
              <AdminHeader />
              <section>
                <Outlet />
              </section>
    
              <Footer />
            </section>
          </div>
        </div>
    )
}

export default AdminLayout