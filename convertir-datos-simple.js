const fs = require('fs');
const XLSX = require('xlsx');

console.log('📊 Convirtiendo socios-pwcc.csv.xlsx a JSON\n');

const workbook = XLSX.readFile('socios-pwcc.csv.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

const members = [];

for (let i = 0; i < data.length; i++) {
    const row = data[i];
    let rowStr = Array.isArray(row) ? row.join(',') : String(row);
    
    // Parsear CSV si está en string
    const parts = parseCSV(rowStr);
    
    if (parts.length >= 3) {
        const observacion = parts[0] || '';
        const numeroSocio = parts[1] || '';
        const nombres = parts[2] || '';
        const elemento = parts[3] || '';
        const ubicacion = parts[4] || '';
        const obsExtra = parts[5] || '';
        
        // Skip si es header o vacío
        if (nombres && !nombres.includes('NOMBRES') && !nombres.includes('Observacion')) {
            const apellido = nombres.trim().split(' ').slice(-1)[0];
            
            members.push({
                numeroSocio: numeroSocio.trim(),
                nombres: nombres.trim(),
                apellido: apellido,
                elemento: elemento.trim(),
                ubicacion: ubicacion.trim(),
                observacion: (observacion + ' ' + obsExtra).trim()
            });
        }
    }
}

fs.writeFileSync('data/members.json', JSON.stringify(members, null, 2));

console.log(`✅ Procesados: ${members.length} socios\n`);

const porElemento = {};
const conCarros = members.filter(m => 
    m.observacion.toLowerCase().includes('bodega') ||
    m.observacion.toLowerCase().includes('colgado') ||
    m.observacion.toLowerCase().includes('carros')
);

members.forEach(m => {
    const elem = m.elemento || 'Sin especificar';
    porElemento[elem] = (porElemento[elem] || 0) + 1;
});

console.log('📊 Estadísticas:');
console.log(`Total: ${members.length} socios`);
console.log(`Con carros en bodega: ${conCarros.length}`);
console.log('\nPrimeros 5:');
members.slice(0, 5).forEach((m, i) => {
    console.log(`${i + 1}. ${m.nombres} - N°${m.numeroSocio || 'N/A'} - ${m.elemento} - ${m.ubicacion}`);
});

function parseCSV(line) {
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

