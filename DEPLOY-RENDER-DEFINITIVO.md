# 🚀 Guía Definitiva: Desplegar en Render.com

## ✅ Tu proyecto YA está listo para Render

Tu código está perfectamente configurado:
- ✅ `server.js` usa `process.env.PORT` (correcto)
- ✅ Escucha en `0.0.0.0` (necesario para Render)
- ✅ `package.json` tiene script `start` configurado
- ✅ Todas las dependencias están definidas

## 📋 Paso 1: Subir código a GitHub

Si aún no tienes tu código en GitHub:

```powershell
# En la carpeta del proyecto
cd "C:\Users\santi\OneDrive\Documentos\pwcc oficial"

# Verificar si ya es un repositorio Git
git status

# Si no es un repositorio Git, inicialízalo:
git init
git add .
git commit -m "Sistema PWCC Casilla Golf - Listo para Render"

# Si ya tienes un repositorio remoto, solo actualiza:
git add .
git commit -m "Actualización para Render"
git push
```

### Si necesitas crear un repositorio nuevo en GitHub:

1. Ve a: https://github.com/new
2. Nombre del repositorio: `pwcc-casilla-golf`
3. Selecciona **Public** o **Private**
4. **NO** marques "Add a README file" (ya tienes uno)
5. Haz clic en **"Create repository"**
6. GitHub te mostrará comandos, ejecuta:

```powershell
git remote add origin https://github.com/TU-USUARIO/pwcc-casilla-golf.git
git branch -M main
git push -u origin main
```

## 📋 Paso 2: Crear cuenta en Render

1. Ve a: **https://render.com**
2. Haz clic en **"Get started for free"**
3. Selecciona **"Continue with GitHub"** (recomendado)
4. Autoriza a Render para acceder a tus repositorios

## 📋 Paso 3: Crear Web Service en Render

### 3.1. Iniciar el proceso

1. En el dashboard de Render, haz clic en **"New +"** (esquina superior derecha)
2. Selecciona **"Web Service"**
3. Conecta tu repositorio:
   - Si ya conectaste GitHub, selecciona `pwcc-casilla-golf`
   - Si no, haz clic en **"Connect account"** y autoriza

### 3.2. Configuración del servicio

**Importante:** Render debería detectar automáticamente Node.js, pero verifica estos campos:

```
Name: pwcc-casilla-golf
Region: Oregon (US West) [o la región más cercana a ti]
Branch: main
Root Directory: (DEJAR VACÍO)
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

**Configuración detallada:**

- **Name:** `pwcc-casilla-golf` (o el nombre que prefieras)
- **Region:** Cualquiera está bien (Oregon es común)
- **Branch:** `main` (o `master` si tu repo usa master)
- **Root Directory:** ⚠️ **DEJAR VACÍO** (no poner nada)
- **Runtime:** **Node** (asegúrate de que diga "Node", no Rust u otro)
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** **Free** (no seleccionar ningún plan de pago)

### 3.3. Verificar configuración antes de crear

Antes de hacer clic en **"Create Web Service"**, asegúrate de:

- ✅ Runtime dice **"Node"**
- ✅ Build Command es `npm insensitive` (o `npm install`)
- ✅ Start Command es `npm start`
- ✅ Plan dice **"Free"**

Si algo está mal, cámbialo ahora. Render no siempre detecta correctamente.

## 📋 Paso 4: Deploy automático

1. Haz clic en **"Create Web Service"**
2. Render comenzará a construir tu aplicación
3. Verás el progreso en tiempo real
4. **Tiempo estimado:** 5-10 minutos

### Durante el build verás:

```
Cloning repository...
Installing dependencies...
Building...
Starting...
```

## 📋 Paso 5: Obtener tu URL

Una vez completado el deploy:

1. Render te mostrará: **"Your service is live at:"**
2. Tu URL será algo como: `https://pwcc-casilla-golf.onrender.com`
3. Haz clic en la URL para abrir tu aplicación
4. 🎉 **¡Listo! Tu sistema está en la nube**

## ⚙️ Configuración Adicional (Opcional)

### Auto-Deploy

Por defecto, Render tiene **Auto-Deploy** activado:
- Cada vez que hagas `git push` a tu repositorio
- Render automáticamente hará un nuevo deploy
- No necesitas hacer nada manual

