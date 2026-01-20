# 🎮 RPG CLI - Étape 2 : Classes Spécialisées & Combat Polymorphe

## ✅ Implémentation complète

### 📊 Architecture mise à jour

```
src/
├── index.ts                           # Point d'entrée (8 lignes)
├── interfaces/
│   └── CharacterStats.ts              # Interface avec mana ajouté
├── models/
│   ├── Character.ts                   # Classe abstraite avec performAction()
│   ├── Adventurer.ts                  # Classe de base pour aventuriers
│   ├── Monster.ts                     # Monstres avec IA (20% cible faible)
│   ├── Boss.ts                        # Boss avec attaque de zone (30%)
│   ├── Player.ts                      # ⚠️ OBSOLÈTE - remplacé par Adventurer
│   ├── index.ts                       # Exports centralisés
│   └── classes/
│       ├── Warrior.ts                 # Guerrier - Équilibré, haute défense
│       ├── Mage.ts                    # Mage - Attaques magiques, utilise Mana
│       ├── Paladin.ts                 # Paladin - Attaque de zone sainte
│       ├── Barbarian.ts               # Barbare - Attaque Berserk
│       ├── Priest.ts                  # Prêtre - Soins
│       └── Rogue.ts                   # Voleur - Voler, grande vitesse
├── game/
│   ├── Fight.ts                       # Combat polymorphe asynchrone
│   └── GameManager.ts                 # Gestion du jeu mise à jour
└── utils/
    └── Menu.ts                        # Interface CLI

```

---

## ⚔️ 1. CLASSES D'AVENTURIERS (6 classes)

### 🛡️ Guerrier (Warrior)
- **Stats** : HP 120, ATK 18, DEF 10, SPD 8
- **Actions** :
  - Attaque normale
  - Posture défensive (+50% DEF ce tour)
  - Coup puissant (150% ATK, 80% précision)

### 🔮 Mage (Mage)
- **Stats** : HP 80, ATK 12, DEF 3, SPD 9, MANA 100
- **Mécanique** : Utilise du Mana pour les sorts
- **Actions** :
  - Attaque normale (bâton)
  - Boule de feu (30 mana, 150% ATK, **ignore la défense**)
  - Éclair de foudre (50 mana, 200% ATK, **ignore la défense**)

### ✨ Paladin (Paladin)
- **Stats** : HP 110, ATK 16, DEF 8, SPD 7, MANA 80
- **Actions** :
  - Attaque normale
  - **Châtiment Divin** (40 mana, 40% ATK sur **TOUS les ennemis**)
  - Bouclier Sacré (25 mana, +100% DEF ce tour)

### 💢 Barbare (Barbarian)
- **Stats** : HP 140, ATK 20, DEF 5, SPD 6
- **Actions** :
  - Attaque normale
  - **Rage Berserk** (130% ATK, coûte 20% HP max)
  - Soif de sang (attaque + vol 30% des dégâts infligés)

