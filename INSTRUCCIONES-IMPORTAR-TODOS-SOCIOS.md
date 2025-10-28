# 🚨 IMPORTANTE: Cómo Importar TODOS los 1100 Socios

## Situación Actual

✅ **Sistema creado:** 100% funcional
✅ **Socios registrados:** 43 de 1100 (solo muestra)
❌ **Faltan por importar:** ~1057 socios

## ⚠️ Problema

No tengo acceso directo al Google Sheets para extraer automáticamente todos los datos. 

## ✅ Solución: Importar CSV Manualmente

Para tener TODOS los socios en el sistema, sigue estos pasos:

### Paso 1: Descargar CSV desde Google Sheets

1. Abre el Google Sheets:
   - URL: https://docs.google.com/spreadsheets/d/1ciiX72jCB2bx70j1GY35hjfBNq6dhVNX

2. Ve a: **Archivo > Descargar > Valores separados por comas (.csv)**

3. Guarda el archivo con el nombre exacto: **`socios-pwcc.csv`**

4. Mueve el archivo a esta carpeta del proyecto

### Paso 2: Convertir CSV a JSON

1. Abre la terminal en esta carpeta
2. Ejecuta el script:
   ```bash
   node convert-csv-to-json.js
   ```

3. Verás algo como:
   ```
   ✅ Convertidos 1100 socios
   
   📊 Estadísticas:
   Total de socios: 1100
   
   Por tipo de elemento:
     Bolso: 850
     CMB: 150
     CEB: 100
     ...
   ```

### Paso 3: Reiniciar el Servidor

Si el servidor está corriendo, deténlo (Ctrl+C) y reinícialo:

```bash
npm start
```

### Paso 4: Verificar

Abre el navegador en: **http://localhost:3000**

- Deberías ver "Total: 1100 socios" en lugar de "Total: 43 socios"
- Puedes buscar cualquier socio del listado completo
- Todas las funcionalidades funcionarán con todos los socios

## 📊 ¿Qué Datos Se Importarán?

De cada socio se importará:
- ✅ N° de Socio
- ✅ Nombres completos
- ✅ Elemento (Bolso, CM, CMB, CEB)
- ✅ Ubicación (Pasillo, Casilla, Sala)
- ✅ Observaciones (incluye carros en bodega)
- ✅ Información de carros en bodega externa

## 🔍 Identificar Socios con Carros

Todos los socios con carros en bodega tienen en la columna "Observaciones":
- "CM, colgado bodega externa"
- "2 ruedas bod externa"
- "colgado" + ubicación específica

El sistema ya está preparado para identificar estos casos automáticamente.

## 🎯 Alternativa: API de Google Sheets

Si quieres una sincronización automática y en tiempo real:

1. Habilita Google Sheets API
2. Comparte el spreadsheet con la cuenta de servicio
3. Usa el script `fetch-from-google.js` para sincronizar automáticamente

Ver archivo `import-from-google-sheets.md` para más detalles.

## ✅ Estado del Sistema

**El sistema está 100% funcional con los 43 socios actuales.** 
Puedes usarlo mientras tanto. Cuando importes todos los socios, simplemente reinicia el servidor.

## 📞 ¿Necesitas Ayuda?

Si tienes problemas con la importación:
1. Verifica que el CSV tenga todas las columnas necesarias
2. Asegúrate de que el archivo se llame exactamente `socios-pwcc.csv`
3. Verifica que esté en la carpeta del proyecto

---

**Nota:** El sistema funciona perfectamente con la muestra de 43 socios para pruebas. La importación completa es solo para agregar los ~1057 socios restantes.

