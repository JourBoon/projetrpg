#!/usr/bin/env -S deno run --allow-read --allow-write

export {};

const deno = (globalThis as { Deno?: { exit: (code: number) => void } }).Deno;
const exit = (code: number) => deno?.exit(code);

/**
 * Script de test automatique pour le RPG CLI
 * Simule des interactions utilisateur
 */

console.log('🧪 Test du RPG CLI avec Deno\n');

// Test 1: Vérifier que tous les fichiers peuvent être importés
console.log('📦 Test 1: Importation des modules...');

try {
  await import('../src/models/Character.ts');
  await import('../src/models/Adventurer.ts');
  await import('../src/models/Monster.ts');
  await import('../src/models/Boss.ts');
  await import('../src/models/classes/Warrior.ts');
  await import('../src/models/classes/Mage.ts');
  await import('../src/models/classes/Paladin.ts');
  await import('../src/models/classes/Barbarian.ts');
  await import('../src/models/classes/Priest.ts');
  await import('../src/models/classes/Rogue.ts');
  await import('../src/game/Fight.ts');
  await import('../src/game/GameManager.ts');
  await import('../src/utils/Menu.ts');
  
  console.log('✅ Tous les modules importés avec succès!\n');
} catch (error) {
  console.error('❌ Erreur lors de l\'importation:', error);
  exit(1);
}

// Test 2: Créer des instances de chaque classe
console.log('🏗️  Test 2: Création des instances...');

try {
  const { Warrior } = await import('../src/models/classes/Warrior.ts');
  const { Mage } = await import('../src/models/classes/Mage.ts');
  const { Paladin } = await import('../src/models/classes/Paladin.ts');
  const { Barbarian } = await import('../src/models/classes/Barbarian.ts');
  const { Priest } = await import('../src/models/classes/Priest.ts');
  const { Rogue } = await import('../src/models/classes/Rogue.ts');
  const { Monster } = await import('../src/models/Monster.ts');
  const { Boss } = await import('../src/models/Boss.ts');
  
  const warrior = new Warrior('Test Warrior');
  const mage = new Mage('Test Mage');
  const paladin = new Paladin('Test Paladin');
  const barbarian = new Barbarian('Test Barbarian');
  const priest = new Priest('Test Priest');
  const rogue = new Rogue('Test Rogue');
  
  const goblin = Monster.createGoblin();
  const orc = Monster.createOrc();
  const dragon = Monster.createDragon();
  
  const boss = Boss.createOrcWarlord();
  
  console.log('✅ Toutes les instances créées avec succès!\n');
  
  // Afficher les stats
  console.log('📊 Stats des aventuriers:');
  console.log(`  ${warrior.getName()} (${warrior.getClassName()}) - HP: ${warrior.getHp()}, ATK: ${warrior.getAttack()}, DEF: ${warrior.getDefense()}, SPD: ${warrior.getSpeed()}`);
  console.log(`  ${mage.getName()} (${mage.getClassName()}) - HP: ${mage.getHp()}, MANA: ${mage.getMana()}, ATK: ${mage.getAttack()}, SPD: ${mage.getSpeed()}`);
  console.log(`  ${paladin.getName()} (${paladin.getClassName()}) - HP: ${paladin.getHp()}, MANA: ${paladin.getMana()}, DEF: ${paladin.getDefense()}`);
  console.log(`  ${barbarian.getName()} (${barbarian.getClassName()}) - HP: ${barbarian.getHp()}, ATK: ${barbarian.getAttack()}, SPD: ${barbarian.getSpeed()}`);
  console.log(`  ${priest.getName()} (${priest.getClassName()}) - HP: ${priest.getHp()}, MANA: ${priest.getMana()}`);
  console.log(`  ${rogue.getName()} (${rogue.getClassName()}) - HP: ${rogue.getHp()}, SPD: ${rogue.getSpeed()}`);
  
  console.log('\n📊 Stats des monstres:');
  console.log(`  ${goblin.getName()} - HP: ${goblin.getHp()}, ATK: ${goblin.getAttack()}, DEF: ${goblin.getDefense()}`);
  console.log(`  ${orc.getName()} - HP: ${orc.getHp()}, ATK: ${orc.getAttack()}, DEF: ${orc.getDefense()}`);
  console.log(`  ${dragon.getName()} - HP: ${dragon.getHp()}, ATK: ${dragon.getAttack()}, DEF: ${dragon.getDefense()}`);
  console.log(`  ${boss.getName()} (BOSS) - HP: ${boss.getHp()}, ATK: ${boss.getAttack()}`);
  
} catch (error) {
  console.error('❌ Erreur lors de la création des instances:', error);
  exit(1);
}

// Test 3: Tester le GameManager (sans Singleton)
console.log('\n🎮 Test 3: GameManager (sans Singleton)...');

try {
  const { GameManager } = await import('../src/game/GameManager.ts');
  
  // Créer plusieurs instances pour prouver qu'il n'y a pas de Singleton
  const game1 = new GameManager();
  const game2 = new GameManager();
  
  if (game1 === game2) {
    console.error('❌ ERREUR: Les instances sont identiques (Singleton détecté!)');
    exit(1);
  }
  
  console.log('✅ GameManager sans Singleton vérifié (instances différentes)!\n');
  
} catch (error) {
  console.error('❌ Erreur lors du test GameManager:', error);
  exit(1);
}

// Test 4: Vérifier les méthodes abstraites
console.log('🔍 Test 4: Vérification du polymorphisme...');

try {
  const { Warrior } = await import('../src/models/classes/Warrior.ts');
  const { Monster } = await import('../src/models/Monster.ts');
  
  const warrior = new Warrior('Polymorphism Test');
  const monster = Monster.createGoblin();
  
  // Vérifier que les deux ont la méthode performAction
  if (typeof warrior.performAction !== 'function') {
    throw new Error('Warrior n\'a pas la méthode performAction');
  }
  
  if (typeof monster.performAction !== 'function') {
    throw new Error('Monster n\'a pas la méthode performAction');
  }
  
  console.log('✅ Polymorphisme vérifié (performAction présente)!\n');
  
} catch (error) {
  console.error('❌ Erreur lors du test de polymorphisme:', error);
  exit(1);
}

console.log('🎉 TOUS LES TESTS SONT PASSÉS!\n');
console.log('✨ Le projet est compatible Deno et sans Singleton.\n');
console.log('📝 Pour lancer le jeu:');
console.log('   deno task start');
console.log('   ou');
console.log('   deno run --allow-read --allow-write src/index.ts\n');
