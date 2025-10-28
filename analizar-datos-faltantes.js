// Script para analizar información faltante
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/members.json', 'utf8'));

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║     PWCC - ANÁLISIS DE INFORMACIÓN FALTANTE                  ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

const sinNumero = data.filter(m => !m.numeroSocio || m.numeroSocio === '');
const sinElemento = data.filter(m => !m.elemento || m.elemento === '');
const sinUbicacion = data.filter(m => !m.ubicacion || m.ubicacion === '');

console.log('📊 ESTADÍSTICAS:\n');
console.log(`Total de socios: ${data.length}`);
console.log(`Socios SIN número de socio: ${sinNumero.length}`);
console.log(`Socios SIN elemento: ${sinElemento.length}`);
console.log(`Socios SIN ubicación: ${sinUbicacion.length}\n`);

console.log('═'.repeat(80));
console.log('业界 SOCIOS SIN NÚMERO DE SOCIO\n');
console.log('═'.repeat(80));

if (sinNumero.length > 0) {
    console.log(`Total: ${sinNumero.length}\n`);
    sinNumero.slice(0, 10).forEach((m, i) => {
        console.log(`${i + 1}. ${m.nombres}`);
        console.log(`   Elemento: ${m.elemento || 'N/A'}`);
        console.log(`   Ubicación: ${m.ubicacion || 'N/A'}`);
        console.log();
    });
    if (sinNumero.length > 10) {
        console.log(`   ... y ${sinNumero.length - 10} más\n`);
    }
}

console.log('═'.repeat(80));
console.log('📦 SOCIOS SIN ELEMENTO\n');
console.log('═'.repeat(80));

if (sinElemento.length > 0) {
    console.log(`Total: ${sinElemento.length}\n`);
    sinElemento.slice(0, 10).forEach((m, i) => {
        console.log(`${i + 1}. ${m.nombres}`);
        console.log(`   N° Socio: ${m.numeroSocio || 'N/A'}`);
        console.log(`   Ubicación: ${m.ubicacion || 'N/A'}`);
        console.log();
    });
    if (sinElemento.length > 10) {
        console.log(`   ... y ${sinElemento.length - 10} más\n`);
    }
}

console.log('═'.repeat(80));
console.log('📍 SOCIOS SIN UBICACIÓN\n');
console.log('═'.repeat(80));

if (sinUbicacion.length > 0) {
    console.log(`Total: ${sinUbicacion.length}\n`);
    sinUbicacion.slice(0, 10).forEach((m, i) => {
        console.log(`${i + 1}. ${m.nombres}`);
        console.log(`   N° Socio: ${m.numeroSocio || 'N/A'}`);
        console.log(`   Elemento: ${m.elemento || 'N/A'}`);
        console.log();
    });
    if (sinUbicacion.length > 10) {
        console.log(`   ... y ${sinUbicacion.length - 10} más\n`);
    }
}

// Detalles completos
console.log('\n═'.repeat(80));
console.log('📋 RESUMEN DETALLADO POR TIPO\n');
console.log('═'.repeat(80));

const completos = data.filter(m => m.numeroSocio && m.elemento && m.ubicacion);
const incompletos = data.filter(m => !m.numeroSocio || !m.elemento || !m.ubicacion);

console.log(`✅ Socios con información completa: ${completos.length}`);
console.log(`❌ Socios con información incompleta: ${incompletos.length}`);
console.log(`📊 Porcentaje completo: ${((completos.length / data.length) * 100).toFixed(1)}%\n`);

