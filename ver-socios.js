// Script para ver todos los socios registrados
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/members.json', 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║           PWCC CASILLA GOLF - BASE DE DATOS                  ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

console.log(`📊 Total de socios registrados: ${data.length} de ~1100\n`);

console.log('═'.repeat(80));
console.log('📋 LISTADO COMPLETO DE SOCIOS');
console.log('═'.repeat(80));
console.log();

data.forEach((socio, i) => {
    const tieneCarro = socio.observacion && (
        socio.observacion.toLowerCase().includes('bodega') ||
        socio.observacion.toLowerCase().includes('carros') ||
        socio.observacion.toLowerCase().includes('colgado')
    );
    
    const carroBadge = tieneCarro ? ' 🚗 CARRO EN BODEGA' : '';
    
    console.log(`${i + 1}. ${socio.nombres}`);
    console.log(`   N° Socio: ${socio.numeroSocio || 'N/A'}`);
    console.log(`   Elemento: ${socio.elemento || 'N/A'}`);
    console.log(`   Ubicación: ${socio.ubicacion}`);
    if (socio.observacion) {
        console.log(`   Observación: ${socio.observacion}`);
    }
    console.log(carroBadge);
    console.log();
});

// Estadísticas
console.log('═'.repeat(80));
console.log('📊 ESTADÍSTICAS');
console.log('═'.repeat(80));
console.log();

const porElemento = {};
const conCarros = data.filter(s => 
    s.observacion && (
        s.observacion.toLowerCase().includes('bodega') ||
        s.observacion.toLowerCase().includes('carros') ||
        s.observacion.toLowerCase().includes('colgado')
    )
);

data.forEach(s => {
    const elem = s.elemento || 'Sin especificar';
    porElemento[elem] = (porElemento[elem] || 0) + 1;
});

console.log('Por tipo de elemento:');
Object.entries(porElemento).sort((a, b) => b[1] - a[1]).forEach(([tipo, count]) => {
    console.log(`   ${tipo}: ${count}`);
});

console.log(`\n🚗 Socios con carros en bodega: ${conCarros.length}`);
console.log(`📦 Socios sin carros: ${data.length - conCarros.length}`);

