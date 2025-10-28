# ☁️ Publicar PWCC Casilla Golf en la Nube

## 🎯 Opción 1: Heroku (GRATIS) - Recomendado

### Ventajas:
- ✅ Completamente gratis
- ✅ Se accede desde cualquier lugar (no necesita tu computador)
- ✅ Fácil de usar
- ✅ Tiene tu propia URL (ej: `pwcc-casilla-golf.herokuapp.com`)

### Pasos para publicar en Heroku:

#### 1. Crear cuenta en Heroku
1. Ve a: https://heroku.com
2. Clic en "Sign up"
3. Crea tu cuenta (gratis)

#### 2. Instalar Heroku CLI
1. Descarga desde: https://devcenter.heroku.com/articles/heroku-cli
2. Instálalo en tu computador
3. Cierra y abre CMD/Terminal

#### 3. Publicar la aplicación

Abre la terminal en esta carpeta y ejecuta:

```bash
# Login en Heroku
heroku login

# Crear una nueva app
heroku create pwcc-casilla-golf

# Subir el código
git init
git add .
git commit -m "Initial commit PWCC Casilla Golf"
git push heroku master

# Ver tu aplicación en vivo
heroku open
```

### Resultado:
Tu aplicación estará disponible en: `https://pwcc-casilla-golf.herokuapp.com`

**Acceso desde cualquier computador, tableta o celular en cualquier parte del mundo.**

---

## 🌐 Opción 2: Render (GRATIS) - Alternativa

### Ventajas:
- ✅ Gratis
- ✅ Fácil configuración
- ✅ Buena para aplicaciones Node.js

### Pasos:
1. Ve a: https://render.com
2. Crea una cuenta
3. Haz clic en "New +" → "Web Service"
4. Conecta con GitHub (o sube manualmente)
5. Render automáticamente detectará que es Node.js
6. Tu app estará en: `pwcc-casilla-golf.onrender.com`

---

## 💻 Opción 3: Vercel (GRATIS) - Simple

### Pasos:
1. Ve a: https://vercel.com
2. Crea una cuenta
3. Clic en "New Project"
4. Arrastra la carpeta del proyecto
5. Vercel desplegará automáticamente

### Resultado:
Tu app estará en: `pwcc-casilla-golf.vercel.app`

---

## 📱 Opción 4: Railway (GRATIS) - Moderno

### Pasos:
1. Ve a: https://railway.app
2. Conecta con GitHub
3. Importa el repositorio
4. Railway detectará automáticamente Node.js
5. Deploy automático

---

## 🔒 Opción 5: Tu Propio Servidor VPS

Si tienes acceso a un servidor:

### Pasos:
1. Conecta por SSH al servidor
2. Sube los archivos
3. Instala Node.js
4. Ejecuta: `npm install && npm start`
5. Configura nginx como proxy inverso
6. Tu app estará en: `http://tu-servidor.com:3000`

---

## 📋 Preparación del Proyecto para Cloud

Antes de subir, verifica que tienes estos archivos:

### Archivos Requeridos:
- ✅ `package.json`
- ✅ `server.js`
- ✅ Carpeta `public/` con logo y fondo
- ✅ Carpeta `data/` con members.json y users.json

### Modificar `server.js` para producción:

Agregar al inicio del archivo:

```javascript
const PORT = process.env.PORT || 3000;
```

Ya está configurado así, así que está listo ✅

---

## 🎯 Recomendación Final

**Para este proyecto, recomiendo HEROKU porque:**
1. ✅ Es el más fácil de usar
2. ✅ Tiene buena documentación en español
3. ✅ Es gratis
4. ✅ Funciona perfecto con Node.js
5. ✅ No necesitas saber mucho de servidores

---

## 📝 Pasos Rápidos Heroku

```bash
# 1. Instalar Heroku CLI
# Descargar de: https://devcenter.heroku.com/articles/heroku-cli

# 2. Abrir terminal en la carpeta del proyecto
cd "C:\Users\santi\OneDrive\Documentos\pwcc oficial"

# 3. Login
heroku login

# 4. Crear app
heroku create pwcc-casilla-golf

# 5. Subir
git init
git add .
git commit -m "PWCC Casilla Golf"
git push heroku master

# 6. Abrir
heroku open
```

**Listo!** Tu aplicación estará en: `https://pwcc-casilla-golf.herokuapp.com`

---

## 🔄 Actualización Futura

Cuando quieras actualizar los datos:

```bash
git add .
git commit -m "Update"
git push heroku master
```

---

**NOTA IMPORTANTE:** Recuerda que las imágenes (logo.png y golf-background.jpg) deben estar en la carpeta `public/` antes de subir a la nube.

