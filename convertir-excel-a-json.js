// Script para convertir el archivo Excel a JSON
const fs = require('fs');
const XLSX = require('xlsx');

console.log('📊 Convirtiendo socios-pwcc.csv.xlsx a JSON...\n');

try {
    // Leer el archivo Excel
    const workbook = XLSX.readFile('socios-pwcc.csv.xlsx');
    
    // Obtener el nombre de la primera hoja
    const sheetName = workbook.SheetNames[0];
    console.log(`✅ Hoja encontrada: "${sheetName}"\n`);
    
    // Convertir la hoja a JSON
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`📋 Total de filas encontradas: ${data.length}\n`);
    
    // Mostrar las primeras filas para verificar estructura
    console.log('Primeras 3 filas (estructura):');
    console.log(JSON.stringify(data.slice(0, 3), null, 2));
    console.log('\n');
    
    // Ver todas las columnas disponibles
    if (data.length > 0) {
        console.log('Columnas disponibles:');
        console.log(Object.keys(data[0]).join(', '));
        console.log('\n');
    }
    
    // Convertir al formato de miembros
    const members = [];
    let rowNum = 0;
    
    for (const row of data) {
        rowNum++;
        
        // Obtener las columnas (adaptarse a los nombres reales)
        // Intentar diferentes variaciones de nombres de columnas
        const numeroSocio = row['N° SOCIO'] || row['N°Socio'] || row['Socio'] || row['N SOCIO'] || row['Numero Socio'] || '';
        const nombres = row['NOMBRES'] || row['Nombres'] || row['Nombre'] || '';
        const elemento = row['ELEMENTO'] || row['Elemento'] || '';
        const ubicacion = row['UBICACIÓN'] || row['UBICACION'] || row['Ubicación'] || row['Ubicacion'] || '';
        const observacion = row['Observacion'] || row['Observación'] || row['Observaciones'] || '';
        
        // Si no hay nombres, saltar esta fila (probablemente es header o fila vacía)
        if (!nombres || nombres.trim() === '' || nombres.includes('NOMBRES')) {
            continue;
        }
        
        // Extraer apellido de los nombres
        const apellido = nombres.trim().split(' ').slice(-1)[0];
        
        members.push({
            numeroSocio: String(numeroSocio || '').trim(),
            nombres: String(nombres || '').trim(),
            apellido: apellido,
            elemento: String(elemento || '').trim(),
            ubicacion: String(ubicacion || '').trim(),
            observacion: String(observacion || '').trim()
        });
    }
    
    console.log(`✅ Socios procesados: ${members.length}\n`);
    
    // Guardar en archivo JSON
    fs.writeFileSync('data/members.json', JSON.stringify(members, null, 2));
    console.log('✅ Archivo guardado: data/members.json\n');
    
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
    console.log(`Total de socios: ${members.length}`);
    console.log('\nPor tipo de elemento:');
    Object.entries(porElemento).sort((a, b) => b[1] - a[1]).forEach(([tipo, count]) => {
        console.log(`  ${tipo}: ${count}`);
    });
    
    console.log(`\n🚗 Socios con carros en bodega: ${conCarros.length}`);
    
    console.log('\n✅ Conversión completada exitosamente!');
    console.log('🎯 Ahora puedes ejecutar: npm start\n');
    
} catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nDetalles del error:');
    console.log(error);
    process.exit(1);
}

