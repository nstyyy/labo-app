// backend.js
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ton_mot_de_passe', // remplace par ton mot de passe MySQL
  database: 'laboratoire'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Base de données connectée');
});

// Route pour la connexion
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Vérifier si l'utilisateur existe
  db.query('SELECT * FROM utilisateurs WHERE nom_utilisateur = ?', [username], (err, results) => {
    if (err) {
      return res.status(500).send('Erreur serveur');
    }

    if (results.length === 0) {
      return res.status(400).send({ success: false, message: 'Utilisateur introuvable' });
    }

    const user = results[0];

    // Comparer le mot de passe haché
    bcrypt.compare(password, user.mot_de_passe, (err, isMatch) => {
      if (err) {
        return res.status(500).send('Erreur serveur');
      }

      if (!isMatch) {
        return res.status(400).send({ success: false, message: 'Mot de passe incorrect' });
      }

      // Renvoi du rôle de l'utilisateur
      res.status(200).send({ success: true, role: user.role });
    });
  });
});

// Lancer le serveur sur le port 5000
app.listen(5000, () => {
  console.log('Serveur en écoute sur le port 5000');
});
