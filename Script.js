let nombres = [];
let valores = [];

function registrarMovimiento() {
  const nombre = prompt('Nombre del movimiento:');

  if (nombres.includes(nombre)) {
    alert('Error: Ya existe un movimiento con este nombre. Intenta con otro.');
    return;
  }

  const tipo = prompt('Tipo (ingreso / gasto):');
  const monto = parseFloat(prompt('Monto:'));

  if (!nombre || (tipo !== 'ingreso' && tipo !== 'gasto') || isNaN(monto) || monto <= 0) {
    alert('Datos inválidos. Intenta de nuevo.');
    return;
  }

  let valor;
  if (tipo === 'ingreso') {
    valor = monto;
  } else {
    valor = -monto;
  }

  nombres.push(nombre);
  valores.push(valor);
}

function calcularSaldo() {
  let saldo = 0;
  for (let i = 0; i < valores.length; i++) {
    saldo = saldo + valores[i];
  }
  return saldo;
}

function mostrarResumen() {
  console.log('--- Resumen Final ---');
  console.log('Total de movimientos:', nombres.length);
  console.log('Saldo total: S/ ' + calcularSaldo().toFixed(2));

  let totalIngresos = 0;
  let totalGastos = 0;
  let ingresoMasAlto = 0;
  let gastoMasBajo = 0;

  for (let i = 0; i < valores.length; i++) {
    if (valores[i] > 0) {
      totalIngresos += valores[i];
      if (valores[i] > ingresoMasAlto) {
        ingresoMasAlto = valores[i];
      }
    } else {
      totalGastos += valores[i];
      if (valores[i] < gastoMasBajo) {
        gastoMasBajo = valores[i];
      }
    }
  }

  console.log('Total de ingresos: S/ ' + totalIngresos.toFixed(2));
  console.log('Total de gastos: S/ ' + Math.abs(totalGastos).toFixed(2));

  if (ingresoMasAlto > 0) {
    console.log('Ingreso más alto: S/ ' + ingresoMasAlto.toFixed(2));
  }
  if (gastoMasBajo < 0) {
    console.log('Gasto más alto (peor gasto): S/ ' + Math.abs(gastoMasBajo).toFixed(2));
  }
}

let continuar = 'si';

while (continuar.toLowerCase() === 'si' || continuar.toLowerCase() === 'sí') {
  registrarMovimiento();
  continuar = prompt('¿Registrar otro movimiento? (si/no):');
}

mostrarResumen();