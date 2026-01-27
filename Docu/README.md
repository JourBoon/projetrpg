# 🎮 RPG CLI - Jeu de Rôle en Ligne de Commande

## 📋 Description
Jeu RPG texte complet développé en **TypeScript** avec une **architecture Orientée Objet stricte** respectant tous les principes SOLID.

**Status**: ✅ **Version 3.0 - COMPLÈTE (Étapes 1, 2, 3)**

---

## 🎯 Objectif du Jeu
Explorer un donjon de 5 salles, combattre des monstres et affronter un boss final. Au moins un aventurier doit survivre!

### 📊 Déroulement
1. **Sélection du héros** : Choisir parmi 6 classes disponibles
2. **5 Salles à explorer** :
   - 🗡️ Salle 1 : Combat (3 monstres)
   - 🧰 Salle 2 : Trésor (2 objets ou piège)
   - 🗡️ Salle 3 : Combat (3 monstres)
   - 🧰 Salle 4 : Trésor (2 objets ou piège)
   - 🧛 Salle 5 : Boss final
3. **Victoire** : Si le boss est vaincu

---

## 📁 Structure Complète du Projet

```
src/
├── index.ts                         # Point d'entrée (< 10 lignes)
├── interfaces/
│   └── CharacterStats.ts           # Interface des statistiques
├── models/
│   ├── Character.ts                # 🏛️ Classe abstraite de base
│   ├── Adventurer.ts               # 🧑‍🤝‍🧑 Classe pour les aventuriers
│   ├── Monster.ts                  # 👹 Monstres avec IA
│   ├── Boss.ts                     # 🧛 Boss spécialisé
│   ├── Party.ts                    # 👥 Gestion du groupe
│   ├── Inventory.ts                # 🎒 Gestion de l'inventaire
│   ├── Item.ts                     # 📦 Interface des objets
│   ├── Player.ts                   # ⚠️ Deprecated (compatibilité)
│   ├── MonsterFactory.ts           # 🏭 Création d'ennemis
│   ├── index.ts                    # Exports centralisés
│   │
│   ├── classes/                    # 6️⃣ Classes Jouables
│   │   ├── Warrior.ts              # ⚔️ Guerrier
│   │   ├── Mage.ts                 # 🔮 Mage
│   │   ├── Paladin.ts              # ✨ Paladin
│   │   ├── Barbarian.ts            # 💢 Barbare
│   │   ├── Priest.ts               # ✝️ Prêtre
│   │   └── Rogue.ts                # 🗡️ Voleur
│   │
│   └── items/                      # 4️⃣ Types d'Objets
│       ├── Potion.ts               # 🧪 Potion
│       ├── Ether.ts                # 💊 Ether (mana)
│       ├── StarFragment.ts         # ✨ Morceau d'étoile
│       └── HalfStar.ts             # 🌟 Demi-étoile
├── dungeon/                        # 🏰 Système de Salles
│   ├── Room.ts                     # 🚪 Classe abstraite
│   ├── CombatRoom.ts               # ⚔️ Salle de combat
│   ├── TreasureRoom.ts             # 🧰 Salle trésor
│   └── BossRoom.ts                 # 🧛 Salle du boss
├── game/
│   ├── Fight.ts                    # ⚔️ Système de combat
│   └── GameManager.ts              # 🎮 Gestionnaire principal
└── utils/
    └── Menu.ts                     # 📋 Interface CLI
```

---

## 🎮 6 Classes Jouables

### ⚔️ Guerrier
- **HP**: 120 | **ATK**: 18 | **DEF**: 10 | **SPD**: 8
- Attaque normale, Posture défensive, Coup puissant

### 🔮 Mage
- **HP**: 80 | **ATK**: 12 | **DEF**: 3 | **SPD**: 9 | **Mana**: 100
- Attaque bâton, Boule de feu, Éclair de foudre

### ✨ Paladin
- **HP**: 110 | **ATK**: 16 | **DEF**: 8 | **SPD**: 7 | **Mana**: 80
- Attaque normale, Châtiment divin (AoE), Bouclier sacré

### 💢 Barbare
- **HP**: 140 | **ATK**: 20 | **DEF**: 5 | **SPD**: 6
- Attaque normale, Rage Berserk (130% dmg, -20% HP), Soif de sang

### ✝️ Prêtre
- **HP**: 90 | **ATK**: 10 | **DEF**: 6 | **SPD**: 8 | **Mana**: 120
- Attaque normale, Soin allié, Soin groupe, Lumière sacrée

### 🗡️ Voleur
- **HP**: 95 | **ATK**: 14 | **DEF**: 4 | **SPD**: 14 (le plus rapide!)
- Attaque normale, Attaque sournoise, Voler (30% potion, 10% éther, 5% demi-étoile)

---

## 🎒 Système d'Inventaire

### 📦 Objets au Départ
- 2x Potion 🧪 (restaure 30% HP)
- 1x Ether 💊 (restaure 40% Mana)
- 1x Morceau d'étoile ✨ (restaure 100% HP et Mana)

