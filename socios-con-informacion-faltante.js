// Script para listar todos los socios con información faltante
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/members.json', 'utf8'));

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║     SOCIOS CON INFORMACIÓN FALTANTE - ELEMENTOS Y UBICACIÓN    ║');
console.log('╚══════════════════════════════════════════════════════════════════╝\n');

// Filtrar socios sin elemento o sin ubicación
const sinElemento = data.filter(m => !m.elemento || m.elemento === '');
const sinUbicacion = data.filter(m => !m.ubicacion || m.ubicacion === '');

console.log('═'.repeat(90));
console.log('📦 SOCIOS SIN ELEMENTO (Total: ' + sinElemento.length + ')');
console.log('═'.repeat(90));
console.log();

sinElemento.forEach((m, i) => {
    console.log(`${i + 1}. ${m.nombres}`);
    console.log(`   N° Socio: ${m.numeroSocio || 'N/A'}`);
    console.log(`   Ubicación: ${m.ubicacion || 'N/A'}`);
    console.log(`   Observación: ${m.observacion || 'N/A'}`);
    console.log();
});

console.log('\n');
console.log('═'.repeat(90));
console.log('📍 SOCIOS SIN UBICACIÓN (Total: ' + sinUbicacion.length + ')');
console.log('═'.repeat(90));
console.log();

sinUbicacion.forEach((m, i) => {
    console.log(`${i + 1}. ${m.nombres}`);
    console.log(`   N° Socio: ${m.numeroSocio || 'N/A'}`);
    console.log(`   Elemento: ${m.elemento || 'N/A'}`);
    console.log(`   Observación: ${m.observacion || 'N/A'}`);
    console.log();
});

// Crear archivo de texto con toda la información
let output = '═══════════════════════════════════════════════════════════════════\n';
output += '    SOCIOS CON INFORMACIÓN FALTANTE - PWCC CASILLA GOLF            \n';
output += '═══════════════════════════════════════════════════════════════════\n\n';
output += `Fecha: ${new Date().toLocaleString('es-ES')}\n\n`;

output += '─'.repeat(90) + '\n';
output += `📦 SOCIOS SIN ELEMENTO (Total: ${sinElemento.length})\n`;
output += '─'.repeat(90) + '\n\n';

sinElemento.forEach((m, i) => {
    output += `${i + 1}. ${m.nombres}\n`;
    output += `   N° Socio: ${m.numeroSocio || 'N/A'}\n`;
    output += `   Ubicación: ${m.ubicacion || 'N/A'}\n`;
    output += `   Observación: ${m.observacion || 'N/A'}\n`;
    output += '\n';
});

output += '\n' + '─'.repeat(90) + '\n';
output += `📍 SOCIOS SIN UBICACIÓN (Total: ${sinUbicacion.length})\n`;
output += '─'.repeat(90) + '\n\n';

sinUbicacion.forEach((m, i) => {
    output += `${i + 1}. ${m.nombres}\n`;
    output += `   N° Socio: ${m.numeroSocio || 'N/A'}\n`;
    output += `   Elemento: ${m.elemento || 'N/A'}\n`;
    output += `   Observación: ${m.observacion || 'N/A'}\n`;
    output += '\n';
});

// Guardar en archivo
fs.writeFileSync('socios-informacion-faltante.txt', output, 'utf8');

console.log('\n✅ Archivo guardado: socios-informacion-faltante.txt\n');

