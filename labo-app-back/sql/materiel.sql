-- Table du matériel
CREATE TABLE materiel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    description TEXT,
    categorie ENUM('PC','switch','hub','chargeur','multiprise','cle_usb'),
    etat ENUM('disponible', 'emprunte') DEFAULT 'disponible',
    emprunteur_id INT DEFAULT NULL,
    FOREIGN KEY (emprunteur_id) REFERENCES utilisateurs(id) ON DELETE SET NULL
);