Para desactivarlo (si no lo quieres):
1. Ve a tu servicio en Render
2. Settings → **Auto-Deploy**
3. Cambia a **"Manual"**

### Variables de Entorno

Si necesitas agregar variables de entorno:

1. Ve a tu servicio en Render
2. Settings → **Environment Variables**
3. Agrega las variables que necesites

**Por ejemplo:**
- `PORT` = `10000` (Render lo asigna automáticamente, pero puedes forzarlo)
- `NODE_ENV` = `production`

**Tu aplicación NO necesita variables de entorno adicionales** - ya está configurada para funcionar sin ellas.

## 🔧 Solución de Problemas

### Problema 1: Build falla

**Error:** `npm ERR!` o problemas con dependencias

**Solución:**
1. Verifica que `package.json` tenga todas las dependencias
2. Revisa los logs en Render para ver el error específico
3. Prueba localmente: `npm install` y `npm start`

### Problema 2: App no inicia

**Error:** App se queda en "Starting..." por mucho tiempo

**Solución:**
1. Verifica que `server.js` use `process.env.PORT`
2. Verifica que el Start Command sea `npm start`
3. Revisa los logs en Render: Settings → **Logs**

### Problema 3: App se duerme después de inactividad

**Comportamiento normal en el plan Free:**
- Render "duerme" tu app después de 15 minutos sin uso
- Al acceder, despierta en 30-60 segundos
- Es normal y gratuito

**Si quieres que siempre esté activa:**
- Cambia al plan **Starter** ($7/mes)
- O acepta el comportamiento de "dormir"

### Problema 4: Error de CORS o acceso denegado

**Solución:**
- Tu código ya tiene `cors()` configurado en `server.js`
- Si persiste, verifica que los endpoints usen HTTPS

## 📊 Monitoreo

Para ver el estado de tu aplicación:

1. Dashboard de Render: https://dashboard.render.com
2. Haz clic en tu servicio
3. Verás:
   - **Logs** en tiempo real
   - **Metrics** (CPU, memoria, etc.)
   - **Deploy History**

## 🔄 Actualizar tu aplicación

Para actualizar tu aplicación después de hacer cambios:

```powershell
# 1. Hacer cambios en tu código local

# 2. Subir a GitHub
git add .
git commit -m "Descripción de los cambios"
git push

# 3. Render detectará automáticamente y hará un nuevo deploy
# (Solo espera 5-10 minutos)
```

O hacer deploy manual:
1. En Render, ve a tu servicio
2. Haz clic en **"Manual Deploy"**
3. Selecciona **"Deploy latest commit"**

## ✅ Checklist Final

Antes de considerar tu deploy completo:

- [ ] Código subido a GitHub
- [ ] Cuenta en Render creada
- [ ] Repositorio conectado a Render
- [ ] Web Service creado con configuración correcta
- [ ] Build completado exitosamente
- [ ] URL de la app funcionando
- [ ] Login funciona correctamente
- [ ] Búsqueda de socios funciona
- [ ] Archivos JSON se leen correctamente

## 🌐 Acceso

Tu aplicación estará disponible en:
```
https://pwcc-casilla-golf.onrender.com
```

O la URL que Render te haya asignado.

**Puedes acceder desde:**
- 💻 Tu computadora
- 📱 Tu celular
- 🌍 Cualquier dispositivo con internet
- 👥 Cualquier usuario que tenga la URL

## 💡 Notas Importantes

1. **Plan Free:** La app puede tardar 30-60 segundos en despertar si está dormida
2. **Storage:** Los archivos JSON se guardan en el servidor, pero se perderán si reinicias el servicio (considera usar base de datos para producción)
3. **Logs:** Puedes ver logs en tiempo real desde el dashboard de Render
4. **Backups:** Haz backups regulares de `data/members.json` y `data/users.json`

## 🆘 Soporte

Si tienes problemas:

1. Revisa los **Logs** en Render
2. Verifica que tu código funcione localmente: `npm start`
3. Consulta la documentación de Render: https://render.com/docs

---

## 🎉 ¡Felicitaciones!

Tu sistema PWCC Casilla Golf ahora está en la nube y accesible desde cualquier lugar del mundo.

**URL de tu aplicación:** `https://pwcc-casilla-golf.onrender.com` (o la que Render te asigne)

