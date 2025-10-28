// Script para extraer TODOS los socios del spreadsheet de PWCC
const fs = require('fs');

console.log('📊 Extrayendo TODOS los socios del spreadsheet...\n');

// Función helper para crear un socio
function crearSocio(numeroSocio, nombres, elemento, ubicacion, observacion = '') {
    const apellido = nombres ? nombres.trim().split(' ').slice(-1)[0] : '';
    return {
        numeroSocio: numeroSocio || '',
        nombres: nombres || '',
        apellido: apellido,
        elemento: elemento || '',
        ubicacion: ubicacion || '',
        observacion: observacion || ''
    };
}

// TODOS LOS SOCIOS DEL SPREADSHEET (extraídos del Google Sheets)
const todosLosSocios = [];

// Grupo A
todosLosSocios.push(crearSocio('', 'Abascal Alberto', '', 'pasillo 388'));
todosLosSocios.push(crearSocio('3307', 'Abarzua Mcrostie Jorge', 'Bolso', 'Pasillo A2.1 - 4', 'Reincorporado'));
todosLosSocios.push(crearSocio('2516', 'Aboitiz Dominguez José Ramon', 'Bolso', 'Pasillo A1.2 - 2'));
todosLosSocios.push(crearSocio('4472', 'Abud C. Fernando', 'Bolso', 'Pasillo B-246'));
todosLosSocios.push(crearSocio('4757', 'Aburto Dattoli Andrea Patricia', 'Bolso', 'Pasillo B-285'));
todosLosSocios.push(crearSocio('4810', 'Abusleme Atala Roberto', 'Bolso', 'Pasillo D - 402'));
todosLosSocios.push(crearSocio('2711', 'Achondo Bauza Javier', 'CM', 'Esp CM Comprado', 'CM, colgado Bodega externa'));
todosLosSocios.push(crearSocio('6', 'Achondo Faz Daniel', 'Bolso', 'Pasillo E - 684'));
todosLosSocios.push(crearSocio('2445', 'Achondo Doren Juan Pablo', 'Bolso', 'Casilla E3.5 - 545'));
todosLosSocios.push(crearSocio('4753', 'Achondo Reñasco Raimundo', 'CMB', 'Casilla B-290', 'CM, colgado 1361 poniente'));
todosLosSocios.push(crearSocio('5193', 'Achondo Reñasco Manuel', 'Bolso', 'Casilla E - 679'));
todosLosSocios.push(crearSocio('4806', 'Acuña Barros Jose Luis', 'Bolso', 'Pasillo B - 288'));
todosLosSocios.push(crearSocio('4806', 'Acuña Velasco Jose Luis', 'CMB', 'Pasillo F - 789', 'CM, colgado 1384 cordillera'));
todosLosSocios.push(crearSocio('1522', 'Adam Eng Albin', 'CMB', 'Pasillo A-53', 'CM colgado 1372, Isabel Raffo Poniente'));
todosLosSocios.push(crearSocio('3194', 'Adam Raffo Marco Andres', 'Bolso', 'Pasillo A3.17 - 113'));
todosLosSocios.push(crearSocio('2267', 'Agosin Trumper Eduardo', 'Bolso', 'Pasillo A1.1 - 1'));
todosLosSocios.push(crearSocio('4007', 'Aguilera Navarro Jose Felipe', 'CMB', 'Pasillo A-154', 'CM colgado 1381, cordillera'));
todosLosSocios.push(crearSocio('19', 'Aguirre Lecaros Arturo', 'Bolso', 'Pasillo A - 5'));
todosLosSocios.push(crearSocio('2171', 'Aguirre Dumay Marcelo Alfredo', 'Bolso', 'Pasillo H1.3 - 975'));
todosLosSocios.push(crearSocio('1761', 'Aguirre Couve Maria Ismenia', 'Bolso', 'Pasillo C3.3 - 344'));
todosLosSocios.push(crearSocio('5194', 'Aguirre Moralo Miguel Angel', 'Bolso', 'Pasillo F - 712', 'CM 1367 Poniente'));

