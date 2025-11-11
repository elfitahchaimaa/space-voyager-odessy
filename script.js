// Données des destinations (extraites du JSON)
const destinations = {
  "moon": {
    "id": "moon",
    "name": "The Moon",
    "accommodations": ["standard", "luxury", "zero-g"]
  },
  "mars": {
    "id": "mars",
    "name": "Mars",
    "accommodations": ["standard", "luxury", "zero-g"]
  },
  "iss": {
    "id": "orbital-station",
    "name": "Orbital Station",
    "accommodations": ["standard", "luxury", "zero-g"]
  },
  "jupiter": {
    "id": "europa",
    "name": "Europa",
    "accommodations": ["standard", "luxury"]
  },
  "saturn": {
    "id": "titan",
    "name": "Titan",
    "accommodations": ["standard", "luxury"]
  }
};

const accommodationsData = {
  "standard": {
    "name": "Standard Cabin",
    "description": "Comfortable private quarters with basic amenities"
  },
  "luxury": {
    "name": "Luxury Suite",
    "description": "Spacious suite with premium amenities and viewports"
  },
  "zero-g": {
    "name": "Zero-G Pod",
    "description": "Advanced accommodation with zero-gravity experience"
  }
};

let passengerCount = 1;
const maxPassengers = 6;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  initializeForm();
});

function initializeForm() {
  // Gestion de la sélection de destination
  const destinationSelect = document.getElementById('destination');
  destinationSelect.addEventListener('change', handleDestinationChange);

  // Gestion des cartes d'hébergement
  const accommodationCards = document.querySelectorAll('.accommodation-card');
  accommodationCards.forEach(card => {
    card.addEventListener('click', function() {
      selectAccommodation(this);
    });
  });

  // Sélectionner l'hébergement par défaut
  const defaultCard = document.querySelector('.accommodation-card[data-type="standard"]');
  if (defaultCard) {
    defaultCard.classList.add('selected');
  }

  // Gestion des boutons radio pour les passagers
  const passengerRadios = document.querySelectorAll('input[name="passengers"]');
  passengerRadios.forEach(radio => {
    radio.addEventListener('change', handlePassengerCountChange);
  });

  // Gestion du bouton "Add Passenger"
  const addPassengerBtn = document.getElementById('addPassengerBtn');
  addPassengerBtn.style.display = 'none'; // Caché par défaut
  addPassengerBtn.addEventListener('click', addPassengerForm);

  // Gestion de la soumission du formulaire
  const bookingForm = document.getElementById('bookingForm');
  bookingForm.addEventListener('submit', handleFormSubmit);

  // Définir la date minimum (aujourd'hui)
  const departureDateInput = document.getElementById('departureDate');
  const today = new Date().toISOString().split('T')[0];
  departureDateInput.setAttribute('min', today);
}

// Gestion du changement de destination
function handleDestinationChange(e) {
  const selectedDestination = e.target.value;
  
  if (!selectedDestination) {
    // Réinitialiser toutes les cartes
    document.querySelectorAll('.accommodation-card').forEach(card => {
      card.style.display = 'block';
      card.classList.remove('disabled');
    });
    return;
  }

  const destination = destinations[selectedDestination];
  const accommodationCards = document.querySelectorAll('.accommodation-card');
  
  accommodationCards.forEach(card => {
    const cardType = card.getAttribute('data-type');
    
    if (destination.accommodations.includes(cardType)) {
      card.style.display = 'block';
      card.classList.remove('disabled');
    } else {
      card.style.display = 'none';
      card.classList.add('disabled');
      
      // Si la carte désactivée était sélectionnée, sélectionner la première disponible
      if (card.classList.contains('selected')) {
        card.classList.remove('selected');
        const firstAvailable = document.querySelector(`.accommodation-card[data-type="${destination.accommodations[0]}"]`);
        if (firstAvailable) {
          selectAccommodation(firstAvailable);
        }
      }
    }
  });
}

// Sélection d'hébergement
function selectAccommodation(card) {
  if (card.classList.contains('disabled')) return;
  
  document.querySelectorAll('.accommodation-card').forEach(c => {
    c.classList.remove('selected');
  });
  
  card.classList.add('selected');
  const accommodationType = card.getAttribute('data-type');
  document.getElementById('accommodation').value = accommodationType;
}

// Gestion du changement du nombre de passagers
function handlePassengerCountChange(e) {
  const value = e.target.value;
  const addPassengerBtn = document.getElementById('addPassengerBtn');
  
  // Supprimer tous les formulaires de passagers existants
  removeAllPassengerForms();
  
  if (value === 'solo') {
    passengerCount = 1;
    addPassengerBtn.style.display = 'none';
  } else if (value === 'couple') {
    passengerCount = 2;
    addPassengerForm(); // Ajouter un deuxième passager
    addPassengerBtn.style.display = 'none';
  } else if (value === 'group') {
    passengerCount = 3;
    addPassengerForm(); // Passager 2
    addPassengerForm(); // Passager 3
    addPassengerBtn.style.display = 'block';
  }
}

// Supprimer tous les formulaires de passagers supplémentaires
function removeAllPassengerForms() {
  const extraForms = document.querySelectorAll('.passenger-form');
  extraForms.forEach(form => form.remove());
  passengerCount = 1;
}

