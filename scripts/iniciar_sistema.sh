#!/bin/bash

echo "======================================"
echo "     Iniciando Sistema de Ingresos"
echo "======================================"

echo ""
echo "Verificando Docker..."

until docker info >/dev/null 2>&1
do
    sleep 2
done

echo "Docker listo."

echo ""
echo "Esperando que el sistema responda..."
until curl -s http://localhost:5001/api/health >/dev/null
do
    sleep 2
done

echo "Sistema disponible."

echo ""
echo "Iniciando Cloudflare..."

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

"$SCRIPT_DIR/iniciar_cloudflare.sh"

echo ""
echo "Sistema iniciado correctamente."