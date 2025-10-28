// Script para corregir problemas de codificación
const fs = require('fs');
const XLSX = require('xlsx');

console.log('🔧 Corrigiendo problemas de codificación UTF-8...\n');

// Leer el Excel con encoding correcto
const workbook = XLSX.readFile('socios-pwcc.csv.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Convertir a JSON directamente sin procesar como CSV
const rawData = XLSX.utils.sheet_to_json(worksheet, { 
    header: ['observacion', 'numeroSocio', 'nombres', 'elemento', 'ubicacion', 'observacionExtra'],
    range: 2, // Empezar desde fila 2 (saltar headers)
    defval: ''
});

const members = [];
let skipped = 0;

rawData.forEach(row => {
    const numeroSocio = String(row.numeroSocio || '').trim();
    const nombres = String(row.nombres || '').trim();
    const elemento = String(row.elemento || '').trim();
    const ubicacion = String(row.ubicacion || '').trim();
    const observacion = String(row.observacion || '').trim();
    const obsExtra = String(row.observacionExtra || '').trim();
    
    // Skip headers y filas vacías
    if (!nombres || nombres === 'NOMBRES' || nombres.length < 3) {
        skipped++;
        return;
    }
    
    const apellido = nombres.split(' ').slice(-1)[0];
    
    members.push({
        numeroSocio: numeroSocio,
        nombres: nombres,
        apellido: apellido,
        elemento: elemento,
        ubicacion: ubicacion,
        observacion: `${observacion} ${obsExtra}`.trim()
    });
});

console.log(`✅ Procesados: ${members.length} socios`);
console.log(`❌ Omitidos: ${skipped} filas\n`);

// Guardar
fs.writeFileSync('data/members.json', JSON.stringify(members, null, 2));

console.log('✅ Guardado en data/members.json\n');

// Verificar ejemplos conocidos
const joséExamples = members.filter(m => 
    m.nombres.includes('José') || 
    m.nombres.includes('JosÃ') || 
    m.nombres.toLowerCase().includes('jose')
).slice(0, 5);

console.log('📋 Ejemplos de socios con "José":');
joséExamples.forEach((m, i) => {
    const hasProblem = m.nombres.includes('Ã');
    console.log(`${i + 1}. ${m.nombres} ${hasProblem ? '❌ MAL' : '✅ BIEN'}`);
});

// Estadísticas
const porElemento = {};
const conCarros = members.filter(m => 
    m.observacion && (
        m.observacion.toLowerCase().includes('bodega') ||
        m.observacion.toLowerCase().includes('colgado') ||
        m.observacion.toLowerCase().includes('carros')
    )
);

members.forEach(m => {
    const elem = m.elemento || 'Sin especificar';
    porElemento[elem] = (porElemento[elem] || 0) + 1;
});

console.log('\n📊 Estadísticas:');
console.log(`Total: ${members.length} socios`);
console.log(`Con carros: ${conCarros.length}`);
console.log('\nPor tipo:');
Object.entries(porElemento).sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([tipo, count]) => {
    console.log(`  ${tipo}: ${count}`);
});

