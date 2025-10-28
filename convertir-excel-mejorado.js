// Script mejorado para convertir Excel a JSON
const fs = require('fs');
const XLSX = require('xlsx');

console.log('📊 Convirtiendo socios-pwcc.csv.xlsx a JSON (versión mejorada)...\n');

try {
    // Leer el archivo Excel
    const workbook = XLSX.readFile('socios-pwcc.csv.xlsx', { 
        raw: false,
        dateNF: 'yyyy-mm-dd'
    });
    
    // Obtener el nombre de la primera hoja
    const sheetName = workbook.SheetNames[0];
    console.log(`✅ Hoja: "${sheetName}"\n`);
    
    // Convertir a JSON con opción de mantener formato
    const worksheet = workbook.Sheets[sheetName];
    
    // Primero ver el formato raw
    console.log('Primeras 5 filas RAW:');
    const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
    rawData.slice(0, 5).forEach((row, i) => {
        console.log(`${i + 1}:`, row);
    });
    console.log('\n');
    
    // Intentar con diferentes opciones de header
    console.log('Intentando con header automático...');
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
        header: 1, 
        defval: '',
        raw: false
    });
    
    console.log(`Total de filas: ${jsonData.length}\n`);
    
    // Buscar la fila de headers
    let headerRowIndex = -1;
    let headers = [];
    
    for (let i = 0; i < Math.min(10, jsonData.length); i++) {
        const row = jsonData[i];
        const rowStr = row.join('|').toLowerCase();
        
        if (rowStr.includes('socio') && rowStr.includes('nombre')) {
            headerRowIndex = i;
            headers = row.map(h => String(h).trim());
            console.log(`✅ Headers encontrados en fila ${i + 1}:`);
            console.log(headers.join(' | '));
            console.log('\n');
            break;
        }
    }
    
    if (headerRowIndex === -1) {
        console.log('⚠️  Headers no encontrados, usando primera fila');
        headers = jsonData[0];
    }
    
    // Procesar los datos
    const members = [];
    
    for (let i = headerRowIndex + 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        
        if (row.every(cell => !cell || cell.trim() === '')) {
            continue; // Skip filas vacías
        }
        
        // Mapear columnas (resiliente a variaciones)
        let numeroSocio = '';
        let nombres = '';
        let elemento = '';
        let ubicacion = '';
        let observacion = '';
        
        // Buscar los índices de las columnas
        const socioIdx = headers.findIndex(h => 
            h.toLowerCase().includes('socio') && h.toLowerCase().includes('n°') || 
            h.toLowerCase().includes('numero') || h.toLowerCase().includes('n º')
        );
        const nomIdx = headers.findIndex(h => 
            h.toLowerCase().includes('nombre')
        );
        const elemIdx = headers.findIndex(h => 
            h.toLowerCase().includes('elemento')
        );
        const ubiIdx = headers.findIndex(h => 
            h.toLowerCase().includes('ubicaci')
        );
        const obsIdx = headers.findIndex(h => 
            h.toLowerCase().includes('observ')
        );
        
        // Extraer datos
        numeroSocio = socioIdx >= 0 ? String(row[socioIdx] || '').trim() : '';
        nombres = nomIdx >= 0 ? String(row[nomIdx] || '').trim() : '';
        elemento = elemIdx >= 0 ? String(row[elemIdx] || '').trim() : '';
        ubicacion = ubiIdx >= 0 ? String(row[ubiIdx] || '').trim() : '';
        observacion = obsIdx >= 0 ? String(row[obsIdx] || '').trim() : '';
        
        // Si no hay nombres o es un header, saltar
        if (!nombres || nombres.toLowerCase().includes('nombre') || nombres.toLowerCase().includes('socio')) {
            continue;
        }
        
        // Extraer apellido
        const apellido = nombres ? nombres.split(' ').slice(-1)[0] : '';
        
        members.push({
            numeroSocio: numeroSocio,
            nombres: nombres,
            apellido: apellido,
            elemento: elemento,
            ubicacion: ubicacion,
            observacion: observacion
        });
    }
    
    console.log(`✅ Socios procesados: ${members.length}\n`);
    
    // Guardar
    fs.writeFileSync('data/members.json', JSON.stringify(members, null, 2));
    console.log('✅ Guardado en: data/members.json\n');
    
    // Mostrar ejemplos
    console.log('📋 Ejemplos de socios procesados:');
    members.slice(0, 5).forEach((m, i) => {
        console.log(`${i + 1}. ${m.nombres} | N° ${m.numeroSocio || 'N/A'} | ${m.elemento} | ${m.ubicacion}`);
    });
    console.log('\n');
    
    // Estadísticas
    const porElemento = {};
    const conCarros = [];
    
    members.forEach(m => {
        const elem = m.elemento || 'Sin especificar';
        porElemento[elem] = (porElemento[elem] || 0) + 1;
        
        if (m.observacion && (
            m.observacion.toLowerCase().includes('bodega') ||
            m.observacion.toLowerCase().includes('carros') ||
            m.observacion.toLowerCase().includes('colgado')
        )) {
            conCarros.push(m);
        }
    });
    
    console.log('📊 Estadísticas:');
    console.log(`Total: ${members.length} socios`);
    console.log('\nPor tipo:');
    Object.entries(porElemento).sort((a, b) => b[1] - a[1]).forEach(([tipo, count]) => {
        console.log(`  ${tipo}: ${count}`);
    });
    console.log(`\n🚗 Con carros: ${conCarros.length}\n`);
    
} catch (error) {
    console.error('❌ Error:', error.message);
    console.log(error.stack);
}

