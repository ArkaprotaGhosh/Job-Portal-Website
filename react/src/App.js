import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './pages/components/Layout';
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import ChangePassword from './pages/user/ChangePassword';
import ForgetPassword from './pages/user/ForgetPassword';
import Home from './pages/user/header/Home';
import AddJob from './pages/admin/adminDashboard/AddJob';
import AdminSignup from './pages/admin/AdminSignup';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/adminheader/AdminLayout';
import GetJobsAdmin from './pages/admin/adminDashboard/GetJobsAdmin';
import UpdateJobs from './pages/admin/adminDashboard/UpdateJobs';


function App() {
  return (
    <><div className="App">

      <Routes>
        {/* //---------------header---------------\\ */}


        {/* //--------------change Password--------------\\ */}
        <Route path='/changepassword' element={<ChangePassword />} />

        <Route element={<Layout />} >



          {/* ----------------header------------------- */}

          <Route path='/' element={<Home />} />
          {/* //-------user login signup forgetpassword changepassword------------\\ */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
        

        </Route>
        <Route element={<AdminLayout />}>
          <Route path='/getjobadmin' element={<GetJobsAdmin />} />
          <Route path='/addjob' element={<AddJob />} />
          <Route path='/updatejob/:id' element={<UpdateJobs />} />


          {/* ----------admin signup------------- */}
          <Route path='/adminsignup' element={<AdminSignup />} />
          <Route path='/adminlogin' element={<AdminLogin />} />
        </Route>
      </Routes>

    </div>
    </>
  );

}

export default App;
