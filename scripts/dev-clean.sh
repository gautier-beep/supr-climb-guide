#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/.."

echo "→ Arrêt des serveurs Next sur les ports 3000–3005..."
for port in 3000 3001 3002 3003 3004 3005; do
  pids=$(lsof -ti :"$port" 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "$pids" | xargs kill -9 2>/dev/null || true
    echo "  Port $port libéré"
  fi
done

pkill -f "next dev" 2>/dev/null || true
sleep 1

echo "→ Suppression du cache .next..."
rm -rf .next

echo "→ Démarrage sur http://localhost:3000"
echo ""
exec npx next dev -p 3000
