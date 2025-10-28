// Script final para convertir Excel a JSON correctamente
const fs = require('fs');
const XLSX = require('xlsx');

console.log('📊 Procesando socios-pwcc.csv.xlsx...\n');

const workbook = XLSX.readFile('socios-pwcc.csv.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convertir a JSON con header en primera fila
const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
    header: 1, 
    defval: '',
    raw: false 
});

console.log(`Total de filas: ${jsonData.length}\n`);

const members = [];
let headerRow = null;

// Buscar fila con headers
for (let i = 0; i < Math.min(5, jsonData.length); i++) {
    const row = jsonData[i].join('|').toLowerCase();
    if (row.includes('socio') && row.includes('nombre')) {
        headerRow = i;
        break;
    }
}

if (headerRow === null) {
    console.log('Headers en fila 2');
    headerRow = 1;
}

console.log(`Headers encontrados en fila ${headerRow + 1}\n`);

// Procesar datos
for (let i = headerRow + 1; i < jsonData.length; i++) {
    const row = jsonData[i];
    
    if (row.length < 3) continue;
    if (row.every(cell => !cell || cell.trim() === '')) continue;
    
    // Parsear CSV contenido en algunas celdas
    let fullRow = '';
    row.forEach(cell => {
        const cellStr = String(cell).trim();
        if (cellStr.includes(',')) {
            fullRow = cellStr;
        }
    });
    
    if (fullRow) {
        // Parsear CSV manualmente
        const parts = parseCSVLine(fullRow);
        
        if (parts.length >= 3) {
            const numeroSocio = parts[1] || '';
            const nombres = parts[2] || '';
            const elemento = parts[3] || '';
            const ubicacion = parts[4] || '';
            const observacion = parts[5] || '';
            
            if (nombres && nombres !== 'NOMBRES' && !nombres.includes('Observacion')) {
                const apellido = nombres.split(' ').slice(-1)[0];
                members.push({
                    numeroSocio: numeroSocio.trim(),
                    nombres: nombres.trim(),
                    apellido: apellido,
                    elemento: elemento.trim(),
                    ubicacion: ubicacion.trim(),
                    observacion: observacion.trim()
                });
            }
        }
    } else {
        const numeroSocio = String(row[1] || '').trim();
        const nombres = String(row[2] || '').trim();
        const elemento = String(row[3] || '').trim();
        const ubicacion = String(row[4] || '').trim();
        const observacion = String(row[5] || '').trim();
        
        if (nombres && !nombres.toLowerCase().includes('nombre')) {
            const apellido = nombres.split(' ').slice(-1)[0];
            members.push({
                numeroSocio: numeroSocio,
                nombres: nombres,
                apellido: apellido,
                elemento: elemento,
                ubicacion: ubicacion,
                observacion: observacion
            });
        }
    }
}

// Guardar
fs.writeFileSync('data/members.json', JSON.stringify(members, null, 2));

console.log(`✅ Procesados: ${members.length} socios\n`);
console.log('Primeros 3 socios:');
members.slice(0, 3).forEach(m => {
    console.log(`  ${m.nombres} - N°${m.numeroSocio} - ${m.elemento} - ${m.ubicacion}`);
});

console.log('\n✅ Guardado en data/members.json');

// Stats
const porElemento = {};
const conCarros = members.filter(m => 
    m.observacion.toLowerCase().includes('bodega') ||
    m.observacion.toLowerCase().includes('colgado')
);

members.forEach(m => {
    const elem = m.elemento || 'Sin especificar';
    porElemento[elem] = (porElemento[elem] || 0) + 1;
});

console.log('\n📊 Estadísticas:');
console.log(`Total: ${members.length} socios`);
console.log(`Con carros en bodega: ${conCarros.length}`);
console.log('\nPor tipo de elemento:');
Object.entries(porElemento).sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([tipo, count]) => {
    console.log(`  ${tipo}: ${count}`);
});

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

