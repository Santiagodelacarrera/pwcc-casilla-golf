# Instrucciones para Importar TODOS los Datos del Spreadsheet

## Opción 1: Exportar desde Google Sheets (RECOMENDADO)

1. Abre tu Google Sheets: https://docs.google.com/spreadsheets/d/1ciiX72jCB2bx70j1GY35hjfBNq6dhVNX

2. Ve a: **Archivo > Descargar > Valores separados por comas (.csv)**

3. Guarda el archivo como `socios-pwcc.csv` en esta carpeta

4. Ejecuta el script de conversión:
   ```bash
   node convert-csv-to-json.js
   ```

## Opción 2: Usar Google Sheets API (Requiere configuración)

Si quieres automatizar el proceso:
1. Habilita Google Sheets API
2. Crea credenciales
3. Usa el script `fetch-from-google.js`

## Formato de Columnas Esperado

El CSV debe tener estas columnas:
- **Columna A**: Observación (opcional)
- **Columna B**: N° SOCIO
- **Columna C**: NOMBRES
- **Columna D**: ELEMENTO (Bolso, CM, CMB, CEB, etc.)
- **Columna E**: UBICACIÓN
- **Columna F**: Observaciones adicionales (opcional)

## Datos Actuales

Actualmente tengo procesados **43 socios** de muestra. Necesito que descargues el CSV completo para procesar los ~1100 socios restantes.

