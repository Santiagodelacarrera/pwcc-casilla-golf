const fs = require('fs');
const XLSX = require('xlsx');

console.log('📊 Convirtiendo con encoding UTF-8 correcto...\n');

const workbook = XLSX.readFile('socios-pwcc.csv.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Leer como JSON directamente
const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
    header: ['observacion', 'numeroSocio', 'nombres', 'elemento', 'ubicacion', 'observacionExtra'],
    range: 2,
    defval: '',
    raw: false
});

console.log(`Filas encontradas: ${jsonData.length}`);

const members = [];

jsonData.forEach(row => {
    let numeroSocio = '';
    let nombres = '';
    let elemento = '';
    let ubicacion = '';
    let observacion = '';
    let obsExtra = '';
    
    // Extraer datos
    if (row.numeroSocio) numeroSocio = String(row.numeroSocio).trim();
    if (row.nombres) nombres = String(row.nombres).trim();
    if (row.elemento) elemento = String(row.elemento).trim();
    if (row.ubicacion) ubicacion = String(row.ubicacion).trim();
    if (row.observacion) observacion = String(row.observacion).trim();
    if (row.observacionExtra) obsExtra = String(row.observacionExtra).trim();
    
    // Skip si no hay nombres
    if (!nombres || nombres.length < 2) return;
    if (nombres === 'NOMBRES') return;
    
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

console.log(`✅ Procesados: ${members.length} socios\n`);

// Verificar encoding antes de guardar
const problemasEncoding = members.filter(m => m.nombres.includes('Ã'));
console.log(`⚠️  Nombres con problemas de encoding: ${problemasEncoding.length}`);

if (problemasEncoding.length > 0) {
    console.log('\nPrimeros 10 problemas:');
    problemasEncoding.slice(0, 10).forEach(m => {
        console.log(`  - ${m.nombres}`);
    });
}

fs.writeFileSync('data/members.json', JSON.stringify(members, null, 2));

console.log('\n✅ Archivo guardado en data/members.json');

// Estadísticas
const porElemento = {};
const conCarros = members.filter(m => 
    m.observacion && (
        m.observacion.toLowerCase().includes('bodega') ||
        m.observacion.toLowerCase().includes('colgado')
    )
);

members.forEach(m => {
    const elem = m.elemento || 'Sin especificar';
    porElemento[elem] = (porElemento[elem] || 0) + 1;
});

console.log('\n📊 Estadísticas finales:');
console.log(`Total socios: ${members.length}`);
console.log(`Con carros: ${conCarros.length}`);
console.log(`Problemas encoding: ${problemasEncoding.length}`);
console.log('\nPrimeros 5 socios:');
members.slice(0, 5).forEach((m, i) => {
    const tieneProblema = m.nombres.includes('Ã');
    console.log(`${i + 1}. ${tieneProblema ? '❌' : '✅'} ${m.nombres} - ${m.numeroSocio}`);
});

