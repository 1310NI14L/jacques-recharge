# 💳 CheckMyTicket — Plateforme Web de Recharge & Contrôle de Tickets Prépayés

Application web 100 % Frontend (statique) conçue pour la soumission et la vérification de statut de coupons/tickets de recharge prépayés (PCS, Transcash, Neosurf, Paysafecard, Apple, SFR, Orange, Lycamobile, Roblox, etc.). 

Le projet s'appuie sur le service EmailJS pour l'envoi instantané de notifications lors des soumissions sans nécessiter de serveur backend ni de base de données.

---

## 🧩 Architecture & Fonctionnalités

* **Architecture Frontend pure** : Pages HTML5 / CSS3 / JavaScript (ES6) autonomes.
* **UI/UX Responsive** : Intégration de Bootstrap 5 avec un design moderne et compact.
* **Routage dynamique des cartes** : Traitement paramétrique via l'URL (`?carte=...`).
* **Détection intelligente des données** : Capture automatique de la marque de carte, distinction automatique entre recherche par code ou par adresse e-mail.
* **Gestion EmailJS centralisée** : Isolation de la configuration dans un fichier externe avec transmission dynamique des variables (`action`, `action_type`, `type_carte`, `code_ticket`, `user_email`, `date`).
* **Déploiement simple** : Prêt à être hébergé sur Netlify, Vercel, GitHub Pages ou tout serveur HTTP statique.

---

## 📁 Structure du Projet

```text
projet-recharge/
│
├── frontend/
│   ├── index.html            # Page d'accueil / Catalogue des coupons de recharge
│   ├── produit.html          # Page produit dynamique selon la carte sélectionnée
│   ├── controle.html         # Formulaire de contrôle rapide
│   ├── statut.html           # Page de vérification de statut de ticket
│   └── assets/
│       ├── bootstrap.bundle.min.js
│       ├── bootstrap.min.css
│       ├── emailjs.config.js # Configuration des clés EmailJS (Service, Template, Public Key)
│       ├── main.js           # Logique d'affichage et mise à jour dynamique de la carte
│       ├── script.js         # Traitement des formulaires et intégration EmailJS
│       ├── style.css         # Styles globaux sur mesure
│       └── image/            # Logos et visuels des marques
│
└── README.md                 # Documentation globale du projet
```

---

## ⚙️ Configuration d'EmailJS

La gestion des identifiants EmailJS est isolée dans `frontend/assets/emailjs.config.js` pour faciliter le déploiement et la maintenance.

### 1. Clés d'API
Édite le fichier `assets/emailjs.config.js` avec tes identifiants EmailJS :

```javascript
window.EMAILJS_CONFIG = {
  serviceId: 'service_m583e3t',
    templateId: 'template_786v00s',
    publicKey: '-3o3lD8kvft1Ebaeb'
};
```

### 2. Template Mail HTML (Mode Source EmailJS)
Dans le tableau de bord EmailJS (**Email Templates** > **Edit Content** > mode **Source `</>`**), colle le code HTML suivant pour bénéficier d'un rendu e-mail propre et compact :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Notification - CheckMyTicket</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">

  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f6f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        
        <table role="presentation" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;" cellspacing="0" cellpadding="0">
          
          <!-- En-tête -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%); padding: 20px 25px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">Jacques Recharge</h1>
              <p style="color: rgba(255, 255, 255, 0.85); margin: 4px 0 0 0; font-size: 13px;">Nouvelle activité détectée sur le site</p>
            </td>
          </tr>

          <!-- Contenu -->
          <tr>
            <td style="padding: 25px;">
              
              <div style="margin-bottom: 20px;">
                <span style="background-color: #eef2ff; color: #4f46e5; font-weight: 600; font-size: 12px; padding: 6px 12px; border-radius: 20px; display: inline-block;">
                  📌 {{action}}
                </span>
              </div>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px dashed #e2e8f0; color: #64748b; font-size: 13px; font-weight: 500;" width="35%">Marque / Carte :</td>
                  <td style="padding: 10px 0; border-bottom: 1px dashed #e2e8f0; color: #0f172a; font-size: 14px; font-weight: 600;" width="65%">{{type_carte}}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px dashed #e2e8f0; color: #64748b; font-size: 13px; font-weight: 500;">Code Soumis :</td>
                  <td style="padding: 10px 0; border-bottom: 1px dashed #e2e8f0; color: #0f172a; font-size: 14px; font-weight: 700; font-family: monospace;">
                    <span style="background-color: #f8fafc; padding: 4px 8px; border-radius: 4px; border: 1px solid #cbd5e1; display: inline-block;">{{code_ticket}}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px dashed #e2e8f0; color: #64748b; font-size: 13px; font-weight: 500;">Email Client :</td>
                  <td style="padding: 10px 0; border-bottom: 1px dashed #e2e8f0; color: #2563eb; font-size: 14px; font-weight: 500;">{{user_email}}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 500;">Horodatage :</td>
                  <td style="padding: 10px 0; color: #475569; font-size: 13px;">{{date}}</td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Pied de page -->
          <tr>
            <td style="background-color: #f8fafc; padding: 15px 25px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">Notification automatique générée par <strong>Jacques Recharge System</strong>.</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
```

* **Sujet recommandé dans EmailJS** : `Nouvelle demande — Jacques Recharge`

---

## 🧪 Exécution locale

Aucune dépendance Node.js ou compilation backend n'est requise.

### Option 1 : Serveur Python (Recommandé)
```bash
cd frontend
python -m http.server 8000
```
Accède ensuite à `[http://127.0.0.1:8000](http://127.0.0.1:8000)` dans ton navigateur.

### Option 2 : Extension VS Code
Ouvre le dossier dans VS Code, fais un clic droit sur `index.html` puis sélectionne **Open with Live Server**.

---

## 🚢 Déploiement

### Déploiement sur Netlify :
1. Connecte ton dépôt à **Netlify**.
2. Renseigne le dossier de publication (*Publish directory*) sur : `frontend`
3. Lance le déploiement.