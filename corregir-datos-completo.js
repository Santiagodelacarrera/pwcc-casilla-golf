// Script para corregir todos los problemas de encoding
const fs = require('fs');
const XLSX = require('xlsx');

console.log('🔧 Corrigiendo todos los datos del Excel...\n');

// Leer Excel
const workbook = XLSX.readFile('socios-pwcc.csv.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convertir a JSON con header automático
const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
    header: 1, 
    defval: '',
    raw: false  // Esto debería manejar el encoding correctamente
});

console.log(`Total de filas en Excel: ${jsonData.length}`);

const members = [];
let headerFound = false;
const problemas = [];

for (let i = 0; i < jsonData.length; i++) {
    const row = jsonData[i];
    
    if (!Array.isArray(row)) continue;
    
    // Buscar header
    const rowStr = row.join('|');
    if (rowStr.toLowerCase().includes('socio') && rowStr.toLowerCase().includes('nombre')) {
        headerFound = true;
        continue;
    }
    
    if (!headerFound) continue;
    
    // Parsear cada celda como string
    const observacion = String(row[0] || '').trim();
    const numeroSocio = String(row[1] || '').trim();
    const nombres = String(row[2] || '').trim();
    const elemento = String(row[3] || '').trim();
    const ubicacion = String(row[4] || '').trim();
    const obsExtra = String(row[5] || '').trim();
    
    // Skip si no hay nombres
    if (!nombres || nombres.length < 3) continue;
    if (nombres === 'NOMBRES') continue;
    
    // Detectar problemas de encoding
    const tieneProblema = nombres.includes('Ã') || nombres.includes('Ã¡') || nombres.includes('Ã©');
    if (tieneProblema && !problemas.includes(nombres)) {
        problemas.push(nombres);
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
}

console.log(`✅ Socios procesados: ${members.length}`);
console.log(`⚠️  Nombres con problemas de encoding: ${problemas.length}\n`);

if (problemas.length > 0) {
    console.log('📋 Primeros 10 problemas detectados:');
    problemas.slice(0, 10).forEach((n, i) => {
        console.log(`${i + 1}. ${n}`);
    });
    console.log('');
}

// Guardar
fs.writeFileSync('data/members.json', JSON.stringify(members, null, 2));
console.log('✅ Guardado en data/members.json\n');

// Verificar específicamente el caso de "José"
const joseCases = members.filter(m => 
    m.nombres.includes('JosÃ') || 
    m.nombres.includes('José') ||
    (m.nombres.includes('Jose') && m.nombres.includes('Ramon'))
).slice(0, 5);

console.log('🔍 Verificación: Casos con "José/JosÃ":');
joseCases.forEach(m => {
    const mal = m.nombres.includes('Ã');
    console.log(`  ${mal ? '❌' : '✅'} ${m.nombres}`);
});

// Estadísticas finales
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

console.log('\n📊 Estadísticas:');
console.log(`Total: ${members.length} socios`);
console.log(`Con carros: ${conCarros.length}`);
console.log(`Problemas de encoding: ${problemas.length}`);

