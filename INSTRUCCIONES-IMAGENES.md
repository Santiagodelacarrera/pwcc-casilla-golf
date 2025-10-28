# 🖼️ Instrucciones para Agregar las Imágenes

## 📸 Imágenes Requeridas

Necesitas agregar 2 imágenes en la carpeta `public/`:

### 1. Logo del PWCC (`logo.png`)
### 2. Imagen de Fondo del Campo de Golf (`golf-background.jpg`)

## 📁 Ubicación de las Imágenes

Las imágenes deben estar en la carpeta:
```
pwcc-casilla-golf/
└── public/
    ├── logo.png           ⚠️ (AGREGAR ESTA IMAGEN)
    └── golf-background.jpg ⚠️ (AGREGAR ESTA IMAGEN)
```

## 📋 Pasos para Agregar las Imágenes

### Paso 1: Preparar las imágenes
1. Asegúrate de tener las imágenes que te envié:
   - **Logo del Prince of Wales Country Club**
   - **Imagen aérea del campo de golf**

### Paso 2: Renombrar las imágenes
Renombra las imágenes exactamente como se indica:
- Logo → `logo.png`
- Campo de golf → `golf-background.jpg`

### Paso 3: Copiar a la carpeta public/
1. Abre el explorador de archivos de Windows
2. Navega a la carpeta del proyecto:
   ```
   C:\Users\santi\OneDrive\Documentos\pwcc oficial\public
   ```
3. Copia las imágenes a esta carpeta

### Paso 4: Verificar
Las imágenes deben estar en:
```
public/
├── logo.png              ← Tu logo
├── golf-background.jpg   ← Tu imagen de fondo
├── index.html
├── styles.css
└── script.js
```

## 🎨 Formatos Recomendados

### Logo (logo.png)
- **Formato:** PNG con fondo transparente o blanco
- **Tamaño:** Máximo 500x500px
- **Calidad:** Alta resolución

### Fondo (golf-background.jpg)
- **Formato:** JPG o PNG
- **Tamaño:** 1920x1080px o mayor
- **Calidad:** Alta resolución

## ✅ Verificación

Después de agregar las imágenes:

1. Reinicia el servidor:
   ```bash
   npm start
   ```

2. Abre el navegador en: `http://localhost:3000`

3. Deberías ver:
   - ✅ El logo del PWCC en la pantalla de login y en el header
   - ✅ La imagen del campo de golf como fondo (con transparencia aplicada)

## 🔧 Si No Funciona

Si las imágenes no aparecen:

1. Verifica que los nombres sean exactamente:
   - `logo.png` (no `Logo.png` ni `LOGO.PNG`)
   - `golf-background.jpg` (no `Golf-Background.JPG`)

2. Verifica que estén en la carpeta `public/`

3. Verifica la extensión del archivo (debe ser `.png` y `.jpg`)

4. Reinicia el servidor

## 📞 Notas

- Si no tienes las imágenes, puedo crear placeholders
- El sistema funcionará sin las imágenes, pero se verá mejor collar/das
- Las imágenes que enviaste ya fueron descritas anteriormente en la conversación

