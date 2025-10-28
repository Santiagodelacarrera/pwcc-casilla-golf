# ☁️ Publicar en Render.com (100% GRATIS - Sin Tarjeta)

## ✅ Render.com es la Mejor Alternativa

**Ventajas:**
- ✅ **100% GRATIS** sin necesidad de tarjeta
- ✅ Fácil de usar
- ✅ Mismo resultado que Heroku
- ✅ No te cobrará NADA

## 🚀 Pasos Rápidos

### Paso 1: Crear Cuenta (2 minutos)

1. Ve a: https://render.com
2. Clic en **"Get started for free"**
3. Selecciona **"Continue with GitHub"** (crea cuenta GitHub gratis si no tienes)
4. O usa **"Continue with Google"** con tu email

### Paso 2: Conectar con GitHub (5 minutos)

Si no tienes GitHub:

1. Ve a: https://github.com/signup
2. Crea una cuenta (1 minuto)
3. Regresa a Render.com y conecta con GitHub

### Paso 3: Subir tu Código a GitHub

En tu terminal, ejecuta:

```powershell
# Verificar que Git esté instalado
git --version

# Si no aparece "git version", instálalo desde:
# https://git-scm.com/download/win
```

Luego:

```powershell
# Inicializar Git
git init
git add .
git commit -m "PWCC Casilla Golf"

# Crear repositorio en GitHub y subir
# (Render te dará los comandos exactos)
```

### Paso 4: Crear App en Render (3 minutos)

1. En Render.com, haz clic en **"New +"** (arriba a la derecha)
2. Selecciona **"Web Service"**
3. Conecta con tu repositorio de GitHub
4. Render detectará automáticamente que es Node.js
5. Configuración automática:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (gratis)
6. Haz clic en **"Create Web Service"**

### Paso 5: ¡Listo! (Esperar 5 minutos)

Render construirá tu aplicación automáticamente. Verás el progreso en pantalla.

Al terminar, tendrás tu URL: `https://pwcc-casilla-golf.onrender.com`

---

## 🎯 Resumen de Pasos

```powershell
# 1. Asegúrate de tener Git instalado
# Si no: https://git-scm.com/download/win

# 2. En tu carpeta del proyecto
cd "C:\Users\santi\OneDrive\Documentos\pwcc oficial"

# 3. Inicializar Git
git init
git add .
git commit -m "Initial commit"

# 4. Ve a GitHub.com y crea un repositorio nuevo
# 5. GitHub te dará comandos como:
git remote add origin https://github.com/tu-usuario/pwcc-casilla-golf.git
git push -u origin master

# 6. Ve a Render.com y conecta el repositorio
# 7. Render automáticamente desplegará tu app
```

---

## 💰 Costo REAL

**Render Free Tier:**
- ✅ Completamente GRATIS
- ✅ Sin tarjeta de crédito
- ✅ Sin cobros ocultos
- ✅ Si la app duerme (tras 15 min sin uso), despierta en 30 segundos
- ✅ Si necesitas "always on": $7/mes (pero NO lo necesitas)

---

## 📝 Alternativa: Railway (También Gratis)

Si Render no te gusta, prueba **Railway.app**:

1. Ve a: https://railway.app
2. Conecta con GitHub
3. Railway desplegará automáticamente
4. También 100% gratis sin tarjeta

---

## 🌐 Resultado Final

Tu aplicación estará disponible en:
```
https://pwcc-casilla-golf.onrender.com
```

**Acceso desde:**
- 💻 Tu computador
- 📱 Tu celular
- 💻 Cualquier computador del mundo
- 🌍 Sin importar dónde estés

---

## ⚠️ Nota sobre Heroku

Heroku ahora requiere agregar tarjeta para verificar cuenta (aunque no cobra).
Render.com NO requiere tarjeta.

**Recomendación:** Usa **Render.com** - es más fácil y no requiere tarjeta.

