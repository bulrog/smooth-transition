# AGENTS.md - Directives pour l'Agent de Codage (Projet Trio Impact)

Ce document complète le `README.md` et fournit les règles techniques, l'architecture et les contraintes spécifiques à respecter pour le code de l'application **Trio Impact**.

---

## 1. Architecture des Données et Stockage Local
- **Pattern Repository / Storage Abstraction :** Isoler toute la logique de persistance dans un service dédié (ex: `storageService.js`). 
- **Stockage 100% Local (MVP) :** Utiliser exclusivement `localStorage` ou `localForage` (IndexedDB). **Aucun backend distant ni base de données centralisée** ne doit être implémenté pour l'instant. Cela garantit le respect total du RGPD et évite les coûts d'hébergement.
- *Future-proof :* L'interface (UI) et le moteur de calcul ne doivent jamais interagir directement avec `localStorage`, ils doivent passer par le service de données pour permettre une migration facile vers un stockage distant plus tard si besoin.

---

## 2. Contraintes Web-First, PWA et Mobile-First
L'application est pensée pour être utilisée principalement sur smartphone (style Duolingo), accessible via le Web (GitHub Pages) et transformée en application Android native. Le code doit respecter ces impératifs techniques :
- **PWA (Progressive Web App) Ready :** 
  - Prévoir un fichier `manifest.json` complet (icônes, nom, couleurs de thème, affichage en mode `standalone`).
  - Implémenter un Service Worker basique pour permettre un fonctionnement hors-ligne (Offline-First).
- **Optimisations Tactiles & Mobile :**
  - Supprimer le délai au toucher sur mobile via la balise viewport adaptée (`user-scalable=no`).
  - Bloquer le rebond de scroll vertical natif des navigateurs mobiles (`overscroll-behavior-y: none;` en CSS) pour garder un effet "application native".
- **Packaging Android (Bubblewrap / TWA) :** 
  - Le code HTML/JS doit être une application "Single Page" ou multi-pages statique fluide, conçue pour tourner parfaitement dans un conteneur WebView léger (Trusted Web Activity) sans barre de navigation visible.

---

## 3. Ergonomie et Design (Style Duolingo)
- **Framework CSS :** Utiliser **Tailwind CSS** pour un design rapide, propre et modulaire.
- **UI / UX :** 
  - Boutons larges, coins arrondis prononcés (`rounded-2xl`), cartes colorées et ombres douces.
  - Retours visuels immédiats lors des choix (micro-interactions).
- **Animations & Gamification :**
  - Intégration de micro-animations vectorielles via **Lottie** (fichiers JSON) pour les succès et mascottes.
  - Utilisation de `canvas-confetti` pour célébrer la validation des actions quotidiennes.
  - Activation optionnelle du retour haptique via l'API Web Vibration (`navigator.vibrate`) lors des interactions clés.

---

## 4. Règles de Développement
1. ** modularité :** Séparer clairement les composants d'interface, le moteur de calcul d'impact (basé sur les facteurs ADEME/Agribalyse) et la couche de stockage local.
2. **Simplicité du MVP :** Ne pas sur-complexifier le code. Suivre scrupuleusement la feuille de route du README (onboarding en 5 questions, affichage des trois axes Climat/Santé/Argent).