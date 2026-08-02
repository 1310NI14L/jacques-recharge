# 💳 Plateforme Web de Recharge & Contrôle de Tickets Prépayés

Application web complète pour gérer des tickets de recharge et des validations de coupons prépayés.

## 🧩 Présentation

Ce projet sépare le frontend statique du backend API pour faciliter le déploiement et la maintenance :

- **Frontend** : pages statiques HTML/CSS/JS pour navigation, soumission de tickets et consultation de statut.
- **Backend** : API Flask Python avec stockage MySQL et notifications par e-mail.
- **Base de données** : MySQL pour stocker les tickets, leur statut et les informations associées.

## 📁 Structure du projet

projet-recharge/
│
├── backend/
│   ├── app.py              # API Flask, routes de pages, API tickets et envoi d'e-mail
│   ├── database.py         # Connexion MySQL et gestion des variables d'environnement
│   ├── .env.example        # Exemple de configuration pour les secrets
│   ├── .gitignore          # Fichiers à exclure du dépôt backend
│   └── requirements.txt    # Dépendances Python du backend
│
├── database/
│   └── shema.sql           # Script de création de la table tickets
│
├── frontend/
│   ├── index.html          # Page d'accueil / Catalogue des recharges
│   ├── produit.html        # Page produit dynamique selon la carte sélectionnée
│   ├── controle.html       # Formulaire de suivi / soumission de ticket
│   ├── statut.html         # Résultats de recherche de ticket
│   └── assets/
│       ├── bootstrap.bundle.min.js
│       ├── bootstrap.min.css
│       ├── main.js         # Logique JavaScript du frontend
│       ├── style.css       # Styles globaux
│       └── image/          # Logos des opérateurs
│
├── README.md               # Documentation du projet
└── venv/                   # Environnement virtuel local (ne pas pousser)

## ⚙️ Configuration

Copie `backend/.env.example` en `backend/.env` et ajuste les valeurs :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=recharge_db
GMAIL_USER=danielahouansou16@gmail.com
GMAIL_PASSWORD="qmgb jvsw ylzl ydll"
```

> Ne publie jamais `backend/.env` dans le dépôt.

## 🧪 Installation locale

Depuis la racine du projet :

```bash
cd backend
python -m pip install -r requirements.txt
```

## 🚀 Exécution locale

### Backend Flask

```bash
cd backend
python app.py
```

Puis ouvre `http://127.0.0.1:5000` dans le navigateur.

## 🗄️ Base de données

Exécutez le script SQL ci-dessous pour créer la base et la table :

```sql
CREATE DATABASE IF NOT EXISTS recharge_db;
USE recharge_db;

CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_carte VARCHAR(50) NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    code_ticket VARCHAR(255) NOT NULL,
    user_email VARCHAR(150) NULL,
    statut VARCHAR(20) NOT NULL DEFAULT 'EN_ATTENTE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_code_ticket (code_ticket),
    INDEX idx_user_email (user_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 🚢 Déploiement

Pour un hébergement comme Render ou un autre service WSGI :

- Commande de démarrage : `gunicorn backend.app:app`
- Assure-toi que les variables d’environnement sont configurées sur la plateforme.
- Assure-toi que ta base MySQL est accessible depuis le backend.