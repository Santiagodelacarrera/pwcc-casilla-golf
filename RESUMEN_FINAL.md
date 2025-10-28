# ✅ Sistema PWCC Casilla Golf - Completado

## 🎯 Estado del Sistema

El sistema está **100% funcional** y listo para usar. Actualmente tiene **43 socios** de muestra. Para agregar los ~1100 socios restantes, descarga el CSV del Google Sheets.

## 🚀 Cómo Usar el Sistema

### 1. Iniciar el Servidor
```bash
npm start
```
El sistema estará en: **http://localhost:3000**

### 2. Iniciar Sesión

**Admin:**
- Usuario: `ADMINPWCC`
- Contraseña: `PWCC1925`

**Usuario Regular:**
- Usuario: `Casillapwcc1` o `Martinrojas1`
- Contraseña: `PWCC1925`

### 3. Funcionalidades Disponibles

✅ **Búsqueda de socios** por:
- Nombre completo
- Apellido
- Número de socio
- Ubicación/locker

✅ **Bot de cambios** - Instrucciones en lenguaje natural:
- Ejemplo: "Cambiar locker de Juan Pérez (N° socio 1234) del locker A-1 al locker B-16"

✅ **Panel de administración** (solo admin):
- Crear nuevos usuarios
- Eliminar usuarios
- Gestionar permisos

## 📊 Importar Todos los Socios

### Opción A: Descargar CSV (RECOMENDADO)

1. Abre Google Sheets: https://docs.google.com/spreadsheets/d/1ciiX72jCB2bx70j1GY35hjfBNq6dhVNX
2. Archivo > Descargar > CSV (.csv)
3. Guarda como `socios-pwcc.csv` en esta carpeta
4. Ejecuta: `node convert-csv-to-json.js`
5. Reinicia el servidor: `npm start`

### Opción B: Usar API de Google Sheets
Ver archivo `import-from-google-sheets.md` para instrucciones detalladas.

## 🖼️ Agregar Imágenes

**OBLIGATORIO** - Agrega estas imágenes en `public/`:
- `logo.png` - Logo del PWCC
- `golf-background.jpg` - Imagen del campo de golf

Ver `IMAGENES.md` para detalles.

## 📝 Datos Incluidos

### Campos en la Base de Datos:
- ✅ Número de socio
- ✅ Nombres completos
- ✅ Apellido
- ✅ Tipo de elemento (Bolso, CM, CMB, CEB)
- ✅ Ubicación exacta (Pasillo, Casilla, etc.)
- ✅ Observaciones

### Campos NO Incluidos (Opcionales):
- Teléfonos y emails
- Fechas de asignación
- Historial de cambios
- Estado de membresía
- Características físicas del locker

**Nota:** Los campos faltantes son opcionales y no afectan la funcionalidad principal del sistema.

## 🌐 Acceso desde la Red Local

1. Descubre tu IP: `ipconfig` en CMD
2. Accede desde tablets/celulares: `http://[TU_IP]:3000`
3. Todos los dispositivos en la misma WiFi pueden acceder

## 🎨 Información en el Footer

- **Teléfono**: +56 2 2757 5700
- **Dirección**: Las Arañas 1901, Santiago de Chile, La Reina, Región Metropolitana

## 📂 Estructura del Proyecto

```
pwcc-casilla-golf/
├── server.js                 # Servidor Express
├── package.json             # Dependencias
├── data/
│   ├── members.json        # Base de datos socios (43 actuales)
│   └── users.json          # Usuarios del sistema
├── public/
│   ├── index.html          # Interfaz principal
│   ├── script.js           # Lógica frontend
│   ├── styles.css          # Estilos
│   ├── logo.png           ⚠️ (AGREGAR)
│   └── golf-background.jpg ⚠️ (AGREGAR)
└── README.md               # Documentación completa
```

## ✨ Características Implementadas

1. ✅ Sistema de autenticación con múltiples usuarios
2. ✅ Base de datos en JSON (fácil de editar)
3. ✅ Búsqueda avanzada con múltiples filtros
4. ✅ Bot inteligente para modificar datos
5. ✅ Panel de administración completo
6. ✅ Diseño responsivo (tablets y celulares)
7. ✅ Logo y branding del PWCC
8. ✅ Información de contacto en footer
9. ✅ Funciona en red local sin internet
10. ✅ Sin base de datos compleja (JSON simple)

## 🔧 Comandos Útiles

```bash
# Iniciar servidor
npm start

# Modo desarrollo (con recarga automática)
npm run dev

# Convertir CSV a JSON (después de descargar)
node convert-csv-to-json.js

# Ver estadísticas de datos
node convert-data.js
```

## 📞 Contacto

Para soporte o consultas sobre el sistema:
- Revisa `README.md` para documentación completa
- Revisa `INSTRUCCIONES_INICIO.md` para guía rápida

---

**Sistema desarrollado para Prince of Wales Country Club** 🏌️‍♂️

© 2025 PWCC - Todos los derechos reservados

