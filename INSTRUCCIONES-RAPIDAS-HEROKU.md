# ⚡ Instrucciones Rápidas - Publicar en Heroku

## 🎯 Esto te tomará 10 minutos

### Paso 1: Crear cuenta (2 minutos)
1. Ve a: https://heroku.com/signup
2. Crea tu cuenta con email
3. Confirma el email

### Paso 2: Instalar Heroku CLI (3 minutos)
1. Ve a: https://devcenter.heroku.com/articles/heroku-cli
2. Descarga "Install Heroku CLI" para Windows
3. Instálalo (doble clic en el instalador)
4. **Cierra todas las ventanas de terminal y CMD**

### Paso 3: Abrir terminal y subir (5 minutos)

**ABRE PowerShell o CMD nuevamente** y ejecuta:

```powershell
# Ir a tu carpeta del proyecto
cd "C:\Users\santi\OneDrive\Documentos\pwcc oficial"

# Login en Heroku (se abrirá el navegador)
heroku login

# Crear la app
heroku create pwcc-casilla-golf

# Subir el código (la primera vez crea un git local)
git init
git add .
git commit -m "Initial commit"
git push heroku master

# Abrir tu aplicación
heroku open
```

### Paso 4: ¡Listo! 🎉

Tu aplicación estará en:
**https://pwcc-casilla-golf.herokuapp.com**

Comparte ese link con quien necesite acceso.

---

## 🔄 Si necesitas actualizar los datos

Cada vez que hagas cambios:

```powershell
git add .
git commit -m "Update"
git push heroku master
```

---

## 📋 Lo que necesitas antes

### IMPORTANTE: Agregar las imágenes
Antes de subir, asegúrate de tener en la carpeta `public/`:
- ✅ `logo.png`
- ✅ `golf-background.jpg`

Si no las tienes, el sitio funcionará pero sin las imágenes.

---

## ❓ Solución de Problemas

### Error: "git no es reconocido"
**Solución:** Instala Git desde: https://git-scm.com/download/win

### Error: "heroku no es reconocido"  
**Solución:** Reinicia la terminal después de instalar Heroku CLI

### Error: "Cannot push"
**Solución:** Ejecuta esto primero:
```powershell
heroku git:remote -a pwcc-casilla-golf
```

---

## 💰 Costo

**Heroku Free tier:**
- ✅ Gratis para siempre
- ✅ Se "duerme" después de 30 minutos sin uso
- ✅ Despierta automáticamente cuando alguien accede (tarda 10-20 segundos)

**Si necesitas siempre activo:** $7/mes (no necesario)

---

## 📱 Acceso

Una vez publicado, podrás acceder desde:
- 💻 Tu computador
- 📱 Celular
- 📱 Tablet
- 💻 Cualquier computador del mundo

**Solo necesitan el link:** `https://pwcc-casilla-golf.herokuapp.com`

---

## 🔐 Seguridad

Los usuarios seguirán necesitando:
- Usuario: Casillapwcc1, Martinrojas1 o ADMINPWCC
- Contraseña: PWCC1925

La base de datos está en la nube pero protegida por autenticación.

---

**¿Tienes dudas?** Sigue el PDF oficial:
https://devcenter.heroku.com/articles/getting-started-with-nodejs

