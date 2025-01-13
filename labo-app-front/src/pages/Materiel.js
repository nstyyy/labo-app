import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Materiel.css'; // Import du fichier CSS

function Materiel() {
  const [materiels, setMateriels] = useState([]);  // Liste complète des matériels
  const [filteredMateriels, setFilteredMateriels] = useState([]);  // Liste filtrée des matériels
  const [search, setSearch] = useState('');  // Valeur du champ de recherche
  const [category, setCategory] = useState('all');  // Catégorie sélectionnée pour filtrage
  const navigate = useNavigate();  // Hook pour navigation

  // Récupérer la liste des matériels depuis le backend
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/materiels')
      .then((response) => {
        setMateriels(response.data);  // Sauvegarder tous les matériels
        setFilteredMateriels(response.data);  // Afficher tous les matériels au début
      })
      .catch((error) => {
        console.error('Erreur de récupération des matériels', error);
      });
  }, []);

  // Fonction pour gérer le changement de valeur dans le champ de recherche
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Appliquer les filtres
    filterMateriels(value, category);
  };

  // Fonction pour gérer le changement de catégorie sélectionnée
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);

    // Appliquer les filtres
    filterMateriels(search, value);
  };

  // Fonction pour filtrer les matériels en fonction du nom et de la catégorie
  const filterMateriels = (searchValue, categoryValue) => {

    let filtered = materiels;

    // Filtrage par nom
    if (searchValue) {
      filtered = filtered.filter((materiel) =>
        materiel.nom.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Filtrage par catégorie
    if (categoryValue && categoryValue !== 'all') {
      filtered = filtered.filter((materiel) => {
        return materiel.categorie.toLowerCase() === categoryValue.toLowerCase();
      });
    }

    setFilteredMateriels(filtered);  // Met à jour la liste filtrée
  };

  // Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/');  // Redirection vers la page d'accueil après déconnexion
  };

  return (
    <div className="materiel-container">
      <h1>Recherche de matériel</h1>

      {/* Filtres de recherche */}
      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={search}
          onChange={handleSearchChange}
        />
        <select value={category} onChange={handleCategoryChange}>
          <option value="all">Toutes les catégories</option>
          <option value="PC">PC</option>
          <option value="switch">Switch</option>
          <option value="hub">Hub</option>
          <option value="chargeur">Chargeur</option>
          <option value="multiprise">Multiprise</option>
          <option value="cle_usb">Clé USB</option>
        </select>
      </div>

      {/* Affichage des matériels filtrés */}
      <div className="materiels-list">
        {filteredMateriels.length > 0 ? (
          filteredMateriels.map((materiel) => (
            <div key={materiel.id} className="materiel-item">
              <h3>{materiel.nom}</h3>
              <p>{materiel.description}</p>
              <p><strong>Catégorie:</strong> {materiel.categorie}</p>
              <p><strong>État:</strong> {materiel.etat}</p>
            </div>
          ))
        ) : (
          <p>Aucun matériel trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default Materiel;