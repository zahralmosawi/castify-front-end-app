import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import PodcastList from "./components/PodcastList/PodcastList";
import LoginForm from './components/LoginForm/LoginForm';
import SignupForm from './components/SignupForm.jsx/SignupForm';
import LogoutButton from './components/LogoutButton/LogoutButton';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SideBar from './components/SideBar/SideBar';

import PodcastDetails from './components/PodcastDetails/PodcastDetails';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  function handleLogin(newToken) {
    setToken(newToken);
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem('token');
  }

  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
  }

  return (
    <Router>
      <div>
        {token && <LogoutButton onLogout={handleLogout}/>}
        {<SideBar/>}

        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/podcasts" element={<ProtectedRoute><PodcastList /></ProtectedRoute>} />

          
          <Route path="/podcasts/:id" element={<ProtectedRoute><PodcastDetails /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
