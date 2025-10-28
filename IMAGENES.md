# Instrucciones para Agregar Imágenes

## Archivos Requeridos

Para que el sistema funcione correctamente, necesitas agregar dos archivos en la carpeta `public/`:

### 1. Logo del PWCC (`logo.png`)
- **Ubicación**: `public/logo.png`
- **Descripción**: Logo del Prince of Wales Country Club
- **Tamaño recomendado**: Max 500x500px
- **Formato**: GPT, PNG o SVG con fondo transparente o blanco
- **Nota**: El logo debe tener el diseño que se te envió anteriormente

### 2. Imagen de Fondo del Campo de Golf (`golf-background.jpg`)
- **Ubicación**: `public/golf-background.jpg`
- **Descripción**: Imagen aérea o panorámica del campo de golf
- **Tamaño recomendado**: 1920x1080px o mayor (se ajustará automáticamente)
- **Formato**: JPG, PNG
- **Nota**: La imagen de fondo del campo de golf que se te envió anteriormente

## Cómo Agregar las Imágenes

1. Copia las imágenes que ya tienes (el logo y la imagen del campo de golf)
2. Cambia el nombre de los archivos a:
   - `logo.png` para el logo
   - `golf-background.jpg` para la imagen de fondo
3. Coloca ambos archivos en la carpeta `public/`

## Verificación

Después de agregar las imágenes, ejecuta el servidor:
```bash
npm start
```

Y verifica que:
- El logo aparece en la pantalla de login y en el header
- La imagen de fondo se ve detrás del contenido (con transparencia aplicada)

## Placeholder Temporal

Si no tienes las imágenes listas, puedes usar cualquier imagen temporalmente:
- Logo: Cualquier imagen con fondo transparente
- Fondo: Cualquier imagen de campo de golf

El sistema funcionará con cualquier imagen, pero se verá mejor con las imágenes originales del PWCC.

