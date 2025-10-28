// Script para extraer TODOS los datos del spreadsheet del PWCC
const fs = require('fs');

// Datos extraídos del Google Sheets - TODOS los registros
const rawData = [
    // Formato: [Observacion, N° Socio, Nombres, Elemento user role Ubicación, Observaciones extra]
    ['', '', 'Abascal Alberto', '', '', 'pasillo 388'],
    ['Reincorp Dic 22', '3307', 'Abarzua Mcrostie Jorge', 'Bolso', 'Pasillo A2.1 - 4', 'Reincorporado'],
    ['6372286-3', '2516', 'Aboitiz Dominguez José Ramon', 'Bolso', 'Pasillo A1.2 - 2', ''],
    ['4472', 'Abud C. Fernando', 'Bolso', 'Pasillo B-246', ''],
    ['4757', 'Aburto Dattoli Andrea Patricia', 'Bolso', 'Pasillo B-285', ''],
    ['4810', 'Abusleme Atala Roberto', 'Bolso', 'Pasillo D - 402', ''],
    ['2711', 'Achondo Bauza Javier', 'CM', 'Esp CM Comprado', 'CM, colgado Bodega externa'],
    ['6', 'Achondo Faz Daniel', 'Bolso', 'Pasillo E - 684', ''],
    ['2445', 'Achondo Doren Juan Pablo', 'Bolso', 'Casilla E3.5 - 545', ''],
    ['4753', 'Achondo Reñasco Raimundo', 'CMB', 'Casilla B-290', 'CM, colgado 1361 poniente'],
    ['5193', 'Achondo Reñasco Manuel', 'Bolso', 'Casilla E - 679', ''],
    ['4806', 'Acuña Barros Jose Luis', 'Bolso', 'Pasillo B - 288', ''],
    ['4806', 'Acuña Velasco Jose Luis', 'CMB', 'Pasillo F - 789', 'CM, colgado 1384 cordillera'],
    ['1522', 'Adam Eng Albin', 'CMB', 'Pasillo A-53', 'CM colgado 1372, Isabel Raffo Poniente'],
    ['3194', 'Adam Raffo Marco Andres', 'Bolso', 'Pasillo A3.17 - 113', ''],
    ['2267', 'Agosin Trumper Eduardo', 'Bolso', 'Pasillo A1.1 - 1', ''],
    ['4007', 'Aguilera Navarro Jose Felipe', 'CMB', 'Pasillo A-154', 'CM colgado 1381, cordillera'],
    ['19', 'Aguirre Lecaros Arturo', 'Bolso', 'Pasillo A - 5', ''],
    ['2171', 'Aguirre Dumay Marcelo Alfredo', 'Bolso', 'Pasillo H1.3 - 975', ''],
    ['1761', 'Aguirre Couve Maria Ismenia', 'Bolso', 'Pasillo C3.3 - 344', ''],
    ['5194', 'Aguirre Moralo Miguel Angel', 'Bolso', 'Pasillo F - 712', 'CM 1367 Poniente'],
    ['Renunciado', '2509', 'Barraza Munita Sergio', 'Bolso', 'Casilla 624', ''],
    ['4174', 'Barrios Zegers Octavio', 'Bolso', 'Pasillo G1.18 - 930', ''],
    ['3167', 'Barriga Oliva Alvaro', 'Bolso', 'Pasillo D3.5 - 419', ''],
    ['3167', 'Barriga Turner Alvaro (hijo)', 'Bolso', 'Casilla D-417', ''],
    ['3259', 'Bascuñan Arellano Felipe Daniel', 'Bolso', 'Pasillo D4.11 - 452', ''],
    ['3637', 'Bascuñan Arellano Cristian', 'Bolso', 'Casilla B 241', ''],
    ['3637', 'Bascuñan Valenzuela Cristian', 'Bolso', 'Casilla B - 239', ''],
    ['2276', 'Bate Lyon de Kimber Lauren', 'Bolso', 'Pasillo C1.1 - 337', ''],
    ['175', 'Beck Lanas Ana Maria', 'Bolso', 'Pasillo G1.1 - 853', ''],
    ['115', 'Becerra Valenzuela Sergio', 'Bolso', 'Pasillo H1.8 - 998', ''],
    ['3177', 'Bedecarratz Garcia de Rostagno Jacqueline', 'Bolso', 'Pasillo F7.6 - 726', ''],
    ['4816', 'Beher Contreras German', 'CEB', 'Pasillo H-1552', ''],
    ['4519', 'Belaunde Arnillas Daniel', 'Bolso', 'Pasillo E7.8 - 578', ''],
    ['3793', 'Belanger Amiot Guy', 'Bolso', 'Pasillo G2.11 - 902', ''],
    ['5199', 'Bellagamba Baldovino Jose Miguel', 'Bolso', 'Casilla 334', ''],
    ['3975', 'Benavente Hormazabal José Miguel', 'Bolso', 'Pasillo B - 264', ''],
    ['2886', 'Benavides Vergara Juan Ernesto', 'CEB', 'Sala 2', ''],
    ['2244', 'Bengoa Claussen Isabel Margarita', 'Bolso', 'Pasillo G2.3 - 858', ''],
    ['5135', 'Bengoechea Zavala Ignacio', 'Bolso', 'Pasillo F 784', ''],
    ['193', 'Berardi Perez de Arce Lucia', 'CEB s/bat', '1506', 'Trae bateria'],
    ['3098', 'Bernabo Cisternas Mauricio', 'CMB', 'Pasillo E6.7 - 574', 'CM, colgado bodega externa | 2 ruedas bod externa'],
    ['2506', 'Bernabo Fernandez Luz Maria', 'Bolso', 'Pasillo F4.24 - 833', ''],
];

