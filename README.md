SpaceVoyager - Space Travel Booking System
1-
SpaceVoyager est une application web moderne de réservation de voyages spatiaux. Les utilisateurs peuvent se connecter, explorer des destinations cosmiques, sélectionner des packages de voyage, et effectuer des réservations avec des options d'hébergement et des extras personnalisés.
 Table des matières

Caractéristiques
Technologies utilisées
Structure du projet
Installation
Configuration
Utilisation
Fonctionnalités
Données
Architecture
Dépannage
Contributing
License


2- Caractéristiques
 Authentification & Gestion de Session

✅ Système de login sécurisé
✅ Gestion de session avec localStorage
✅ Affichage du nom d'utilisateur dans toutes les pages
✅ Fonction logout avec confirmation
✅ Redirection automatique après connexion/déconnexion

3- Réservation de Voyages

✅ Sélection de destination (5 destinations disponibles)
✅ Choix de package (lié à chaque destination)
✅ Sélection d'hébergement (Standard, Luxury, Zero-G)
✅ Gestion de plusieurs passagers
✅ Extras optionnels (Assurance, Photos, Repas premium, etc.)
✅ Calcul automatique du prix total

4- Destinations

* The Moon - $250,000+
* Mars - $500,000+
* Orbital Station - $150,000+
* Europa - $750,000+
* Titan - $1,000,000+

5- Interface Utilisateur

✅ Design moderne et responsive
✅ Thème spatial avec animations d'étoiles
✅ Gradient cyan-purple
✅ Mode sombre optimisé
✅ Navigation intuitive

6- Gestion des Données

✅ Données externes via JSON
✅ Fallback automatique en cas d'erreur
✅ Sauvegarde des réservations en localStorage
✅ Export des données de réservation


7- Technologies utilisées
TechnologieVersionUtilisationHTML5-Structure et sémantiqueCSS3-Styling et animationsJavaScript (ES6+)-Logique et interactivitéTailwind CSSLatestFramework CSS utilitaireJSON-Gestion des donnéesLocalStorage-Persistance des données côté client

8- Structure du projet
spacevoyager/
├── index.html              # Page d'accueil (Home)
├── destination.html        # Page des destinations
├── booking.html            # Formulaire de réservation
├── login.html              # Page de connexion
├── destinations.json       # Base de données
├── README.md              # Documentation
└── assets/
    └── (images optionnelles)

9- Installation
Prérequis

Navigateur web moderne (Chrome, Firefox, Safari, Edge)
Serveur web local (obligatoire pour charger le JSON)

Étape 1 : Télécharger les fichiers
bashgit clone https://github.com/username/spacevoyager.git
cd spacevoyager
Étape 2 : Vérifier les fichiers

✅ index.html
✅ destination.html
✅ booking.html
✅ login.html
✅ destinations.json

Étape 3 : Lancer un serveur local
Python 3 (Recommandé)
bashpython -m http.server 8000
Python 2
bashpython -m SimpleHTTPServer 8000
Node.js
bashnpx serve
PHP
bashphp -S localhost:8000
VS Code Live Server

Installer l'extension "Live Server"
Clic droit → "Open with Live Server"

Étape 4 : Accéder à l'application
http://localhost:8000

10- Configuration
Personnaliser les destinations dans destinations.json
Ajouter une destination
json{
  "destinations": {
    "new_planet": {
      "id": "new_planet",
      "name": "New Planet",
      "basePrice": 750000,
      "packages": [
        { "id": "pkg1", "name": "Package 1", "price": 0 }
      ],
      "accommodations": ["standard", "luxury"]
    }
  }
}
Modifier les prix
json{
  "destinations": {
    "moon": {
      "basePrice": 300000
    }
  }
}

11- Utilisation
1. Page d'accueil
URL: http://localhost:8000/index.html

Vue d'ensemble des destinations
Appels à l'action
Navigation principale

2. Connexion
URL: http://localhost:8000/login.html
Test rapide :
Email: astronaut@spacevoyager.com
Mot de passe: password123
3. Explorer les destinations
URL: http://localhost:8000/destination.html

Liste complète des destinations
Détails et prix
Boutons de réservation

4. Réserver un voyage
URL: http://localhost:8000/booking.html
Étapes :

