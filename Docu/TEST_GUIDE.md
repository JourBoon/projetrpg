# 🎮 Guide de Test - RPG CLI Étape 2

## 📦 Installation

```bash
cd /home/tim/projetrpg

# Installer Node.js et npm si nécessaire
# sudo apt install nodejs npm

# Installer les dépendances
npm install

# Compiler le projet TypeScript
npm run build
```

## 🚀 Lancement

```bash
npm start
# ou
npm run dev
```

## 🧪 Scénarios de test

### Test 1 : Guerrier vs Gobelin
1. Créer un personnage nommé "Arthur"
2. Choisir la classe **Guerrier**
3. Afficher les stats (vérifier HP: 120, ATK: 18, DEF: 10)
4. Combattre un **Gobelin**
5. Tester les 3 actions :
   - Attaque normale
   - Posture défensive (vérifier +50% DEF)
   - Coup puissant (150% ATK, 80% précision)
6. **Résultat attendu** : Victoire, +25 XP

### Test 2 : Mage vs Orc (Gestion du Mana)
1. Créer "Merlin" - classe **Mage**
2. Vérifier stats : HP: 80, MANA: 100, DEF: 3
3. Combattre un **Orc**
4. Actions à tester :
   - Boule de feu (30 mana, ignore la défense !)
   - Éclair de foudre (50 mana, 2x dégâts)
   - Vérifier que le mana diminue
   - Tenter une action sans mana suffisant
5. **Résultat attendu** : Victoire grâce aux attaques magiques

### Test 3 : Paladin - Attaque de Zone
1. Créer "Uther" - classe **Paladin**
2. Combattre 1 ennemi (pour voir l'attaque de zone)
3. Utiliser **Châtiment Divin** (40 mana)
4. **Vérifier** : Message "sur tous les ennemis" même avec 1 cible
5. Essayer avec plusieurs ennemis (créer un combat custom si possible)

### Test 4 : Barbare - Rage Berserk
1. Créer "Conan" - classe **Barbare**
2. Vérifier HP élevés : 140 HP
3. Combattre un **Orc**
4. Utiliser **Rage Berserk**
5. **Vérifier** :
   - Perd 20% de ses HP max (28 HP)
   - Inflige 130% ATK (26 dégâts)
   - HP du Barbare diminue
6. Tester **Soif de sang** : vérifier le vol de vie (30% des dégâts)

### Test 5 : Prêtre - Soutien
1. Créer "Anduin" - classe **Prêtre**
2. Stats : HP: 90, MANA: 120
3. Combattre un **Dragon** (150 HP)
4. Tester les soins :
   - Se soigner soi-même (25% HP)
   - Vérifier consommation mana (20)
5. Tester **Lumière Sacrée** (attaque magique)
6. **Attention** : Combat difficile (faible ATK)

### Test 6 : Voleur - Action Voler
1. Créer "Robin" - classe **Voleur**
2. Vérifier SPD: 14 (le plus rapide)
3. Combattre un **Gobelin**
4. Utiliser **Voler** plusieurs fois
5. **Vérifier les probabilités** :
   - Potion de Soin (~30%)
   - Éther (~10%)
   - Gemme Précieuse (~5%)
   - Or (50-100) sinon
6. Tester **Attaque sournoise** :
   - 2x dégâts si plus rapide que la cible
   - Gobelin SPD: 8 → Devrait fonctionner

### Test 7 : IA des Monstres
1. Créer n'importe quel personnage
2. Combattre plusieurs fois un **Orc**
3. **Observer** :
   - 80% du temps : attaque aléatoire
   - 20% du temps : "cible stratégiquement le plus faible"
4. Vérifier le **délai de 1 seconde** après chaque action du monstre

### Test 8 : Boss - Attaque de Zone
1. Créer un personnage niveau élevé (ou Barbare)
2. Combattre le **Chef de Guerre Orc** (Boss)
3. **Observer** :
   - ~30% du temps : "Rage Destructrice" (attaque de zone)
   - Message : "utilise [NomAttaque] sur tous les adversaires"
   - Tous les personnages de l'équipe prennent des dégâts
4. Vérifier délai de 1 seconde

### Test 9 : Boss Difficile
1. Créer "Test" - **Mage** ou **Paladin**
2. Combattre le **Dragon Ancien** (250 HP, 30 ATK)
3. Utiliser les compétences stratégiquement
4. **Objectif** : Survivre et gagner
5. **Récompenses** : 500 or, 300 XP

### Test 10 : Montée de Niveau
1. Créer n'importe quel personnage
2. Combattre plusieurs ennemis
3. **Observer** la montée de niveau :
   - Message "🎉 [Nom] monte au niveau 2 !"
   - Stats améliorées (HP, ATK, DEF, SPD selon la classe)
   - Soin complet au level up
   - Vérifier que Mage/Paladin/Prêtre gagnent du MANA

## 🐛 Bugs à surveiller

- [ ] Mana négatif
- [ ] HP négatifs
- [ ] Division par zéro si tous les alliés sont KO
- [ ] Boucle infinie si aucune équipe ne peut attaquer
- [ ] Crash lors de la sélection de cible
- [ ] Menu bloqué lors d'une action invalide

## 📊 Vérifications Techniques

### Polymorphisme
- Les aventuriers affichent un menu interactif ✅
- Les monstres utilisent l'IA automatique ✅
- Le délai de 1s est appliqué après les actions des monstres ✅

### Formules
- Paladin : 40% ATK sur tous = 16 * 0.4 = 6.4 → 6 dégâts ✅
- Barbare : 130% ATK = 20 * 1.3 = 26 dégâts ✅
- Barbare : Coût 20% HP max = 140 * 0.2 = 28 HP ✅
- Prêtre : Soin 25% = maxHp * 0.25 ✅
- Voleur : Probabilités 30% / 10% / 5% ✅

### IA Monster
- 20% cible le plus faible ✅
- 80% cible aléatoire ✅

### Boss
- 30% attaque de zone ✅
- 70% attaque normale avec IA ✅

## 🎯 Résultat Attendu

Après tous les tests, vous devriez avoir :
- ✅ 6 classes jouables distinctes
- ✅ Actions variées et équilibrées
- ✅ Gestion du mana fonctionnelle
- ✅ IA des monstres intelligente
- ✅ Boss avec attaques spéciales
- ✅ Combat fluide et asynchrone
- ✅ Montée de niveau progressive

## 📝 Notes

- Les combats sont asynchrones (async/await)
- Le menu attend la saisie de l'utilisateur
- Les délais permettent de suivre le combat
- Les formules respectent exactement l'énoncé
