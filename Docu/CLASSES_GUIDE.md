# ⚔️ Guide des Classes - Actions et Stratégies

## 🛡️ GUERRIER (Warrior)
**Stats de base** : HP 120 | ATK 18 | DEF 10 | SPD 8

### Actions disponibles
1. **⚔️ Attaque normale**
   - Dégâts : 18 (ATK)
   - Utilisation : Combat standard

2. **🛡️ Posture défensive**
   - Effet : +50% DEF ce tour (+5 DEF)
   - Coût : Aucun
   - Stratégie : Utiliser avant une grosse attaque ennemie

3. **💥 Coup puissant**
   - Dégâts : 27 (150% ATK)
   - Précision : 80%
   - Risque : 20% de rater
   - Stratégie : Finir un ennemi affaibli

### Montée de niveau
- HP +25 | ATK +4 | DEF +3 | SPD +1

---

## 🔮 MAGE (Mage)
**Stats de base** : HP 80 | ATK 12 | DEF 3 | SPD 9 | MANA 100

### Actions disponibles
1. **⚔️ Attaque normale**
   - Dégâts : 12 (bâton)
   - Usage : Économiser le mana

2. **🔮 Boule de feu** (30 mana)
   - Dégâts : 18 (150% ATK)
   - **IGNORE LA DÉFENSE** ⚡
   - Stratégie : Ennemis haute défense

3. **⚡ Éclair de foudre** (50 mana)
   - Dégâts : 24 (200% ATK)
   - **IGNORE LA DÉFENSE** ⚡
   - Coût élevé mais dévastateur
   - Stratégie : Boss ou ennemis résistants

### Gestion du Mana
- Total : 100 mana
- Boule de feu : 3 utilisations max
- Éclair : 2 utilisations max
- Économiser pour les combats importants

### Montée de niveau
- HP +15 | MANA +20 | ATK +3 | DEF +1 | SPD +2

---

## ✨ PALADIN (Paladin)
**Stats de base** : HP 110 | ATK 16 | DEF 8 | SPD 7 | MANA 80

### Actions disponibles
1. **⚔️ Attaque normale**
   - Dégâts : 16 (épée sacrée)

2. **✨ Châtiment Divin** (40 mana)
   - Dégâts : 6-7 par ennemi (40% ATK)
   - **TOUCHE TOUS LES ENNEMIS** 🌟
   - Idéal contre groupes
   - Stratégie : Plusieurs ennemis faibles

3. **🛡️ Bouclier Sacré** (25 mana)
   - Effet : +100% DEF ce tour (+8 DEF → 16 DEF total)
   - Stratégie : Survie face aux boss

### Rôle
- Tank offensif
- Contrôle de zone
- Équilibre attaque/défense

### Montée de niveau
- HP +22 | MANA +15 | ATK +3 | DEF +2 | SPD +1

---

## 💢 BARBARE (Barbarian)
**Stats de base** : HP 140 | ATK 20 | DEF 5 | SPD 6

### Actions disponibles
1. **⚔️ Attaque normale**
   - Dégâts : 20 (la plus haute ATK de base)

2. **💢 Rage Berserk**
   - Dégâts : 26 (130% ATK)
   - **Coût : 28 HP (20% HP max)** ⚠️
   - Attention : Peut se tuer soi-même !
   - Stratégie : Finir rapidement le combat

3. **🩸 Soif de sang**
   - Dégâts : 20 (ATK normale)
   - **Vol de vie : 30% des dégâts infligés**
   - Exemple : 20 dégâts → récupère 6 HP
   - Stratégie : Sustain dans les longs combats

### Style de jeu
- Agressif et risqué
- HP élevés pour compenser
- Finir rapidement les combats

### Montée de niveau
- HP +30 | ATK +5 | DEF +1 | SPD +1

---

## ✝️ PRÊTRE (Priest)
**Stats de base** : HP 90 | ATK 10 | DEF 6 | SPD 8 | MANA 120

### Actions disponibles
1. **⚔️ Attaque normale**
   - Dégâts : 10 (marteau)
   - Faible, mais pas là pour ça

2. **✨ Soin** (20 mana)
   - Restaure : 25% HP max d'un allié
   - Exemple : 90 HP max → +22 HP
   - Usage : 6 fois max (120 mana / 20)
   - Stratégie : Maintenir l'équipe en vie

3. **🌟 Soin de groupe** (40 mana)
   - Restaure : 15% HP à TOUS les alliés
   - Usage : 3 fois max
   - Stratégie : Plusieurs alliés blessés

4. **🔆 Lumière Sacrée** (30 mana)
   - Dégâts : 18 (180% ATK)
   - **IGNORE LA DÉFENSE** ⚡
   - Stratégie : Contribution offensive

