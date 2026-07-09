#!/bin/bash

LOG="$HOME/cloudflare.log"

rm -f "$LOG"

echo "Iniciando Cloudflare Tunnel..."

pkill -f cloudflared >/dev/null 2>&1

/opt/homebrew/bin/cloudflared tunnel --url http://localhost > "$LOG" 2>&1 &

echo "Esperando la URL..."

URL=""

while [ -z "$URL" ]
do
    sleep 1

    URL=$(grep -oE 'https://[a-zA-Z0-9-]+\.trycloudflare\.com' "$LOG" | grep -v '^https://api\.trycloudflare\.com$' | tail -1)

done

echo ""
echo "URL encontrada:"
echo "$URL"

cat > estado.json <<EOF
{
    "url": "$URL"
}
EOF

echo ""
echo "estado.json actualizado."

echo ""
echo "Publicando cambios en GitHub..."

echo ""
echo "Esperando conexión a Internet..."

until curl -Is https://github.com >/dev/null 2>&1
do
    sleep 2
done

echo "Conexión lista."

git add estado.json

git diff --cached --quiet

if [ $? -ne 0 ]; then

    git commit -m "Actualizar URL del túnel"

    git push origin main

    echo ""
    echo "Portal actualizado correctamente."

else

    echo ""
    echo "No hubo cambios que publicar."

fi