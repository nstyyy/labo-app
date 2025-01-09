-- Table des utilisateurs
CREATE TABLE utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_utilisateur VARCHAR(50) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    nom VARCHAR(50),
    prenom VARCHAR(50),
    role ENUM('utilisateur', 'employe', 'administrateur') NOT NULL
);