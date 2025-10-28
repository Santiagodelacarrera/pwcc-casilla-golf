const fs = require('fs');
const XLSX = require('xlsx');

console.log('📊 Convirtiendo datos corregidos...\n');

const workbook = XLSX.readFile('socios-pwcc.csv.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Leer datos como array simple
const data = XLSX.utils.sheet_to_json(worksheet, { 
    header: 1,
    defval: '',
    raw: false
});

const members = [];

// Función para parsear CSV dentro de las celdas
function parseCSV(csvString) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let char of csvString) {
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

// Map de corrección de encoding
const encodingFix = {
    'JosÃ©': 'José',
    'JosÃ': 'José',
    'MarÃ­a': 'María',
    'MarÃ': 'María',
    'Ã©': 'é',
    'Ã­': 'í',
    'Ã³': 'ó',
    'Ãº': 'ú',
    'Ã±': 'ñ',
    'Ã': 'á',
    'Ã¡': 'á',
    'Ã©': 'é',
    'Ã­': 'í',
    'Ã³': 'ó',
    'Ãº': 'ú',
    'Ã': 'Ñ',
    'Â': '',
    'Ã¼': 'ü'
};

function fixEncoding(text) {
    let fixed = text;
    for (const [wrong, correct] of Object.entries(encodingFix)) {
        fixed = fixed.replace(new RegExp(wrong, 'g'), correct);
    }
    return fixed;
}

for (let i = 2; i < data.length; i++) {
    const row = data[i];
    if (!Array.isArray(row)) continue;
    
    let valores = [];
    
    // Si la celda contiene CSV, parsearlo
    if (row.length > 0 && String(row[0]).includes(',')) {
        valores = parseCSV(String(row[0]));
    } else {
        valores = row;
    }
    
    const observacion = (valores[0] || '').trim();
    const numeroSocio = (valores[1] || '').trim();
    const nombres = (valores[2] || '').trim();
    const elemento = (valores[3] || '').trim();
    const ubicacion = (valores[4] || '').trim();
    const obsExtra = (valores[5] || '').trim();
    
    if (!nombres || nombres.length < 2) continue;
    if (nombres === 'NOMBRES') continue;
    
    // Corregir encoding
    const nombresCorregidos = fixEncoding(nombres);
    const apellido = nombresCorregidos.split(' ').slice(-1)[0];
    
    members.push({
        numeroSocio: numeroSocio,
        nombres: nombresCorregidos,
        apellido: apellido,
        elemento: fixEncoding(elemento),
        ubicacion: fixEncoding(ubicacion),
        observacion: fixEncoding(`${observacion} ${obsExtra}`.trim())
    });
}

console.log(`✅ Procesados: ${members.length} socios\n`);

// Verificar el caso de "José"
const joseCases = members.filter(m => 
    m.nombres.includes('José') || 
    m.nombres.includes('Ramon')
).slice(0, 5);

console.log('🔍 Verificación de "José":');
joseCases.forEach(m => {
    console.log(`  ${m.nombres} - ${m.numeroSocio}`);
});

fs.writeFileSync('data/members.json', JSON.stringify(members, null, 2));

console.log(`\n✅ Guardado en data/members.json`);

// Estadísticas
const problemas = members.filter(m => m.nombres.includes('Ã'));
const conCarros = members.filter(m => 
    m.observacion && (
        m.observacion.toLowerCase().includes('bodega') ||
        m.observacion.toLowerCase().includes('colgado')
    )
);

console.log(`\n📊 Estadísticas:`);
console.log(`Total: ${members.length} socios`);
console.log(`Con carros: ${conCarros.length}`);
console.log(`Nombres con problemas de encoding: ${problemas.length}`);

