# 🔧 Configurar Remote de GitHub

## ❌ Problema

Git no sabe dónde está tu repositorio de GitHub.

## ✅ Solución

### Opción 1: Ya Tienes GitHub

Si ya creaste el repositorio en GitHub, configura el remote:

```powershell
git remote add origin https://github.com/Santiagodelacarrera/pwcc-casilla-golf.git
git branch -M main
git push -u origin main
```

### Opción 2: Crear Repositorio Ahora

Si NO has creado el repositorio en GitHub todavía:

1. Ve a: https://github.com/new
2. Repository name: `pwcc-casilla-golf`
3. Haz clic en "Create repository"
4. GitHub te dará comandos, ejecútalos aquí

### Opción 3: Usar Render Desde Archivos Locales

Si GitHub te está dando problemas, puedes:

1. **Eliminar el servicio en Render**
2. **Crear uno nuevo**
3. **Esta vez, sube un ZIP** en lugar de conectar con GitHub
4. Render desplegará desde el ZIP

---

## 🎯 Instrucciones Específicas

### Ejecuta este comando (cambia TU-USUARIO):

```powershell
git remote add origin https://github.com/TU-USUARIO/pwcc-casilla-golf.git
```

**Si no tienes usuario de GitHub**, ve aquí primero:
https://github.com/signup

---

## ⚡ Alternativa Rápida: Vercel o Railway

Si Render te está dando problemas:

**Railway.app:**
1. Ve a: https://railway.app
2. Conecta con GitHub
3. Automatic deploy

O prueba **Vercel.com** que es muy simple.

