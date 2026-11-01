# 🌍 EcoImpact — L'action climat au quotidien (Climat + Santé + Argent)

Une application web mobile-first, 100 % gratuite et open source, conçue pour vous accompagner dans vos choix quotidiens sans éco-culpabilité.

## ✨ Ce qui rend l'application différente

- **Le Trio Impact (Climat + Santé + Argent) :** Relie directement vos actions à leurs bénéfices pour la planète ($CO_2e$, Eau, Biodiversité), votre santé (calories, activité) et votre portefeuille (€ économisés).
- **Onboarding "Zero-Fatigue" (< 60s) :** 5 questions simples basées sur des profils archétypes pour estimer votre score initial, sans passer par des questionnaires de 40+ questions.
- **Approche Gamifiée (Style Duolingo) :** Interface épurée, animations fluides, retours haptiques et micro-engagements.
- **Respect de la vie privée (100% Local) :** Aucune inscription requise, aucune donnée collectée sur un serveur. Tout reste sur votre appareil via le stockage local (`localStorage` / `IndexedDB`).
- **Règle des 25% (Carbone 4) & Limites Planétaires :** Distingue l'action individuelle directe des contraintes systémiques, avec un budget quotidien soutenable (ex: ~5.5 kg $CO_2e$/jour).

## 🔬 Science & Moteur de Calcul

Les facteurs d'impact s'appuient sur des bases de données de référence en Open Data :
- **ADEME** (Base Empreinte)
- **Agribalyse** (Analyse de Cycle de Vie - ACV)
- **Open Food Facts**

## 🛠️ Stack Technique

- **Frontend :** HTML5, CSS3 (Tailwind CSS), JavaScript / TypeScript
- **Animations :** DotLottie / Canvas-Confetti / Web Vibration API
- **Hébergement :** GitHub Pages (PWA Ready)
- **Application Android :** Packagée via Bubblewrap (Trusted Web Activity)

## 🚀 Démarrage rapide

La première version est volontairement sans dépendance ni compilation : elle contient
un onboarding de cinq questions, une action suggérée et une sauvegarde locale de la
progression. Les impacts chiffrés ne sont pas encore affichés, en attendant de valider
les facteurs de calcul.

1. Ouvrir `index.html` dans un navigateur récent.
2. Répondre aux cinq questions et découvrir l’action proposée.
3. La progression et le défi restent enregistrés dans le stockage local du navigateur.
   Le bouton « Effacer mes réponses et recommencer » les supprime.

Pour développer, servir le dossier avec un serveur HTTP local est préférable afin de
tester le même mode de fonctionnement qu’un hébergement statique.

### Suite des petites itérations

1. Faire relire et valider les questions et les actions proposées.
2. Ajouter des facteurs d’impact sourcés pour une seule action, avec méthode et limites.
3. Afficher les impacts climat, santé et argent uniquement quand leurs données sont vérifiées.
4. Ajouter quelques actions et un suivi quotidien, puis tester le parcours sur mobile.
5. Préparer l’installation PWA et vérifier le déploiement GitHub Pages.

## 🧰 Ancienne piste de démarrage (projet hébergé)

```bash
# Pour un dépôt hébergé, remplacer l’URL par celle du dépôt réel :
git clone https://github.com/votre-user/eco-impact.git
cd eco-impact