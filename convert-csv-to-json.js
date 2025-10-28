// Script para convertir CSV de Google Sheets a JSON
const fs = require('fs');

console.log('📥 Convertir CSV de socios a JSON\n');

// Intentar leer el archivo CSV
let csvContent;
try {
    csvContent = fs.readFileSync('socios-pwcc.csv', 'utf8');
    console.log('✅ Archivo CSV encontrado\n');
} catch (error) {
    console.error('❌ Error: No se encontró el archivo socios-pwcc.csv');
    console.log('\n📋 Instrucciones:');
    console.log('1. Abre el Google Sheets');
    console.log('2. Ve a Archivo > Descargar > CSV (.csv)');
    console.log('3. Guarda el archivo como "socios-pwcc.csv" en esta carpeta');
    console.log('4. Ejecuta este script de nuevo\n');
    process.exit(1);
}

// Parsear el CSV
const lines = csvContent.split('\n');
const members = [];
let headerProcessed = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Saltar la primera línea si es header
    if (!headerProcessed) {
        // Buscar la línea que dice "N° SOCIO" o similar
        if (line.includes('SOCIO') || line.includes('NOMBRES')) {
            headerProcessed = true;
            continue;
        }
    }
    
    // Parsear las columnas (respetar comas dentro de comillas)
    const columns = parseCSVLine(line);
    
    if (columns.length < 3) continue;
    
    // Extraer campos
    // Columna A: Observación (col 0)
    // Columna B: N° Socio (col 1)
    // Columna C: Nombres (col 2)
    // Columna D: Elemento (col 3)
    // Columna E: Ubicación (col 4)
    // Columna F: Observaciones extra (col 5)
    
    const observacion = columns[0] || '';
    const numeroSocio = columns[1] || '';
    const nombres = columns[2] || '';
    const elemento = columns[3] || '';
    const ubicacion = columns[4] || '';
    const observacionesExtra = columns[5] || '';
    
    // Skip si no hay nombres
    if (!nombres || nombres.trim() === '') continue;
    
    // Extraer apellido
    const apellido = nombres.trim().split(' ').slice(-1)[0];
    
    // Combinar observaciones
    let observacionCompleta = '';
    if (observacion) observacionCompleta += observacion;
    if (observacionesExtra) {
        if (observacionCompleta) observacionCompleta += ' | ';
        observacionCompleta += observacionesExtra;
    }
    
    members.push({
        numeroSocio: numeroSocio.trim() || '',
        nombres: nombres.trim(),
        apellido: apellido,
        elemento: elemento.trim(),
        ubicacion: ubicacion.trim(),
        observacion: observacionCompleta.trim()
    });
}

// Guardar en JSON
fs.writeFileSync('data/members.json', JSON.stringify(members, null, 2));

console.log(`✅ Convertidos ${members.length} socios\n`);

// Estadísticas
const porElemento = {};
members.forEach(m => {
    const elem = m.elemento || 'Sin especificar';
    porElemento[elem] = (porElemento[elem] || 0) + 1;
});

console.log('📊 Estadísticas:');
console.log(`Total de socios: ${members.length}`);
console.log('\nPor tipo de elemento:');
Object.entries(porElemento).sort((a, b) => b[1] - a[1]).forEach(([tipo, count]) => {
    console.log(`  ${tipo}: ${count}`);
});

console.log('\n✅ Archivo data/members.json actualizado');
console.log('🎯 Ahora puedes ejecutar: npm start\n');

// Función helper para parsear líneas CSV
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    
    result.push(current);
    return result;
}

