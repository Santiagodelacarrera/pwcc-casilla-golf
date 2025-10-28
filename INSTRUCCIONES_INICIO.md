# Instrucciones de Inicio Rápido - Penn State  Casilla Golf

## ✅ Sistema Completado

El sistema PWCC Casilla Golf ha sido creado exitosamente con todas las funcionalidades solicitadas.

## 🚀 Cómo Iniciar el Sistema

### 1. Agregar Imágenes (OBLIGATORIO)

Antes de ejecutar el sistema, necesitas agregar dos imágenes en la carpeta `public/`:

- **logo.png**: El logo del Prince of Wales Country Club
- **golf-background.jpg**: La imagen del campo de golf

**Ver archivo `IMAGENES.md` para más detalles**

### 2. Ejecutar el Sistema

Abre la terminal en esta carpeta y ejecuta:

```bash
npm start
```

O en modo desarrollo (con recarga automática):
```bash
npm run dev
```

El sistema estará disponible en: **http://localhost:3000**

### 3. Acceso desde la Red Local

Para acceder desde otros dispositivos (tablets, celulares, etc.) en la misma red WiFi:

1. Descubre tu IP local:
   - Abre CMD (cmd.exe)
   - Ejecuta: `ipconfig`
   - Busca "Dirección IPv4", por ejemplo: `192.168.1.100`

2. Accede desde otros dispositivos usando:
   ```
   http://192.168.1.100:3000
   ```
   (Reemplaza con tu IP real)

## 🔐 Usuarios del Sistema

### Administrador
- **Usuario**: `ADMINPWCC`
- **Contraseña**: `PWCC1925`
- **Permisos**: Crear/eliminar usuarios, acceso completo

### Usuario Regular 1
- **Usuario**: `Casillapwcc1`
- **Contraseña**: `PWCC1925`

### Usuario Regular 2
- **Usuario**: `Martinrojas1`
- **Contraseña**: `PWCC1925`

## 📊 Base de Datos

### Estado Actual
- **Socio registrados**: 20 (muestra de prueba)
- **Socio total esperados**: ~1100
- **Formato**: JSON en `data/members.json`

### Agregar Más Socios

Para agregar los ~1100 socios restantes:

1. Exporta tu Google Sheets a CSV
2. Usa un script de conversión (ver `convert-data.js`)
3. O agrega manualmente en `data/members.json`

**Formato office memberes:**
```json
{
  "numeroSocio": "1234",
  "nombres": "Nombre Completo",
  "apellido": "Apellido",
  "elemento": "Bolso",
  "ubicacion": "Pasillo A-1",
  "observacion": ""
}
```

## 🎯 Funcionalidades

### ✅ Búsqueda de Socios
- Por nombre
- Por apellido
- Por número de socio
- Por ubicación/locker
- Búsqueda general (en todos los campos)

### ✅ Bot de Cambios en Base de Datos
1. Click en "Cambio Base de Datos PWCC Golf"
2. Escribe el cambio en lenguaje natural
3. Ejemplo: "Cambiar locker de Felipe Martinez (N° socio 1234) del locker A-1 al locker B-16"
4. El sistema procesa y aplica el cambio automáticamente

### ✅ Panel de Administración (solo Admin)
- Crear nuevos usuarios
- Eliminar usuarios
- Gestionar roles (Usuario/Administrador)

## 📋 Datos Faltantes Identificados

Se analizó la hoja de cálculo y se identificaron estos campos que NO están incluidos en la base de datos:

### ❌ No Críticos (no afectan funcionalidad principal)
1. **Información de contacto**: Teléfonos, emails, direcciones de socios
2. **Fechas de asignación**: Cuándo se asignó cada locker
3. **Historial de cambios**: Registro de cambios anteriores de ubicación
4. **Estado de membresía**: Si el socio está activo, inactivo o retirado
5. **Características de locker**: Tamaño, tipo físico de cada casilla
6. **Inventario detallado**: Lista específica de items guardados en cada casilla

### ✅ Datos Disponibles (funcionalidad completa)
- Número de socio
- Nombre completo
- Apellido
- Tipo de elemento (Bolso, CM, CMB, CEB)
- Ubicación exacta (Pasillo, Casilla, etc.)
- Observaciones

**Conclusión**: El sistema funciona perfectamente con los datos actuales. Los campos faltantes son opcionales para futuras mejoras.

## 📞 Información de Contacto en el Sistema

El sistema muestra en el footer:
- **Teléfono**: +56 2 2757 5700
- **Dirección**: Las Arañas 1901, Santiago de Chile, La Reina, Región Metropolitana

## 🎨 Características de Diseño

- Logo del PWCC en header y login
- Imagen de fondo del campo de golf
- Diseño responsivo (funciona en tablets y celulares)
- Colores: Azul oscuro (#003366) y dorado del PWCC
- Interfaz moderna y profesional

## 🔧 Solución de Problemas

### El servidor no inicia
- Verifica que Node.js esté instalado: `node --version`
- Instala dependencias: `npm install`

### No aparece el logo o la imagen de fondo
- Verifica que los archivos estén en `public/`
- Nombres exactos: `logo.png` y `golf-background.jpg`
- Reinicia el servidor

### Error de conexión desde otro dispositivo
- Verifica que estés en la misma red WiFi
- Verifica que el firewall no esté bloqueando el puerto 3000
- Usa la IP correcta (no localhost)

## 📝 Notas Finales

- El sistema está diseñado para funcionar en red local
- Para acceso desde internet, se requiere configuración adicional (VPN, dominio, etc.)
- Las contraseñas están en texto plano (recomendado cambiar en producción)
- La base de datos se actualiza en tiempo real

## 📚 Archivos Importantes

- `server.js`: Servidor backend
- `public/index.html`: Interfaz principal
- `public/script.js`: Lógica del frontend
- `public/styles.css`: Estilos
- `data/members.json`: Base de datos de socios
- `data/users.json`: Base de datos de usuarios
- `README.md`: Documentación completa
- `IMAGENES.md`: Instrucciones para agregar imágenes

---

¡El sistema está listo para usar! 🎉

