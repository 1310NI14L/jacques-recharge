# 💳 Plateforme Web de Recharge & Contrôle de Tickets Prépayés

Une application web moderne, fluide et sécurisée permettant l'achat, la vérification et la sécurisation de coupons/recharges prépayés (Neosurf, PCS, Transcash, Orange, etc.).

Le projet s'appuie sur une **architecture découplée à 3 tiers** (Frontend Statique / API Backend Python / Base de données MySQL), optimisée pour un déploiement gratuit et performant.

---

## 🚀 Architecture Technique

* **Frontend Statique (Hébergé sur Netlify)** :
  * Développé en HTML5, CSS3 et JavaScript Vanilla.
  * Modèle de page dynamique unique (Single Page Template) gérant le catalogue via les paramètres d'URL (`query parameters`).
  * Requêtes HTTP asynchrones (AJAX/Fetch) vers l'API Backend.

* **API Backend (Hébergé sur Render)** :
  * Développé en **Python (Flask)**.
  * Gestion des requêtes `POST`, de la sécurité et du traitement des données.
  * Configuration CORS (`flask-cors`) pour autoriser les échanges sécurisés avec Netlify.
  * Envoi automatique de notifications e-mail instantanées via **SMTP Gmail**.

* **Base de Données & Administration** :
  * **MySQL** pour le stockage permanent, l'historique et la traçabilité des tickets soumis.
  * Conçu et géré visuellement via **MySQL Workbench**.

---

## 📁 Structure du Projet

projet-recharge/
│
├── backend/
│   ├── app.py              # Point d'entrée de l'API Flask (Routes et SMTP)
│   ├── database.py         # Module de connexion MySQL (PyMySQL)
│   ├── .env                # Fichier confidentiel (DB, Identifiants SMTP Gmail)
│   ├── .gitignore          # Pour exclure .env et __pycache__ de Git
│   └── requirements.txt    # Dépendances Python pour Render (pip freeze)
│
├── database/
│   └── schema.sql          # Script de création de la table tickets
│
├── frontend/
│   ├── index.html          # Page d'accueil / Catalogue des recharges
│   ├── produit.html        # Page produit dynamique (via URL params)
│   ├── controle.html       # Formulaire de suivi/contrôle des tickets
│   ├── statut.html         # Confirmation et résultat
│   └── assets/
│       ├── css/
│       │   └── style.css   # Styles globaux du site
│       ├── js/
│       │   └── main.js     # Logique JS et requêtes Fetch vers l'API
│       └── image/          # Logos des opérateurs (neosurf, pcs, etc.)
│
├── README.md               # Documentation globale du projet
└── venv/                   # Environnement virtuel Python (à ne pas push sur Git)