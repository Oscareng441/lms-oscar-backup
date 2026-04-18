#!/bin/bash

echo "🔍 Verificando entorno Laravel + XAMPP..."

# 1. Verificar versión de PHP
echo -n "📦 Versión de PHP: "
php -v | head -n 1

# 2. Verificar que pdo_mysql esté activo
echo -n "🔌 Verificando extensión pdo_mysql... "
if php -m | grep -q "pdo_mysql"; then
    echo "✅ Activa"
else
    echo "❌ No encontrada"
fi

# 3. Verificar archivo .env
echo -n "📁 Verificando archivo .env... "
if [ -f .env ]; then
    echo "✅ Encontrado"
else
    echo "❌ No existe"
    exit 1
fi

# 4. Extraer datos de conexión desde .env
DB_NAME=$(grep DB_DATABASE .env | cut -d '=' -f2)
DB_USER=$(grep DB_USERNAME .env | cut -d '=' -f2)
DB_PASS=$(grep DB_PASSWORD .env | cut -d '=' -f2)

# 5. Verificar conexión a la base de datos
echo -n "🗃️ Verificando acceso a la base de datos '$DB_NAME'... "
if mysql -u "$DB_USER" -p"$DB_PASS" -e "USE $DB_NAME;" 2>/dev/null; then
    echo "✅ Conexión exitosa"
else
    echo "❌ Fallo de conexión"
fi

echo "✅ Verificación completa. Puedes iniciar Laravel con confianza."