### Rôle
- **Support principal** 🏥
- Maintien de l'équipe
- Dégâts magiques occasionnels

### Montée de niveau
- HP +18 | MANA +25 | ATK +2 | DEF +2 | SPD +1

---

## 🗡️ VOLEUR (Rogue)
**Stats de base** : HP 95 | ATK 14 | DEF 4 | **SPD 14** (le plus rapide)

### Actions disponibles
1. **⚔️ Attaque normale**
   - Dégâts : 14 (dagues)

2. **🗡️ Attaque sournoise**
   - Condition : Vitesse > cible
   - Dégâts si succès : 28 (2x ATK)
   - Dégâts si échec : 14 (ATK normale)
   - Ennemis lents (Orc SPD 5) : Toujours 2x
   - Ennemis rapides (Dragon SPD 12) : 1x seulement

3. **💰 Voler**
   - **Aucun dégât** (n'attaque pas)
   - Probabilités de butin :
     - 30% : **Potion de Soin** 🧪
     - 10% : **Éther (Mana)** 💙
     - 5% : **Gemme Précieuse** 💎
     - Sinon : **50-100 pièces d'or** 💰
   - Stratégie : Utiliser en début de combat

### Vitesse comparative
- Voleur : 14 → Joue en premier
- Dragon : 12
- Mage/Prêtre : 9/8
- Guerrier : 8
- Gobelin : 8
- Barbare : 6
- Paladin : 7
- Orc : 5

### Style de jeu
- **Frappe en premier** ⚡
- Burst damage avec attaque sournoise
- Accumule des ressources (voler)

### Montée de niveau
- HP +18 | ATK +3 | DEF +1 | SPD +2

---

## 🎯 Tableaux de comparaison

### Dégâts maximum par tour
| Classe | Action | Dégâts | Coût |
|--------|--------|--------|------|
| Barbare | Rage Berserk | 26 | 28 HP |
| Guerrier | Coup puissant | 27 | Rien (80%) |
| Mage | Éclair | 24 | 50 mana |
| Voleur | Att. sournoise | 28 | SPD > cible |
| Prêtre | Lumière Sacrée | 18 | 30 mana |
| Paladin | Attaque normale | 16 | Rien |

### Vitesse (ordre des tours)
1. 🗡️ **Voleur : 14**
2. 🔮 Mage : 9
3. ⚔️ Guerrier / ✝️ Prêtre : 8
4. ✨ Paladin : 7
5. 💢 Barbare : 6

### Points de vie
1. 💢 **Barbare : 140**
2. ⚔️ Guerrier : 120
3. ✨ Paladin : 110
4. 🗡️ Voleur : 95
5. ✝️ Prêtre : 90
6. 🔮 Mage : 80

### Défense
1. ⚔️ **Guerrier : 10**
2. ✨ Paladin : 8
3. ✝️ Prêtre : 6
4. 💢 Barbare : 5
5. 🗡️ Voleur : 4
6. 🔮 Mage : 3

---

## 💡 Stratégies recommandées

### Solo facile
- **Guerrier** : Équilibré, bonne défense
- **Barbare** : HP élevés, dégâts massifs

### Solo difficile
- **Mage** : Ignore la défense, tue vite
- **Voleur** : Frappe en premier, burst damage

### Soutien (futur multi-joueur)
- **Prêtre** : Soutien essentiel
- **Paladin** : Tank et soutien

### Boss
- **Mage** : Ignore défense élevée
- **Paladin** : Attaque de zone + survie
- **Barbare** : Burst damage rapide

---

## 🆚 Matchups recommandés

### vs Gobelin (50 HP, 10 ATK, 2 DEF)
- ✅ Toutes les classes (combat facile)
- 🌟 Voleur : Bon pour voler

### vs Orc (80 HP, 15 ATK, 5 DEF)
- ✅ Mage : Ignore la défense
- ✅ Guerrier/Paladin : Défense suffisante
- ⚠️ Voleur : Attaques sournoise efficace (SPD > 5)

### vs Dragon (150 HP, 25 ATK, 10 DEF)
- ✅ Mage : Crucial (ignore 10 DEF)
- ✅ Paladin : Bouclier Sacré pour survivre
- ⚠️ Prêtre : Se soigner constamment
- ❌ Voleur : Défense trop faible

### vs Boss Dragon Ancien (250 HP, 30 ATK)
- ✅ Barbare : HP élevés, rage berserk
- ✅ Mage : Dégâts magiques constants
- ✅ Paladin : Survie + zone
- ⚠️ Nécessite stratégie

---

**Conseil général** : Adapter sa classe au style de jeu et au type d'ennemi ! 🎮
