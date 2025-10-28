# 🔄 Actualizar GitHub y Redeploy

## ⚡ Problema Actual

Render está buscando en `/src` pero tus archivos NO están ahí.

## ✅ Solución: Actualizar GitHub con Archivos en la Raíz

### Paso 1: Subir Todo a GitHub (Root Direct)

Los archivos del proyecto YA están en la raíz. Solo necesitas actualizar GitHub:

```powershell
git add .
git commit -m "Move to root directory"
git push origin main
```

### Paso 2: En Render.com

1. Ve a tu servicio
2. Tab **"Events"** o **"Deploy"**
3. Haz clic en **"Manual Deploy"** o **"Deploy Latest Commit"**
4. Esto redeployará con los archivos correctos

---

## 🔍 Verificar Estructura en GitHub

Ve a tu repositorio en GitHub:
https://github.com/Santiagodelacarrera/pwcc-casilla-golf

Deberías ver en la **raíz** del repositorio:
- ✅ package.json
- ✅ server.js
- ✅ Procfile
- ✅ Carpeta `public/`
- ✅ Carpeta `data/`

**NO debería haber carpeta `/src`**

---

## 🎯 Si GitHub Tiene Subcarpeta

Si ves que `package.json` está dentro de `pwcc-casilla-golf/pwcc-casilla-golf/`:

### Solución A: En Render
1. Settings → Root Directory
2. Pon: `pwcc-casilla-golf` (el nombre de la subcarpeta)
3. Guarda

### Solución B: Reorganizar GitHub
Mover los archivos a la raíz del repositorio en GitHub.

---

## 🚀 Pasos Rápidos AHORA

```powershell
# Verificar que estás en la carpeta correcta
cd "C:\Users\santi\OneDrive\Documentos\pwcc oficial"

# Actualizar GitHub
git add .
git commit -m "Fix root directory"
git push origin main

# Luego en Render: Manual Deploy
```

---

**Primero ejecuta los comandos de git, luego haz Manual Deploy en Render.**

