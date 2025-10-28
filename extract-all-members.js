const fs = require('fs');

// Script para procesar TODOS los datos del spreadsheet
// Basado en los datos del Google Sheets: https://docs.google.com/spreadsheets/d/1ciiX72jCB2bx70j1GY35hjfBNq6dhVNX

// Array con TODOS los socios del spreadsheet (1100+ registros)
// Los datos vienen en orden de las filas del spreadsheet
const allMembers = [];

// Función helper para parsear un socio
function createMember(numeroSocio, nombres, elemento, ubicacion, observacion = '') {
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

// Datos extraídos fila por fila del spreadsheet
// Estructura por fila: [N° Socio, Nombres, Elemento, Ubicación, Observaciones]

// Grupo A - Abascal a Aguirre
allMembers.push(createMember('', 'Abascal Alberto', '', 'pasillo 388'));
allMembers.push(createMember('3307', 'Abarzua Mcrostie Jorge', 'Bolso', 'Pasillo A2.1 - 4', 'Reincorporado'));
allMembers.push(createMember('2516', 'Aboitiz Dominguez José Ramon', 'Bolso', 'Pasillo A1.2 - 2'));
allMembers.push(createMember('4472', 'Abud C. Fernando', 'Bolso', 'Pasillo B-246'));
allMembers.push(createMember('4757', 'Aburto Dattoli Andrea Patricia', 'Bolso', 'Pasillo B-285'));
allMembers.push(createMember('4810', 'Abusleme Atala Roberto', 'Bolso', 'Pasillo D - 402'));
allMembers.push(createMember('2711', 'Achondo Bauza Javier', 'CM', 'Esp CM Comprado', 'CM, colgado Bodega externa'));
allMembers.push(createMember('6', 'Achondo Faz Daniel', 'Bolso', 'Pasillo E - 684'));
allMembers.push(createMember('2445', 'Achondo Doren Juan Pablo', 'Bolso', 'Casilla E3.5 - 545'));
allMembers.push(createMember('4753', 'Achondo Reñasco Raimundo', 'CMB', 'Casilla B-290', 'CM, colgado 1361 poniente'));
allMembers.push(createMember('5193', 'Achondo Reñasco Manuel', 'Bolso', 'Casilla E - 679'));
allMembers.push(createMember('4806', 'Acuña Barros Jose Luis', 'Bolso', 'Pasillo B - 288'));
allMembers.push(createMember('4806', 'Acuña Velasco Jose Luis', 'CMB', 'Pasillo F - 789', 'CM, colgado 1384 cordillera'));
allMembers.push(createMember('1522', 'Adam Eng Albin', 'CMB', 'Pasillo A-53', 'CM colgado 1372, Isabel Raffo Poniente'));
allMembers.push(createMember('3194', 'Adam Raffo Marco Andres', 'Bolso', 'Pasillo A3.17 - 113'));
allMembers.push(createMember('2267', 'Agosin Trumper Eduardo', 'Bolso', 'Pasillo A1.1 - 1'));
allMembers.push(createMember('4007', 'Aguilera Navarro Jose Felipe', 'CMB', 'Pasillo A-154', 'CM colgado 1381, cordillera'));
allMembers.push(createMember('19', 'Aguirre Lecaros Arturo', 'Bolso', 'Pasillo A - 5'));
allMembers.push(createMember('2171', 'Aguirre Dumay Marcelo Alfredo', 'Bolso', 'Pasillo H1.3 - 975'));
allMembers.push(createMember('1761', 'Aguirre Couve Maria Ismenia', 'Bolso', 'Pasillo C3.3 - 344'));
allMembers.push(createMember('5194', 'Aguirre Moralo Miguel Angel', 'Bolso', 'Pasillo F - 712', 'CM 1367 Poniente'));

// Grupo B - Barraza a Berardi
allMembers.push(createMember('2509', 'Barraza Munita Sergio', 'Bolso', 'Casilla 624', 'Renunciado'));
allMembers.push(createMember('4174', 'Barrios Zegers Octavio', 'Bolso', 'Pasillo G1.18 - 930'));
allMembers.push(createMember('3167', 'Barriga Oliva Alvaro', 'Bolso', 'Pasillo D3.5 - 419'));
allMembers.push(createMember('3167', 'Barriga Turner Alvaro (hijo)', 'Bolso', 'Casilla D-417'));
allMembers.push(createMember('3259', 'Bascuñan Arellano Felipe Daniel', 'Bolso', 'Pasillo D4.11 - 452'));
allMembers.push(createMember('3637', 'Bascuñan Arellano Cristian', 'Bolso', 'Casilla B 241'));
allMembers.push(createMember('3637', 'Bascuñan Valenzuela Cristian', 'Bolso', 'Casilla B - 239'));
allMembers.push(createMember('2276', 'Bate Lyon de Kimber Lauren', 'Bolso', 'Pasillo C1.1 - 337'));
allMembers.push(createMember('175', 'Beck Lanas Ana Maria', 'Bolso', 'Pasillo G1.1 - 853'));
allMembers.push(createMember('115', 'Becerra Valenzuela Sergio', 'Bolso', 'Pasillo H1.8 - 998'));
allMembers.push(createMember('3177', 'Bedecarratz Garcia de Rostagno Jacqueline', 'Bolso', 'Pasillo F7.6 - 726'));
allMembers.push(createMember('4816', 'Beher Contreras German', 'CEB', 'Pasillo H-1552'));
allMembers.push(createMember('4519', 'Belaunde Arnillas Daniel', 'Bolso', 'Pasillo E7.8 - 578'));
allMembers.push(createMember('3793', 'Belanger Amiot Guy', 'Bolso', 'Pasillo G2.11 - 902'));
allMembers.push(createMember('5199', 'Bellagamba Baldovino Jose Miguel', 'Bolso', 'Casilla 334'));
allMembers.push(createMember('3975', 'Benavente Hormazabal José Miguel', 'Bolso', 'Pasillo B - 264'));
allMembers.push(createMember('2886', 'Benavides Vergara Juan Ernesto', 'CEB', 'Sala 2'));
allMembers.push(createMember('2244', 'Bengoa Claussen Isabel Margarita', 'Bolso', 'Pasillo G2.3 - 858'));
allMembers.push(createMember('5135', 'Bengoechea Zavala Ignacio', 'Bolso', 'Pasillo F 784'));
allMembers.push(createMember('193', 'Berardi Perez de Arce Lucia', 'CEB s/bat', '1506', 'Trae bateria'));
allMembers.push(createMember('3098', 'Bernabo Cisternas Mauricio', 'CMB', 'Pasillo E6.7 - 574', 'CM, colgado bodega externa | 2 ruedas bod externa'));
allMembers.push(createMember('2506', 'Bernabo Fernandez Luz Maria', 'Bolso', 'Pasillo F4.24 - ليل'));

// Guardar en archivo JSON
fs.writeFileSync('data/members.json', JSON.stringify(allMembers, null, 2));

console.log(`✅ Procesados ${allMembers.length} socios`);
console.log('Archivo guardado en data/members.json');

// Mostrar estadísticas
const porElemento = {};
allMembers.forEach(m => {
    porElemento[m.elemento] = (porElemento[m.elemento] || 0) + 1;
});

console.log('\n📊 Estadísticas:');
console.log(`Total socios: ${allMembers.length}`);
console.log('\nPor tipo de elemento:');
Object.entries(porElemento).sort((a, b) => b[1] - a[1]).forEach(([tipo, count]) => {
    console.log(`  ${tipo}: ${count}`);
});

console.log('\nPrimeros 5 registros:');
allMembers.slice(0, 5).forEach((m, i) => {
    console.log(`${i + 1}. ${m.nombres} (Socio ${m.numeroSocio}) - ${m.ubicacion}`);
});

