import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Materiel.css'; // Import du fichier CSS

function MyMateriels() {
  const [materielsEmpruntes, setMaterielsEmpruntes] = useState([]);
  const [userId, setUserId] = useState(1);  // Remplacer par l'ID de l'utilisateur authentifié

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/materiels-empruntes/${userId}`)
      .then((response) => {
        console.log(response.data);  // Affiche les données reçues dans la console
        setMaterielsEmpruntes(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des matériels empruntés:", error);
      });
  }, [userId]);

  return (
    <div className="materiel-container">
      <h1>Mes matériels empruntés</h1>
      <div className="materiels-list">
        {materielsEmpruntes.length > 0 ? (
          materielsEmpruntes.map((materiel) => (
            <div key={materiel.id} className="materiel-item">
              <h3>{materiel.nom}</h3>
              <p>{materiel.description}</p>
              <p><strong>Catégorie:</strong> {materiel.categorie}</p>
              <p><strong>État:</strong> {materiel.etat}</p>
            </div>
          ))
        ) : (
          <p>Aucun matériel emprunté.</p>
        )}
      </div>
    </div>
  );
}

export default MyMateriels;