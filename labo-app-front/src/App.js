import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Materiel from './pages/Materiel';
import MyMateriels from './pages/MyMateriels';  // Assure-toi d'importer le nouveau composant
import './App.css';

function App() {
  const [userRole, setUserRole] = useState('');

  const checkUserRole = () => {
    const role = localStorage.getItem('role');
    if (role) {
      setUserRole(role);
    }
  };

  useEffect(() => {
    checkUserRole();
  }, []);

  // Assure-toi que handleLogout est appelé dans un composant enfant
  const handleLogout = () => {
    localStorage.removeItem('role');
    setUserRole('');
    window.location.href = "/";  // Redirige vers la page d'accueil après déconnexion
  };

  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            {userRole && (
              <ul>
                <li>
                  <Link to="/materiel">Matériel</Link>
                </li>
                <li>
                  <Link to="/materiels-empruntes">Voir les matériels empruntés</Link> {/* Nouveau bouton */}
                </li>
                <li>
                  <button onClick={handleLogout}>Se déconnecter</button>
                </li>
              </ul>
            )}
          </nav>
        </header>

        <main>
          <Routes>
            {!userRole && <Route path="/" element={<Login setUserRole={setUserRole} />} />}
            {userRole && <Route path="/materiel" element={<Materiel />} />}
            {userRole && <Route path="/materiels-empruntes" element={<MyMateriels />} />}  {/* Nouvelle route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
