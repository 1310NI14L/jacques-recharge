(function () {
  // 1. Base de données des textes et visuels par marque
  const cardsData = {
    neosurf: {
      title: "Recharge Neosurf",
      image: "assets/image/neosurf.png",
      trustText: "Vos recharges Neosurf sont contrôlées de manière ultra-sécurisée. Effectuez vos paiements sur le web en toute tranquillité d'esprit sans révéler vos coordonnées bancaires."
    },
    pcs: {
      title: "PCS Mastercard",
      image: "assets/image/pcs.png",
      trustText: "Contrôle instantané pour coupons PCS. Assurez-vous du solde et de la validité de votre recharge avant de créditer votre carte prépayée."
    },
    transcash: {
      title: "Transcash",
      image: "assets/image/transcash.png",
      trustText: "Authentification garantie de votre recharge Transcash. Profitez d'un transfert de fond sûr et immédiat sur votre carte de paiement."
    },
    paysafecard: {
      title: "Paysafecard",
      image: "assets/image/paysafecard.png",
      trustText: "Solution de paiement prépayée leader du marché. Ce vérificateur contrôle la conformité et l'activation de votre ticket d'achat."
    },
    orange: {
      title: "Recharge Orange",
      image: "assets/image/orange.png",
      trustText: "Vérifiez vos crédits téléphoniques et pass Internet Orange. Transaction garantie et validation directe auprès de l'opérateur."
    },
    lycamobile: {
      title: "Lycamobile",
      image: "assets/image/lycamobile.png",
      trustText: "Contrôlez l'état de votre recharge d'appel nationale ou internationale Lycamobile pour rester connecté en toute sérénité."
    },
    sfr: {
      title: "Recharge SFR",
      image: "assets/image/sfr.png",
      trustText: "Contrôle rapide des codes de recharge SFR La Carte. Assurez-vous que votre coupon est prêt à recharger votre mobile."
    },
    roblox: {
      title: "Roblox Robux",
      image: "assets/image/roblox.png",
      trustText: "Vérifiez vos cartes cadeaux Roblox en toute sécurité avant d'ajouter vos Robux ou d'activer votre abonnement Premium."
    }
  };

  // 2. Éléments du DOM
  const cardTitle = document.getElementById('cardTitle');
  const cardImage = document.getElementById('cardImage');
  const defaultIcon = document.getElementById('defaultIcon');
  const cardTrustText = document.getElementById('cardTrustText');

  // 3. Fonction globale pour mettre à jour la carte gauche
  window.updateLeftCard = function (typeKey) {
    if (!typeKey) return;
    const key = typeKey.toLowerCase().trim();
    const data = cardsData[key];

    if (data) {
      if (cardTitle) cardTitle.textContent = data.title;
      if (cardImage) {
        cardImage.src = data.image;
        cardImage.alt = data.title;
        cardImage.classList.remove('d-none');
      }
      if (defaultIcon) defaultIcon.classList.add('d-none');
      if (cardTrustText) cardTrustText.textContent = data.trustText;
    }
  };

  // 4. Détection dynamique via URL (?carte=pcs)
  const urlParams = new URLSearchParams(window.location.search);
  const carteParam = urlParams.get('carte');

  if (carteParam) {
    window.updateLeftCard(carteParam);
  }
})();