Sélectionner une destination
Choisir un package
Sélectionner une date
Nombre de passagers
Type d'hébergement
Remplir les informations personnelles
Ajouter les extras optionnels
Confirmer la réservation


12- Fonctionnalités détaillées
Session Management
javascript// Vérifier la session
const userSession = JSON.parse(localStorage.getItem('userSession'));
if (userSession && userSession.isLoggedIn) {
  console.log(userSession.email);
}

// Se déconnecter
localStorage.removeItem('userSession');
window.location.href = 'index.html';
Structure d'une réservation
javascript{
  destination: "mars",
  package: "mars_landing",
  departureDate: "2025-12-24",
  passengers: 2,
  accommodation: "luxury",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+1234567890",
  extras: { insurance: {...} },
  bookingId: "BK-1700000000000-ABC123",
  createdAt: "2025-11-14T10:30:00.000Z"
}
Calcul des prix
Total = basePrice + packagePrice + (accommodationPrice × passengers) + extras

13- Données disponibles
Destinations
DestinationBase PriceDuréeDistanceThe Moon$250,0007 jours384,400 kmMars$500,000180 jours225M kmOrbital Station$150,0003 jours400 kmEuropa$750,000365 jours600M+ kmTitan$1,000,000540 jours1.2B km
Hébergements
TypePrix/PersonneDescriptionStandard Cabin$0Confortable avec équipements basiquesLuxury Suite$100,000Spacieux avec équipements premiumZero-G Pod$150,000Expérience zéro-gravité avancée
Extras
ExtraPrixTravel Insurance$25,000Professional Photos$15,000Premium Meal Plan$10,000Spacesuit Customization$5,000Private Guide Service$50,000

14- Architecture
Pattern MVC
Model (destinations.json) → View (HTML/CSS) → Controller (JavaScript)
Flux de données
User Input
    ↓
Event Listener
    ↓
Validation
    ↓
Processing
    ↓
localStorage/JSON
    ↓
UI Update
    ↓
Success Message/Redirect

15- Dépannage
❌ Erreur "destinations.json not found"
bash# Vérifiez que le fichier existe
ls -la destinations.json

# Doit être au même niveau que booking.html
❌ Les accommodations ne s'affichent pas

Ouvrez la console (F12)
Vérifiez les logs ✅/❌
Utilisez un serveur local (pas file://)
Rechargez (Ctrl+F5)

❌ Erreur CORS
bash# Utilisez un serveur local, NOT file://
python -m http.server 8000
# Allez à http://localhost:8000
❌ Session perdue

Vérifiez les paramètres du navigateur
Testez en mode normal (pas incognito)
Consultez F12 → Application → localStorage


16- Sécurité
⚠️ Important : Ce projet stocke les données en localStorage (côté client).
Pour la production :

Utiliser un backend sécurisé (Node.js, Python, etc.)
Implémenter JWT authentication
Utiliser une base de données (MongoDB, PostgreSQL)
Chiffrer les données sensibles
Implémenter HTTPS


17- Personnalisation
Changer les couleurs
html<!-- Remplacez les classes Tailwind -->
<button class="text-cyan-400">Text</button>
<!-- Devenir -->
<button class="text-blue-400">Text</button>
Ajouter des destinations
Éditez destinations.json et ajoutez une nouvelle destination avec ses packages et hébergements.

-- Contributing

Fork le repository
Créez une branche (git checkout -b feature/amazing-feature)
Committez (git commit -m 'Add feature')
Poussez (git push origin feature/amazing-feature)
Ouvrez une Pull Request


-- License
Sous license MIT. Voir LICENSE pour détails.

-- Support

Consultez la section Dépannage
Vérifiez la console (F12)
Ouvrez une issue sur GitHub


-- Feuille de route
v1.0 ✅

✅ Système de login
✅ Réservation
✅ Gestion de passagers
✅ Calcul des prix

v1.1 (À venir)

🔄 Page "My Bookings"
🔄 Modification de réservations
🔄 Notifications

v2.0 (Futur)

🔄 Backend API
🔄 Paiement intégré
🔄 Système de notation
🔄 Forum communautaire


-- Remerciements

Tailwind CSS
Inspiré par les systèmes de réservation modernes
Merci à tous les contributeurs