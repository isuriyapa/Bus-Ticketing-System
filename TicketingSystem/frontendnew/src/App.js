import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NavBar from './components/NavBar';
import './styles/common.css'

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import UserManagementPage from './pages/UserManagementPage';
import BusManagement from './pages/BusManagement';
import RouteManagementPage from './pages/RouteManagementPage';
import SchedulePage from './pages/SchedulePage';
import InspectorAssignPage from './pages/InspectorAssignPage';
import OffencesPage from './pages/OffencesPage';
import TripDetailsPage from './pages/TripDetailsPage';
import InvalidTicketPage from './pages/InvalidTicketPage';
import HomePage from './pages/HomePage';


function App() {

  const [isLogged, setIsLogged] = useState(sessionStorage.getItem("isLogged"));
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [username, setUserName] = useState(sessionStorage.getItem("username"));
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [role, setrole] = useState(sessionStorage.getItem("role"));

  return (
    <div style={{ height: '100vh' }}>

      {isLogged == "true" ?
        <>
          <div className='row col-lg-12 clear ' >
            <Router>
              <NavBar />
              <div className="col-lg-9 main-bg" style={{ margin: '0%', padding: '0%' }}>

                <Routes>

                  {/* Management */}
                  {role == "ADMIN" &&
                    <>
                      <Route exact path='*' element={<HomePage />} />
                      <Route exact path='/home' element={<HomePage />} />
                      <Route exact path='/users' element={<UserManagementPage />} />
                      <Route exact path='/bus' element={<BusManagement />} />
                      <Route exact path='/route' element={<RouteManagementPage />} />
                      <Route exact path='/schedules' element={<SchedulePage />} />
                      <Route exact path='/assignInspector' element={<InspectorAssignPage />} />
                      <Route exact path='/offences' element={<OffencesPage />} />
                      <Route exact path='/trips' element={<TripDetailsPage />} />
                      <Route exact path='/invalidTickets' element={<InvalidTicketPage />} />
                    </>
                  }
                </Routes>
              </div>
            </Router>
          </div>
        </> :
        <>
          <Router >
            <Routes>
              <Route exact path='*' element={<LoginPage />} />
              <Route exact path='/' element={<LoginPage />} />
            </Routes>
          </Router>
        </>
      }

      <ToastContainer />
    </div>

  );
}

export default App;