### 💰 Récompenses de Trésors
- Potion 🧪
- Ether 💊
- Fragment d'étoile ✨
- Demi-étoile 🌟 (restaure 100% HP si K.O., soigne 100% si vivant)

### 🎯 Utilisation en Combat
À chaque tour, vous pouvez:
- Attaquer
- Utiliser une compétence spéciale
- **🎒 Utiliser un objet** ← Nouveau!
- Passer votre tour

---

## 🛠️ Installation & Lancement

### Prérequis
- **Deno** (v1.40+) OU **Node.js** (v16+)

### Option 1 : Avec Deno (Recommandé)
```bash
# Cloner et entrer dans le répertoire
cd projetrpg

# Lancer le jeu
deno run --allow-read --allow-write src/index.ts
```

### Option 2 : Avec Node.js/npm
```bash
npm install
npm run build
npm start
```

### Option 3 : Mode Watch (développement)
```bash
deno run --allow-read --allow-write --watch src/index.ts
```

---

## ⚙️ Architecture OOP

### 🏛️ Principes Appliqués

#### 1. **Héritage**
```
Character (abstraite)
├── Adventurer (classe de base)
│   ├── Warrior
│   ├── Mage
│   ├── Paladin
│   ├── Barbarian
│   ├── Priest
│   └── Rogue
└── Monster
    └── Boss (hérite de Monster)
```

#### 2. **Polymorphisme**
- Chaque classe override `performAction()` avec son propre menu
- Chaque classe override `executeAction()` avec ses compétences
- Interface `Item` implémentée par 4 types d'objets

#### 3. **Encapsulation**
- Propriétés **private** : `hp`, `mana`, `experience`
- Propriétés **protected** : accessibles aux sous-classes
- Accesseurs publics (getters) : `getName()`, `getHp()`, `getMana()`

#### 4. **Abstraction**
- `Character` : classe abstraite avec méthodes abstraites
- `Room` : classe abstraite pour les salles
- Forces l'implémentation dans les sous-classes

#### 5. **Composition**
- `Party` contient `Inventory` et liste d'`Adventurer`
- `Fight` utilise deux listes de `Character`
- `GameManager` orchestrate le jeu

#### 6. **Pas de Singleton**
- Instanciation normale avec `new`
- Objets passés en paramètres
- Architecture flexible et testable

---

## ✅ Fonctionnalités Complètes

### Étape 1 ✅
- Système de dégâts et défense
- Soins et résurrection
- Combat tour par tour
- Tri par vitesse

### Étape 2 ✅
- 6 classes d'aventuriers avec spécialités
- IA des monstres (20% cible faible, 80% aléatoire)
- Boss avec attaque de zone
- Combat polymorphe asynchrone

### Étape 3 ✅
- 5 salles à explorer
- Système d'inventaire
- **4 types d'objets utilisables en combat** ← Nouveau!
- Coffres avec 35% de chance de piège
- Condition de victoire/défaite

---

## 🎯 Contraintes Respectées

✅ **POO Pure** : Maximum 10 lignes hors classes (vérifier index.ts)
✅ **TypeScript strict** : Types, interfaces, modificateurs d'accès
✅ **KISS & DRY** : Code simple, sans répétition
✅ **Pas de Singleton** : Architecture par composition
✅ **Héritage & Polymorphisme** : Utilisés à bon escient
✅ **Gestion des erreurs** : Validation des saisies utilisateur

---

## 🚀 Guide Rapide

```bash
# 1. Lancer le jeu
deno run --allow-read --allow-write src/index.ts

# 2. Entrer votre nom et choisir une classe
# 3. Voir l'équipement initial
# 4. Entrer en combat
# 5. Choisir "🎒 Utiliser un objet" pour vous soigner!
# 6. Continuer les 5 salles
# 7. Vaincu le boss = VICTOIRE! 🏆
```

---

## 📊 Statistiques du Projet

| Métrique | Valeur |
|----------|--------|
| Fichiers TypeScript | 23 |
| Lignes de code | ~3000 |
| Classes abstraites | 2 |
| Classes implémentées | 12 |
| Interfaces | 2 |
| Héritage utilisé | ✅ Oui |
| Polymorphisme utilisé | ✅ Oui |
| Singleton utilisé | ❌ Non |
| Tests manuels | ✅ Passés |

---

## 📚 Documentation

- **[ETAPE2.md](ETAPE2.md)** - Documentation technique détaillée
- **[CLASSES_GUIDE.md](CLASSES_GUIDE.md)** - Guide des 6 classes
- **[TEST_GUIDE.md](TEST_GUIDE.md)** - Scénarios de test

---

## 🎨 Principes de Clean Code

✅ Nommage clair (camelCase, PascalCase appropriés)
✅ Indentation 2 espaces
✅ Commentaires JSDoc sur les méthodes publiques
✅ Pas de code mort
✅ Séparation métier/interface
✅ Gestion d'erreurs robuste

---

**Version**: 3.0  
**Status**: ✅ Complète  
**Dernière mise à jour**: 27 Janvier 2026