### ✝️ Prêtre (Priest)
- **Stats** : HP 90, ATK 10, DEF 6, SPD 8, MANA 120
- **Rôle** : Soutien
- **Actions** :
  - Attaque normale
  - **Soin** (20 mana, restaure 25% HP d'un allié)
  - Soin de groupe (40 mana, 15% HP à tous les alliés)
  - Lumière Sacrée (30 mana, attaque magique)

### 🗡️ Voleur (Rogue)
- **Stats** : HP 95, ATK 14, DEF 4, **SPD 14** (le plus rapide)
- **Actions** :
  - Attaque normale
  - Attaque sournoise (2x dégâts si plus rapide que la cible)
  - **Voler** (probabilités de butin) :
    - 30% : Potion de Soin
    - 10% : Éther (Mana)
    - 5% : Gemme Précieuse
    - Sinon : 50-100 pièces d'or

---

## 👹 2. SYSTÈME D'ENNEMIS

### Monster (Classe mise à jour)
- **IA Simpliste** :
  - 20% de chances de viser le personnage avec les **PV les plus bas**
  - 80% de chances de viser **au hasard**
- Délai de 1 seconde après chaque action pour la lisibilité

### Boss (Nouvelle classe)
- Hérite de Monster
- **Attaque de zone** : 30% de probabilité de frapper tous les adversaires (60% ATK)
- **Boss prédéfinis** :
  - **Chef de Guerre Orc** : 180 HP, 28 ATK, "Rage Destructrice"
  - **Dragon Ancien** : 250 HP, 30 ATK, "Souffle de Flammes"
  - **Seigneur Démon** : 300 HP, 35 ATK, "Vague des Ténèbres"

---

## 🔄 3. BOUCLE DE COMBAT POLYMORPHE

### Mécanisme polymorphe
```typescript
// Character.ts (abstraite)
public abstract performAction(allies: Character[], enemies: Character[]): Promise<void>;

// Adventurer → Menu interactif
public async performAction(allies, enemies) {
  const actions = this.getAvailableActions();
  const choice = await this.menu.selectOption(actions);
  await this.executeAction(choice, allies, enemies);
}

// Monster → IA automatique
public async performAction(allies, enemies) {
  const target = Math.random() < 0.2 
    ? this.selectWeakestTarget(enemies)  // 20% cible faible
    : randomEnemy(enemies);               // 80% aléatoire
  this.attackTarget(target);
  await this.delay(1000); // Délai 1s
}
```

### Fight.ts - Boucle asynchrone
- La méthode `start()` est maintenant **asynchrone**
- Appel polymorphe : `await attacker.performAction(allies, enemies)`
- Gestion automatique :
  - Si Adventurer → affiche menu et attend choix
  - Si Monster/Boss → exécute IA avec délai

---

## 🎯 CONTRAINTES RESPECTÉES

✅ **Héritage & Override** : Toutes les classes héritent correctement  
✅ **Méthodes abstraites** : `performAction()` force l'implémentation  
✅ **Gestion du Mana** : Intégrée pour Mage, Paladin, Prêtre  
✅ **Formules exactes** :
- Paladin : 40% ATK sur tous
- Barbare : 130% ATK, coûte 20% HP
- Prêtre : Soin 25% HP
- Voleur : Probabilités 30%/10%/5%

✅ **IA Monster** : 20% cible faible, 80% aléatoire  
✅ **Boss** : Attaque de zone 30% de probabilité  
✅ **Délai** : 1 seconde après action monstre  
✅ **Polymorphisme** : Combat géré par `performAction()`

---

## 🚀 Utilisation

### Installation
```bash
cd /home/tim/projetrpg
npm install
```

### Compilation
```bash
npm run build
```

### Lancement
```bash
npm start
```

### Mode développement
```bash
npm run dev
```

---

## 📝 Changements techniques

### Character.ts
- Ajout de `mana` et `maxMana`
- Méthode abstraite `performAction()`
- Méthode `takeDamage()` avec paramètre `ignoreDefense`
- Méthode `takeTrueDamage()` pour dégâts purs
- Méthodes `consumeMana()` et `restoreMana()`

### Adventurer.ts (nouvelle classe intermédiaire)
- Remplace l'ancienne `Player.ts`
- Gère niveau, XP, menu d'action
- Méthodes abstraites pour actions disponibles
- Sélection de cibles (ennemis/alliés)

### Fight.ts
- Méthode `start()` asynchrone
- Méthode `executeTurn()` asynchrone
- Appel polymorphe de `performAction()`
- Ajout de `getAllyTeam()`

### GameManager.ts
- Choix de la classe d'aventurier au démarrage
- Menu avec 6 classes
- Menu combat avec 3 monstres + 3 boss
- Combat asynchrone avec `await`

---

## 🎮 Gameplay

1. **Création du personnage** : Choisir parmi 6 classes
2. **Menu principal** :
   - Combattre (monstres ou boss)
   - Voir statistiques
   - Quitter
3. **Combat** :
   - Tour par tour basé sur la vitesse
   - Actions interactives pour le joueur
   - IA automatique pour les ennemis
   - Délai entre les actions des monstres
4. **Progression** :
   - Gain d'XP après victoire
   - Montée de niveau automatique
   - Stats améliorées

---

## 🎯 Prochaines étapes potentielles (Étape 3)

- Système d'inventaire complet
- Équipements et objets consommables
- Sauvegarde/Chargement de partie
- Combats multiples (plusieurs joueurs)
- Compétences déblocables par niveau
- Effets de statut (poison, brûlure, etc.)
