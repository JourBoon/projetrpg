#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Point d'entrée du jeu RPG CLI
 * Respect de la contrainte : Maximum 10 lignes hors classes
 * Adapté pour Deno
 */

import { GameManager } from './game/GameManager.ts';

// Instanciation et démarrage du jeu (sans Singleton)
const game = new GameManager();
await game.start();
