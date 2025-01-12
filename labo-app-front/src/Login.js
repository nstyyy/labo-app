import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userRole, setUserRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset error message
    setErrorMessage('');

    try {
      // Envoie des données de connexion au backend via axios
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });

      // Si la connexion est réussie, afficher le rôle
      if (response.data.success) {
        setUserRole(response.data.role);
        alert(`Bienvenue, ${response.data.role}!`);
      } else {
        setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect.');
      }
    } catch (err) {
        setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect.');
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Se connecter
          </button>
        </form>
        {userRole && <p className="mt-4 text-center">Votre rôle : {userRole}</p>}
      </div>
    </div>
  );
}

export default Login;