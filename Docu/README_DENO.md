# 🦕 RPG CLI - Version Deno 2.0

## ⚡ Démarrage rapide

```bash
# Lancer le jeu
deno task start

# Mode développement (rechargement automatique)
deno task dev

# Lancer les tests
deno run --allow-read --allow-write test.ts
```

## 🎮 Fonctionnalités

- ⚔️ **6 classes jouables** : Guerrier, Mage, Paladin, Barbare, Prêtre, Voleur
- 👹 **Ennemis intelligents** : IA avec ciblage stratégique (20% cible faible)
- 🐉 **3 Boss** avec attaques de zone (30% probabilité)
- 🔮 **Système de Mana** pour les classes magiques
- 💪 **Actions variées** : Chaque classe a 3-4 actions uniques
- 📈 **Progression** : Système d'XP et de montée de niveau
- 🎯 **Combat polymorphe** : Menu interactif pour joueurs, IA pour monstres

## 📦 Installation

### Installer Deno
```bash
curl -fsSL https://deno.land/install.sh | sh
```

### Cloner et lancer
```bash
cd projetrpg
deno task start
```

## 🏗️ Architecture

- **POO pure** : < 10 lignes hors classes
- **TypeScript strict** : Types, interfaces, classes abstraites
- **Polymorphisme** : Méthode abstraite `performAction()`
- **Sans Singleton** : GameManager instanciable normalement
- **Deno natif** : APIs modernes (TextEncoder, Deno.stdin)

## 🧪 Tests

Le fichier [test.ts](test.ts) vérifie :
- ✅ Importation de tous les modules
- ✅ Création d'instances de toutes les classes
- ✅ Absence de Singleton
- ✅ Polymorphisme fonctionnel

## 📚 Documentation

- [DENO_MIGRATION.md](DENO_MIGRATION.md) - Guide de migration Node.js → Deno
- [ETAPE2.md](ETAPE2.md) - Documentation technique complète
- [CLASSES_GUIDE.md](CLASSES_GUIDE.md) - Guide des 6 classes
- [TEST_GUIDE.md](TEST_GUIDE.md) - Scénarios de test

## 🎯 Permissions Deno

Le jeu nécessite :
- `--allow-read` : Lecture de l'entrée utilisateur
- `--allow-write` : Écriture sur stdout/stderr

## 💡 Exemple d'utilisation

```typescript
import { GameManager } from './src/game/GameManager.ts';

// Créer une instance (pas de Singleton!)
const game = new GameManager();

// Lancer le jeu
await game.start();
```

## 🦕 Pourquoi Deno ?

- ✅ TypeScript natif (pas de compilation)
- ✅ Sécurité par défaut (permissions)
- ✅ Pas de node_modules
- ✅ APIs modernes
- ✅ Plus rapide

---

**Bon jeu !** ⚔️🔮✨
