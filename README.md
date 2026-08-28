# Les Épices de Djouma | Maison d'Épices Rares & Haute Gastronomie

Application web complète développée avec **React 18**, **Node.js (Express)** et **GSAP 3** pour les animations fluides, reproduisant les 15 écrans du projet **Gourmet Spice Directory (ID: 16048243715817667491)**.

---

## 🌟 Fonctionnalités Principales

1. **Accueil & Histoire Artisanale** :
   - Hero section animée avec timeline GSAP, apparition en cascade des textes et badges d'exception.
   - Système de particules interactives d'épices (canvas) flottantes.
   - Présentation de la cuvée exclusive *Mélange Signature Djouma*.
   - Charte d'engagement éthique et agroforesterie.

2. **Catalogue des Épices Filtrable** :
   - Recherche textuelle instantanée (noms, arômes, pays).
   - Filtres par catégories (Mélanges Signatures, Poivres d'Exception, Épices Rares, Piments Nobles, Poudres).
   - Filtres géographiques (Éthiopie, Cambodge, Maroc, Madagascar, Guatemala, etc.).
   - Curseur d'intensité aromatique et échelle Scoville.

3. **Fiche Produit Immersive & Pyramide Olfactive** :
   - Décomposition aromatique (notes de tête, de cœur, de fond).
   - Conseils de dosage, torréfaction et accords mets-épices.
   - Sélecteur de formats (pots en verre fumé, sachets kraft éco-recharge, coffrets bois).

4. **Recettes & Inspirations Gastronomiques** :
   - Recettes pas-à-pas (Tajine d'Agneau, Risotto au Safran de Taliouine, Poires au Poivre de Kampot).
   - Ajout direct de l'épice requise au panier d'un simple clic.
   - Astuces du Maître Épicier.

5. **Tunnel de Commande & Panier** :
   - Tiroir panier avec ajustement des quantités en temps réel.
   - Choix d'emballage cadeau (Pochon en lin ou Coffret en bois d'acacia gravé).
   - Calcul automatique de la livraison offerte dès 60€.
   - Formulaire complet de livraison et confirmation de commande.

6. **Tableau de Bord Administrateur (Back-Office)** :
   - Gestion du cycle de vie des commandes (En attente, En préparation, Expédiée, Livrée).
   - Suivi du chiffre d'affaires, panier moyen et alertes sur les stocks critiques.

7. **Design System Épices & Terroirs** :
   - Palette : Paprika (`#C2593F`), Or Curcuma (`#E0A93B`), Vert Cardamome (`#3F5E4D`), Safran (`#E05A2B`), Sable (`#F4ECE0`).

---

## 🚀 Démarrage Rapide

### Option A : Visualisation Immédiate (Sans installation)
Vous pouvez ouvrir directement le fichier **`index.html`** dans n'importe quel navigateur web (double-clic ou glisser-déposer dans Chrome / Edge / Firefox). Tout fonctionne instantanément (React, GSAP, Tailwind, panier, filtres et dashboard).

### Option B : Serveur Node.js & Vite
Si Node.js est installé sur votre machine :

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le backend Express (Port 5000)
npm run server

# 3. Lancer le frontend Vite (Port 3000)
npm run dev
```