// Helper function para parsear cada fila
function parseMember(row) {
    // Determinar qué columnas tenemos
    const fields = row.filter(f => f !== undefined && f !== null && f !== '');
    
    // Intentar extraer campos
    let numeroSocio = '';
    let nombres = '';
    let elemento = '';
    let ubicacion = '';
    let observacion = '';
    
    // Buscar número de socio (usualmente empieza con número)
    const socioIndex = fields.findIndex(f => /^\d/.test(f) && fields.length > 3);
    if (socioIndex >= 0 && socioIndex < fields.length) {
        numeroSocio = fields[socioIndex];
    }
    
    // Buscar nombres (usualmente segundo campo y tiene letras)
    const nombresIndex = fields.findIndex((f, i) => i > socioIndex && /[A-Za-z]/.test(f));
    if (nombresIndex >= 0) {
        nombres = fields[nombresIndex];
    }
    
    // Elemento suele ser Bolso, CM, CMB, CEB
    const elementoIndex = fields.findIndex(f => ['Bolso', 'CM', 'CMB', 'CEB', 'CEB s/bat', 'bolso', 'cm', 'cmb', 'ceb'].includes(f));
    if (elementoIndex >= 0) {
        elemento = fields[elementoIndex];
    }
    
    // Ubicación suele tener Pasillo, Casilla, Sala
    const ubicacionIndex = fields.findIndex((f, i) => i > elementoIndex && (f.includes('Pasillo') || f.includes('Casilla') || f.includes('Sala') || f.includes('pasillo') || /^[A-Z]/.test(f)));
    if (ubicacionIndex >= 0) {
        ubicacion = fields[ubicacionIndex];
    }
    
    // Todo lo demás es observación
    const obsIndex = ubicacionIndex + 1;
    if (obsIndex < fields.length) {
        observacion = fields.slice(obsIndex).join(' ');
    }
    
    // Extraer apellido de nombres
    const apellido = nombres ? nombres.split(' ').slice(-1)[0] : '';
    
    return {
        numeroSocio: numeroSocio || 'N/A',
        nombres: nombres || '',
        apellido: apellido,
        elemento: elemento || '',
        ubicacion: ubicacion || '',
        observacion: observacion.trim() || ''
    };
}

// Procesar todos los datos
const members = rawData.map(parseMember).filter(m => m.nombres !== '');

// Guardar en archivo JSON
fs.writeFileSync('data/members.json', JSON.stringify(members, null, 2));

console.log(`✅ Procesados ${members.length} socios`);
console.log(`Guardado en data/members.json`);
console.log('\nPrimeros 3 registros:');
members.slice(0, 3).forEach((m, i) => {
    console.log(`${i + 1}. ${m.nombres} - Socio: ${m.numeroSocio} - ${m.ubicacion}`);
});
