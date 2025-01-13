const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'laboratoire'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Base de données connectée');
});

// Route pour la connexion
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM utilisateurs WHERE nom_utilisateur = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).send('Erreur serveur');
    }

    if (results.length === 0) {
      return res.status(400).send({ success: false, message: 'Utilisateur introuvable' });
    }

    const user = results[0];

    bcrypt.compare(password, user.mot_de_passe, (err, isMatch) => {
      if (err) {
        return res.status(500).send('Erreur serveur');
      }

      if (!isMatch) {
        return res.status(400).send({ success: false, message: 'Mot de passe incorrect' });
      }

      res.status(200).send({ success: true, role: user.role });
    });
  });
});

// Endpoint pour récupérer tous les matériels
app.get('/api/materiels', (req, res) => {
  const query = `
    SELECT id, nom, description, categorie, etat
    FROM materiel;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des matériels' });
    }
    res.json(results);
  });
});

// Nouveau endpoint : Récupérer les matériels empruntés par un utilisateur
app.get('/api/materiels-empruntes/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT materiel.id, materiel.nom, materiel.description, materiel.categorie, materiel.etat
    FROM materiel
    WHERE materiel.emprunteur_id = ?;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération des matériels' });
    }
    res.json(results);
  });
});

// Lancer le serveur sur le port 5000
app.listen(5000, () => {
  console.log('Serveur en écoute sur le port 5000');
});