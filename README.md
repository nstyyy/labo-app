# Cahier des Charges – Gestion du Laboratoire de Matériel

## Introduction

L’objectif de ce projet est de développer une plateforme web permettant la gestion efficace d’un laboratoire où les étudiants peuvent emprunter du matériel (PC, switchs, claviers, souris, câbles, chargeurs, etc.). Le site permettra de visualiser le matériel disponible ou emprunté, de gérer les emprunts et retours, ainsi que de créer et administrer des utilisateurs avec des rôles spécifiques (utilisateur, employé, administrateur).

Le système devra être **intuitif**, **sécurisé** et **accessible via une interface web**, avec un design simple et sobre.

---

## Description du Projet

### Contexte

Le laboratoire est une salle contenant différents types de matériel (PC, switchs, chargeurs, etc.), chacun identifié par un numéro unique. L’accès au matériel nécessite un enregistrement préalable des étudiants sur la plateforme.

### Principales Fonctionnalités

- **Page de connexion** : Authentification via un nom d’utilisateur et un mot de passe.
- **Rôles des utilisateurs** :
  - **Utilisateur simple** : Peut consulter le matériel disponible/emprunté, effectuer des recherches et appliquer des filtres.
  - **Employé** : Gère les emprunts/retours, crée des utilisateurs simples et administre les informations des utilisateurs.
  - **Administrateur** : Dispose des permissions des employés, avec la possibilité de créer/modifier/supprimer des employés et des utilisateurs.

### Objectifs du Système

#### 1. Gestion des utilisateurs
- Création de comptes pour les étudiants (par les employés).
- Authentification avec nom d’utilisateur et mot de passe.
- Gestion des informations des utilisateurs (nom, prénom, numéro de téléphone, etc.).

#### 2. Gestion du matériel
- Affichage de la liste des équipements disponibles/empruntés.
- Recherche par nom, catégorie (PC, switch, chargeur, etc.) et filtre par état (emprunté ou non).
- Mise à jour de l’état du matériel (emprunté/rendu).

#### 3. Rôles et permissions
- **Utilisateur simple** :
  - Accès au matériel du laboratoire pour consultation.
- **Employé** :
  - Gestion des emprunts et retours.
  - Création et modification des utilisateurs simples.
- **Administrateur** :
  - Gestion des employés et utilisateurs.

---

## Spécifications Fonctionnelles

### 1. Authentification et gestion des utilisateurs
- **Page de connexion** avec un formulaire (nom d’utilisateur et mot de passe).
- **Table utilisateur** dans la base de données contenant :
  - Nom d’utilisateur.
  - Mot de passe (haché pour la sécurité).
  - Nom et prénom.
  - Rôle (utilisateur simple, employé, administrateur).
- **Gestion des comptes utilisateurs** :
  - Employé : Création et modification des utilisateurs simples.
  - Administrateur : Gestion complète des utilisateurs et employés.

### 2. Gestion du matériel
- **Table matériel** dans la base de données contenant :
  - Identifiant unique du matériel.
  - Nom et description du matériel.
  - Catégorie (PC, switch, chargeur, etc.).
  - État (disponible/emprunté).
  - Informations sur l’emprunteur (nom, prénom, numéro de téléphone).
- Fonctionnalités principales :
  - Affichage de la liste du matériel avec possibilité de recherche et de filtrage.
  - Mise à jour de l’état du matériel lors des emprunts et retours.

### 3. Interface utilisateur
- **Utilisateur simple** :
  - Consultation de la liste des matériels.
  - Recherche par nom, catégorie ou état.
- **Employé** :
  - Gestion des emprunts et retours :
    - Ajouter un emprunt (nom, prénom, numéro de téléphone de l’étudiant).
    - Marquer un matériel comme rendu.
  - Gestion des utilisateurs simples (création, modification, suppression).
- **Administrateur** :
  - Gestion complète des utilisateurs et employés.

---

## Outils et Technologies

### Frontend
- **React.js** : Pour créer une interface utilisateur réactive et dynamique.
- **Tailwind CSS** : Pour un design simple, flexible et modulaire.

### Backend
- **Node.js** : Environnement d'exécution JavaScript côté serveur.
- **Express.js** : Framework web minimaliste pour faciliter la gestion des requêtes HTTP, des routes, et des API.
- **MySQL** : Base de données relationnelle pour stocker les utilisateurs, matériels, emprunts, etc.

### Base de données
- **MySQL via Laragon** : Laragon permet de configurer facilement un environnement local avec MySQL et phpMyAdmin pour la gestion de la base de données.

### Sécurité
- **bcrypt** : Pour le hachage des mots de passe afin d'assurer la sécurité des utilisateurs.
- **JWT (JSON Web Tokens)** : Pour la gestion des sessions et l'authentification.

### Hébergement
- **Laragon** : Utilisé pour le développement local et les tests.
- **Hébergement cloud** (optionnel) : À définir pour le déploiement en production (ex. DigitalOcean, Heroku, etc.).

---

## Design & Interface

### Accessibilité et UX
- Respect des normes **WCAG** pour garantir l’accessibilité.
- Interface **simple**, **intuitive** et **responsive** pour une bonne expérience utilisateur.

### Wireframing & Prototypage
- Utilisation de **Figma** ou **Adobe XD** pour la création de maquettes et de prototypes interactifs.

---

## Conclusion

Ce projet de gestion de matériel de laboratoire vise à fournir une solution simple, sécurisée et efficace pour les étudiants et les employés. Grâce à l'utilisation des technologies **React.js**, **Node.js**, **Express.js** et **MySQL**, nous offrirons une interface moderne et un backend robuste capable de gérer les données de manière fluide et sécurisée.