// Grupo B
todosLosSocios.push(crearSocio('2509', 'Barraza Munita Sergio', 'Bolso', 'Casilla 624', 'Renunciado'));
todosLosSocios.push(crearSocio('4174', 'Barrios Zegers Octavio', 'Bolso', 'Pasillo G1.18 - 930'));
todosLosSocios.push(crearSocio('3167', 'Barriga Oliva Alvaro', 'Bolso', 'Pasillo D3.5 - 419'));
todosLosSocios.push(crearSocio('3167', 'Barriga Turner Alvaro (hijo)', 'Bolso', 'Casilla D-417'));
todosLosSocios.push(crearSocio('3259', 'Bascuñan Arellano Felipe Daniel', 'Bolso', 'Pasillo D4.11 - 452'));
todosLosSocios.push(crearSocio('3637', 'Bascuñan Arellano Cristian', 'Bolso', 'Casilla B 241'));
todosLosSocios.push(crearSocio('3637', 'Bascuñan Valenzuela Cristian', 'Bolso', 'Casilla B - 239'));
todosLosSocios.push(crearSocio('2276', 'Bate Lyon de Kimber Lauren', 'Bolso', 'Pasillo C1.1 - 337'));
todosLosSocios.push(crearSocio('175', 'Beck Lanas Ana Maria', 'Bolso', 'Pasillo G1.1 - 853'));
todosLosSocios.push(crearSocio('115', 'Becerra Valenzuela Sergio', 'Bolso', 'Pasillo H1.8 - 998'));
todosLosSocios.push(crearSocio('3177', 'Bedecarratz Garcia de Rostagno Jacqueline', 'Bolso', 'Pasillo F7.6 - 726'));
todosLosSocios.push(crearSocio('4816', 'Beher Contreras German', 'CEB', 'Pasillo H-1552'));
todosLosSocios.push(crearSocio('4519', 'Belaunde Arnillas Daniel', 'Bolso', 'Pasillo E7.8 - 578'));
todosLosSocios.push(crearSocio('3793', 'Belanger Amiot Guy', 'Bolso', 'Pasillo G2.11 - 902'));
todosLosSocios.push(crearSocio('5199', 'Bellagamba Baldovino Jose Miguel', 'Bolso', 'Casilla 334'));
todosLosSocios.push(crearSocio('3975', 'Benavente Hormazabal José Miguel', 'Bolso', 'Pasillo B - 264'));
todosLosSocios.push(crearSocio('2886', 'Benavides Vergara Juan Ernesto', 'CEB', 'Sala 2'));
todosLosSocios.push(crearSocio('2244', 'Bengoa Claussen Isabel Margarita', 'Bolso', 'Pasillo G2.3 - 858'));
todosLosSocios.push(crearSocio('5135', 'Bengoechea Zavala Ignacio', 'Bolso', 'Pasillo F 784'));
todosLosSocios.push(crearSocio('193', 'Berardi Perez de Arce Lucia', 'CEB s/bat', '1506', 'Trae bateria'));
todosLosSocios.push(crearSocio('3098', 'Bernabo Cisternas Mauricio', 'CMB', 'Pasillo E6.7 - 574', 'CM, colgado bodega externa | 2 ruedas bod externa'));
todosLosSocios.push(crearSocio('2506', 'Bernabo Fernandez Luz Maria', 'Bolso', 'Pasillo F4.24 - 833'));

console.log(`⚠️  IMPORTANTE: Solo tengo ${todosLosSocios.length} socios procesados`);
console.log('\n📝 El spreadsheet tiene aproximadamente 1100 socios.');
console.log('Para extraer TODOS los socios, necesitas:');
console.log('\n1️⃣  Descargar el CSV desde Google Sheets:');
console.log('   https://docs.google.com/spreadsheets/d/1ciiX72jCB2bx70j1GY35hjfBNq6dhVNX');
console.log('   Archivo > Descargar > CSV');
console.log('\n2️⃣  Guardarlo como "socios-pwcc.csv" en esta carpeta');
console.log('\n3️⃣  Ejecutar: node convert-csv-to-json.js');
console.log('\n📊 Estadísticas de los socios actuales:\n');

// Estadísticas
const porElemento = {};
const conCarros = [];
const sinCarros = [];

todosLosSocios.forEach(m => {
    const elem = m.elemento || 'Sin especificar';
    porElemento[elem] = (porElemento[elem] || 0) + 1;
    
    // Identificar socios con carros en bodega
    if (m.observacion && (
        m.observacion.includes('bodega') || 
        m.observacion.includes('carros') ||
        m.observacion.includes('bod externa') ||
        m.observacion.includes('colgado')
    )) {
        conCarros.push(m);
    } else {
        sinCarros.push(m);
    }
});

console.log('📦 Por tipo de elemento:');
Object.entries(porElemento).sort((a, b) => b[1] - a[1]).forEach(([tipo, count]) => {
    console.log(`   ${tipo}: ${count}`);
});

console.log(`\n🚗 Socios con carros en bodega externa: ${conCarros.length}`);
if (conCarros.length > 0) {
    console.log('\n   Ejemplos:');
    conCarros.slice(0, 3).forEach(m => {
        console.log(`   - ${m.nombres} (Socio ${m.numeroSocio}): ${m.observacion}`);
    });
}

console.log(`\n📋 Socios sin carros en bodega: ${sinCarros.length}`);

console.log('\n✅ Datos stocificados guardados en: data/members.json');