// Ajouter un formulaire de passager
function addPassengerForm() {
  if (passengerCount >= maxPassengers) {
    alert(`Maximum ${maxPassengers} passengers allowed.`);
    return;
  }

  passengerCount++;
  
  const personalInfoSection = document.querySelector('.form-section:nth-of-type(2)');
  const addPassengerBtn = document.getElementById('addPassengerBtn');
  
  const passengerForm = document.createElement('div');
  passengerForm.className = 'passenger-form form-section';
  passengerForm.innerHTML = `
    <div class="passenger-header">
      <h3 class="section-title">Passenger ${passengerCount} Information</h3>
      <button type="button" class="btn-remove" onclick="removePassengerForm(this)">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 5px;">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        Remove Passenger
      </button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="firstName${passengerCount}">First Name</label>
        <input type="text" id="firstName${passengerCount}" name="firstName${passengerCount}" placeholder="Enter first name" required>
        <span class="error-message" id="firstName${passengerCount}Error"></span>
      </div>
      <div class="form-group">
        <label for="lastName${passengerCount}">Last Name</label>
        <input type="text" id="lastName${passengerCount}" name="lastName${passengerCount}" placeholder="Enter last name" required>
        <span class="error-message" id="lastName${passengerCount}Error"></span>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="email${passengerCount}">Email Address</label>
        <input type="email" id="email${passengerCount}" name="email${passengerCount}" placeholder="Enter email" required>
        <span class="error-message" id="email${passengerCount}Error"></span>
      </div>
      <div class="form-group">
        <label for="phone${passengerCount}">Phone Number</label>
        <input type="tel" id="phone${passengerCount}" name="phone${passengerCount}" placeholder="Enter phone number" required>
        <span class="error-message" id="phone${passengerCount}Error"></span>
      </div>
    </div>
  `;
  
  personalInfoSection.parentNode.insertBefore(passengerForm, addPassengerBtn);
  
  // Cacher le bouton si on atteint le maximum
  if (passengerCount >= maxPassengers) {
    addPassengerBtn.style.display = 'none';
  }
}

// Supprimer un formulaire de passager
function removePassengerForm(button) {
  const passengerForm = button.closest('.passenger-form');
  passengerForm.remove();
  passengerCount--;
  
  // Réafficher le bouton "Add Passenger" si on est en mode groupe
  const groupRadio = document.querySelector('input[name="passengers"][value="group"]');
  const addPassengerBtn = document.getElementById('addPassengerBtn');
  
  if (groupRadio.checked && passengerCount < maxPassengers) {
    addPassengerBtn.style.display = 'block';
  }
  
  // Renuméroter les passagers restants
  renumberPassengers();
}

// Renuméroter les passagers après suppression
function renumberPassengers() {
  const passengerForms = document.querySelectorAll('.passenger-form');
  passengerForms.forEach((form, index) => {
    const passengerNumber = index + 2; // +2 car le premier passager est dans le formulaire principal
    const title = form.querySelector('.section-title');
    if (title) {
      title.textContent = `Passenger ${passengerNumber} Information`;
    }
  });
}

// Validation du formulaire
function validateForm() {
  let isValid = true;
  
  // Réinitialiser les messages d'erreur
  document.querySelectorAll('.error-message').forEach(msg => {
    msg.textContent = '';
  });
  
  // Valider la destination
  const destination = document.getElementById('destination').value;
  if (!destination) {
    document.getElementById('destinationError').textContent = 'Please select a destination';
    isValid = false;
  }
  
  // Valider la date de départ
  const departureDate = document.getElementById('departureDate').value;
  if (!departureDate) {
    document.getElementById('departureDateError').textContent = 'Please select a departure date';
    isValid = false;
  }
  
  // Valider le prénom
  const firstName = document.getElementById('firstName').value.trim();
  if (!firstName) {
    document.getElementById('firstNameError').textContent = 'First name is required';
    isValid = false;
  }
  
  // Valider le nom
  const lastName = document.getElementById('lastName').value.trim();
  if (!lastName) {
    document.getElementById('lastNameError').textContent = 'Last name is required';
    isValid = false;
  }
  
  // Valider l'email
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    document.getElementById('emailError').textContent = 'Email is required';
    isValid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email';
    isValid = false;
  }
  
  // Valider le téléphone
  const phone = document.getElementById('phone').value.trim();
  if (!phone) {
    document.getElementById('phoneError').textContent = 'Phone number is required';
    isValid = false;
  }
  
  return isValid;
}

// Gestion de la soumission du formulaire
function handleFormSubmit(e) {
  e.preventDefault();
  
  if (validateForm()) {
    // Collecter toutes les données du formulaire
    const formData = {
      destination: document.getElementById('destination').value,
      departureDate: document.getElementById('departureDate').value,
      passengers: document.querySelector('input[name="passengers"]:checked').value,
      accommodation: document.getElementById('accommodation').value,
      mainPassenger: {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
      },
      requirements: document.getElementById('requirements').value,
      additionalPassengers: []
    };
    
    // Collecter les informations des passagers supplémentaires
    const passengerForms = document.querySelectorAll('.passenger-form');
    passengerForms.forEach((form, index) => {
      const passengerNum = index + 2;
      formData.additionalPassengers.push({
        firstName: document.getElementById(`firstName${passengerNum}`).value,
        lastName: document.getElementById(`lastName${passengerNum}`).value,
        email: document.getElementById(`email${passengerNum}`).value,
        phone: document.getElementById(`phone${passengerNum}`).value
      });
    });
    
    console.log('Booking Data:', formData);
    
    // Afficher un message de confirmation
    alert('Booking confirmed! Thank you for choosing SpaceVoyager. We will contact you shortly with more details.');
    
    // Réinitialiser le formulaire (optionnel)
    // document.getElementById('bookingForm').reset();
  } else {
    alert('Please fill in all required fields correctly.');
  }
}