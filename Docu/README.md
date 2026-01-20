# RPG CLI TypeScript - POO Stricte

## 🎮 Description
Jeu de rôle en ligne de commande développé en TypeScript avec une architecture Orientée Objet stricte.

## 📁 Structure du projet
```
src/
├── index.ts                 # Point d'entrée (< 10 lignes hors classes)
├── game/
│   ├── GameManager.ts      # Gestionnaire principal (Singleton)
│   └── Fight.ts            # Système de combat
├── models/
│   ├── Character.ts        # Classe abstraite de base
│   ├── Player.ts           # Joueur
│   └── Monster.ts          # Monstres
├── utils/
│   └── Menu.ts             # Gestion des interactions CLI
└── interfaces/
    └── CharacterStats.ts   # Interface pour les stats
```

## 🛠️ Installation et utilisation

### Prérequis
- Node.js (v16+)
- npm ou yarn

### Installation des dépendances
```bash
npm install
```

### Compilation
```bash
npm run build
```

### Lancement du jeu
```bash
npm start
```

### Mode développement (compilation + lancement)
```bash
npm run dev
```

## ⚔️ Fonctionnalités (Étape 1)

### Classes implémentées
- **Character** (abstraite) : Classe de base pour tous les combattants
- **Player** : Joueur avec système de niveau et d'expérience
- **Monster** : Monstres avec butin (or, XP)
- **Fight** : Système de combat tour par tour basé sur la vitesse
- **Menu** : Interface CLI sécurisée avec validation récursive
- **GameManager** : Gestionnaire du jeu (Singleton)

### Mécaniques de jeu
- Création de personnage
- Combats tour par tour (tri par vitesse)
- Système de dégâts avec défense
- Gain d'expérience et montée de niveau
- Trois types de monstres prédéfinis

## 🎯 Contraintes respectées
✅ POO Pure : Maximum 10 lignes hors classes (index.ts)
✅ TypeScript strict avec types, interfaces, classes abstraites
✅ Modificateurs d'accès (private, protected, public)
✅ Clean Code (KISS, DRY)
✅ Séparation logique métier / interface

## 📊 Principes appliqués
- **Héritage** : Player et Monster héritent de Character
- **Encapsulation** : Propriétés protégées, accesseurs publics
- **Abstraction** : Character est une classe abstraite
- **Singleton** : GameManager instance unique
- **Composition** : Fight utilise des tableaux de Character
