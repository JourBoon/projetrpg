# 🦕 Migration Deno + Suppression du Singleton

## ✅ Changements effectués

### 1. 🦕 **Migration vers Deno**

#### Menu.ts - Remplacement de Node.js readline
**Avant** (Node.js):
```typescript
import * as readline from 'readline';

export class Menu {
  private prompt: readline.Interface;

  constructor() {
    this.prompt = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
}
```

**Après** (Deno):
```typescript
export class Menu {
  private encoder: TextEncoder;
  private decoder: TextDecoder;

  constructor() {
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }

  public async ask(question: string): Promise<string> {
    await Deno.stdout.write(this.encoder.encode(question));
    const buf = new Uint8Array(1024);
    const n = await Deno.stdin.read(buf);
    // ...
  }
}
```

#### GameManager.ts - Remplacement de process.exit
**Avant**: `process.exit(0)`  
**Après**: `Deno.exit(0)`

#### index.ts - Shebang Deno
**Avant**: `#!/usr/bin/env node`  
**Après**: `#!/usr/bin/env -S deno run --allow-read --allow-write`

#### Tous les imports - Extensions .ts ajoutées
**Avant**: `import { Character } from './Character';`  
**Après**: `import { Character } from './Character.ts';`

---

### 2. 🚫 **Suppression du pattern Singleton**

#### GameManager.ts
**Avant** (Singleton):
```typescript
export class GameManager {
  private static instance: GameManager;
  
  private constructor() { ... }
  
  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }
}
```

**Après** (Classe normale):
```typescript
export class GameManager {
  constructor() {
    this.menu = new Menu();
    this.player = null;
  }
}
```

#### index.ts
**Avant**: `const game = GameManager.getInstance();`  
**Après**: `const game = new GameManager();`

---

### 3. 🔧 **Configuration Deno**

Création de `deno.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    // ...
  },
  "tasks": {
    "start": "deno run --allow-read --allow-write src/index.ts",
    "dev": "deno run --allow-read --allow-write --watch src/index.ts"
  }
}
```

---

### 4. ✅ **Corrections TypeScript strictes**

Pour passer la compilation stricte de Deno, les paramètres non utilisés sont préfixés par `_`:

```typescript
// Avant
public async performAction(allies: Character[], enemies: Character[]): Promise<void>

// Après
public async performAction(_allies: Character[], enemies: Character[]): Promise<void>
```

Ajout du modificateur `override` dans Boss.ts:
```typescript
public override async performAction(_allies: Character[], enemies: Character[]): Promise<void>
```

---

## 📦 Fichiers modifiés

### Fichiers adaptés pour Deno
1. ✅ [src/utils/Menu.ts](projetrpg/src/utils/Menu.ts) - API Deno natives
2. ✅ [src/game/GameManager.ts](projetrpg/src/game/GameManager.ts) - Deno.exit() + suppression Singleton
3. ✅ [src/index.ts](projetrpg/src/index.ts) - Shebang Deno + instanciation normale

### Tous les fichiers .ts (17 fichiers)
Extensions `.ts` ajoutées dans tous les imports:
- Character.ts
- Adventurer.ts
- Monster.ts
- Boss.ts
- Player.ts
- Warrior.ts, Mage.ts, Paladin.ts, Barbarian.ts, Priest.ts, Rogue.ts
- Fight.ts
- GameManager.ts
- Menu.ts
- CharacterStats.ts
- index.ts

### Nouveaux fichiers
4. ✅ [deno.json](projetrpg/deno.json) - Configuration Deno
5. ✅ [test.ts](projetrpg/test.ts) - Script de test automatique

---

## 🧪 Tests effectués

### Test automatique (test.ts)
```bash
deno run --allow-read --allow-write test.ts
```

**Résultats**:
- ✅ Test 1: Importation de tous les modules
- ✅ Test 2: Création d'instances de toutes les classes
- ✅ Test 3: Vérification que le Singleton a été supprimé
- ✅ Test 4: Vérification du polymorphisme (performAction)

### Stats affichées par les tests
```
📊 Stats des aventuriers:
  Test Warrior (Guerrier) - HP: 120, ATK: 18, DEF: 10, SPD: 8
  Test Mage (Mage) - HP: 80, MANA: 100, ATK: 12, SPD: 9
  Test Paladin (Paladin) - HP: 110, MANA: 80, DEF: 8
  Test Barbarian (Barbare) - HP: 140, ATK: 20, SPD: 6
  Test Priest (Prêtre) - HP: 90, MANA: 120
  Test Rogue (Voleur) - HP: 95, SPD: 14

📊 Stats des monstres:
  Gobelin - HP: 50, ATK: 10, DEF: 2
  Orc - HP: 80, ATK: 15, DEF: 5
  Dragon - HP: 150, ATK: 25, DEF: 10
  Chef de Guerre Orc (BOSS) - HP: 180, ATK: 28
```

---

## 🚀 Utilisation avec Deno

### Installation de Deno
```bash
curl -fsSL https://deno.land/install.sh | sh
```

### Vérification de l'installation
```bash
deno --version
# deno 2.6.5 (stable, release, x86_64-unknown-linux-gnu)
# v8 14.2.231.17-rusty
# typescript 5.9.2
```

### Vérifier la compilation
```bash
deno check src/index.ts
```

### Lancer le jeu
```bash
# Méthode 1: Utiliser deno task
deno task start

# Méthode 2: Commande complète
deno run --allow-read --allow-write src/index.ts

# Méthode 3: Mode développement avec watch
deno task dev
```

### Lancer les tests
```bash
deno run --allow-read --allow-write test.ts
```

---

## 🎯 Avantages de la migration

### Deno vs Node.js
✅ **Pas de package.json** - Deno gère nativement TypeScript  
✅ **Pas de node_modules** - Imports directs  
✅ **Sécurité** - Permissions explicites (--allow-read, --allow-write)  
✅ **TypeScript natif** - Pas de compilation séparée  
✅ **APIs modernes** - TextEncoder, Deno.stdin, Deno.stdout  
✅ **Plus rapide** - Pas de transpilation

### Sans Singleton
✅ **Plus flexible** - Plusieurs instances possibles  
✅ **Meilleure testabilité** - Isolation des tests  
✅ **Plus simple** - Pas de méthode getInstance()  
✅ **SOLID** - Moins de couplage  

---

## 📊 Comparaison

### Avant (Node.js + Singleton)
```typescript
// Installation
npm install
npm run build
npm start

// Code
const game = GameManager.getInstance(); // Singleton
game.start();
```

### Après (Deno + Classe normale)
```typescript
// Installation
# Rien ! Deno compile à la volée

// Lancement
deno task start

// Code
const game = new GameManager(); // Instanciation normale
await game.start();
```

---

## 🎉 Résultat

✅ **100% compatible Deno**  
✅ **0 Singleton dans le projet**  
✅ **Tous les tests passent**  
✅ **Code plus simple et moderne**  
✅ **Mêmes fonctionnalités (6 classes, IA, Boss, etc.)**  

Le projet est maintenant **entièrement migré vers Deno** avec **aucun pattern Singleton** ! 🦕🚀
