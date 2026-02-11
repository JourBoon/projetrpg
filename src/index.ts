#!/usr/bin/env -S deno run --allow-read --allow-write

import { GameManager } from './game/GameManager.ts';

const game = new GameManager();
await game.start();
