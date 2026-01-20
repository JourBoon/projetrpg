#!/bin/bash

echo "🦕 Test complet du RPG CLI avec Deno"
echo "====================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Vérification de Deno
echo "1️⃣  Vérification de Deno..."
if deno --version > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Deno installé$(deno --version | head -n1)${NC}"
else
    echo -e "${RED}❌ Deno n'est pas installé${NC}"
    exit 1
fi
echo ""

# Test 2: Compilation TypeScript
echo "2️⃣  Compilation TypeScript..."
if deno check src/index.ts 2>&1 | grep -q "Check src/index.ts"; then
    echo -e "${GREEN}✅ Code compile sans erreur${NC}"
else
    echo -e "${RED}❌ Erreurs de compilation${NC}"
    exit 1
fi
echo ""

# Test 3: Tests automatiques
echo "3️⃣  Exécution des tests automatiques..."
if deno run --allow-read --allow-write test.ts 2>&1 | grep -q "TOUS LES TESTS SONT PASSÉS"; then
    echo -e "${GREEN}✅ Tous les tests passent${NC}"
else
    echo -e "${RED}❌ Tests échoués${NC}"
    exit 1
fi
echo ""

# Test 4: Vérification de l'absence de Singleton
echo "4️⃣  Vérification de l'absence de Singleton..."
if grep -r "getInstance" src/ > /dev/null 2>&1; then
    echo -e "${RED}❌ Pattern Singleton détecté dans le code${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Aucun Singleton trouvé${NC}"
fi
echo ""

# Test 5: Vérification des extensions .ts
echo "5️⃣  Vérification des imports Deno (.ts)..."
if grep -r "from.*\.ts['\"]" src/ > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Imports Deno corrects (avec .ts)${NC}"
else
    echo -e "${RED}❌ Imports manquants ou incorrects${NC}"
    exit 1
fi
echo ""

# Test 6: Vérification de process (doit être Deno)
echo "6️⃣  Vérification des APIs Deno..."
if grep -r "process\\.exit\\|process\\.stdin\\|process\\.stdout" src/ > /dev/null 2>&1; then
    echo -e "${RED}❌ APIs Node.js détectées (process)${NC}"
    exit 1
else
    echo -e "${GREEN}✅ APIs Deno utilisées (pas de process)${NC}"
fi
echo ""

echo "================================"
echo -e "${GREEN}🎉 TOUS LES TESTS SONT PASSÉS !${NC}"
echo "================================"
echo ""
echo "�� Pour lancer le jeu:"
echo "   deno task start"
echo ""
