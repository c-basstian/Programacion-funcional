const XLSX = require('xlsx');
const workbook = XLSX.readFile('productos.xlsx');
const worksheet = workbook.Sheets['Hoja1'];

const data = XLSX.utils.sheet_to_json(worksheet, {header:1});

// Funciones de filtrado de datos
const exMay = (data, valor) => data.filter(row => row[4] > valor);
const exMen = (data, valor) => data.filter(row => row[4] < valor);
const clasification = (data, clas, valor) => data.filter(row => row[2] > valor && row[3] === clas);
const precioMayMen = (data, valor1, valor2) => data.filter(row => row[2] > valor1 && row[2] < valor2);

// Función para agrupar datos
const group = data => {
  const numeroClasificacion = data.reduce((result, row) => {
    const clasificacion = row[3];
    result[clasificacion] = (result[clasificacion] || 0) +1;
    return result;
  }, {});
  return numeroClasificacion;
}

// 1) Número de productos con existencia mayor a 20.
const valor1 = 20;
const resultado1 = exMay(data, valor1);
console.log(`1) Número de productos con existencia mayor a ${valor1}:`);
console.log(resultado1);
console.log(`Número de productos con existencia mayor a ${valor1}: ${resultado1.length}`);

// 2) Número de productos con existencia menos a 15.
const valor2 = 15;
const resultado2 = exMen(data, valor2);
console.log(`2) Número de productos con existencia menor a ${valor2}:`);
console.log(resultado2);
console.log(`Número de productos con existencia menor a ${valor2}: ${resultado2.length}`);

// 3) Lista de productos con la misma clasificación y precio mayor a 15.50
const valor3 = 15.50;
const clas = 'abarrotes';
const resultado3 = clasification(data, clas, valor3);
console.log(`3) Lista de productos con la misma clasificación y precio mayor a ${valor3}:`);
console.log(resultado3);

// 4) Lista de productos con precio mayor a 20.30 y menor a 45.00
const valor4 = 20.30;
const valor5 = 45;
const resultado4 = precioMayMen(data, valor4, valor5);
console.log(`4) Lista de productos con precio mayor a ${valor4} y menor a ${valor5}:`);
console.log(resultado4);

// 5) Número de productos agrupados por su clasificación
const resultado5 = group(data);
console.log(`5) Número de productos agrupados por su clasificación:`);
console.log(resultado5);
