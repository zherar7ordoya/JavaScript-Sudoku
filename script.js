/* 

EL SCRIPT ES LLAMADO AL FINAL DEL HTML:
Una vez invocado, percibe a través de addEventListener
los cambios y así llama a los procedimientos.

MECANISMO:
addEventListener () es una función incorporada de JavaScript que toma como 
primer argumento el evento a escuchar y un segundo argumento (una función) que 
será llamado llamado cada vez que se active el evento descrito (1er argumento). 
Se puede agregar cualquier número de controladores de eventos a un solo elemento
sin sobrescribir los controladores de eventos existentes.

SINTAXIS:
element.addEventListener (event, listener);

PARÁMETROS:
-) EVENT: el evento puede ser cualquier evento válido de JavaScript. Los eventos
   se utilizan sin el prefijo "on" ("clic" en lugar de "onclick" o "mousedown" 
   en lugar de "onmousedown").
-) LISTENER:  función de controlador, una función de JavaScript que responda al 
   evento que ocurre.

EJEMPLO:
<body> 
  <button id="try">Click here</button> 
  <h1 id="text"></h1> 
  <script> 
    document.getElementById("try").addEventListener("click", function(){ 
      document.getElementById("text").innerText = "GeeksforGeeks"; 
    }); 
  </script> 
</body>

*/

/*
const _board = [
    ['.', '9', '.', '.', '4', '2', '1', '3', '6'],
    ['.', '.', '.', '9', '6', '.', '4', '8', '5'],
    ['.', '.', '.', '5', '8', '1', '.', '.', '.'],
    ['.', '.', '4', '.', '.', '.', '.', '.', '.'],
    ['5', '1', '7', '2', '.', '.', '9', '.', '.'],
    ['6', '.', '2', '.', '.', '.', '3', '7', '.'],
    ['1', '.', '.', '8', '.', '4', '.', '2', '.'],
    ['7', '.', '6', '.', '.', '.', '8', '1', '.'],
    ['3', '.', '.', '.', '9', '.', '.', '.', '.'],
];
sodokoSolver(_board);
console.log(_board);
*/


////////////////////////////////////////////////////////////////////////////////

var valoresTextarea = document.getElementById('text-input');
var botonSoluciona = document.getElementById('solve-button');
var botonLimpia = document.getElementById('clear-button');
var celdasArray = document.getElementsByClassName('sudoku-input');
var celdas = document.getElementsByClassName('sudoku-input').innerHTML;

// import { puzzlesAndSolutions } from './puzzle-strings.js';


//////////////////////////////////////////////////////////////////////////PROLOG

/**
 * FUNCIÓN "NORMAL" QUE ACOMPAÑA AL BACKTRACKING.
 * 
 * @param {*} tablero 
 * @param {*} fila 
 * @param {*} columna 
 * @param {*} candidato 
 */

function validar(tablero, fila, columna, candidato) {
    for (let i = 0; i < 9; i++) {
        const filaCuadrante = 3 * Math.floor(fila / 3) + Math.floor(i / 3);
        const columnaCuadrante = 3 * Math.floor(columna / 3) + i % 3;
        if (   tablero[fila][i]    == candidato
            || tablero[i][columna] == candidato 
            || tablero[filaCuadrante][columnaCuadrante]       == candidato) 
            return false;
    }
    return true;
}

/**
 * VUELTA ATRÁS (BACKTRACKING)
 * 
 * Backtracking (Vuelta Atrás) es una técnica que va creando todas las posibles 
 * combinaciones de elementos para obtener una solución. Esencialmente, la idea 
 * es encontrar la mejor combinación posible en un momento determinado, por
 * eso, se dice que este tipo de algoritmo es una búsqueda en profundidad.
 * Durante la búsqueda, si se encuentra una alternativa incorrecta, la búsqueda
 * retrocede hasta el paso anterior y toma la siguiente alternativa.
 * El backtracking se usa en la implementación de lenguajes como el Prolog.
 * 
 * @param {string[]} datos Array 2D
 */
function buscarCombinatoria(tablero) {
    for (let fila = 0; fila < 9; fila++) {
        for (let columna = 0; columna < 9; columna++) {

            if (tablero[fila][columna] == '.') {

                for (let candidato = 1; candidato <= 9; candidato++) {

                    if (validar(tablero, fila, columna, candidato)) {
                        tablero[fila][columna] = `${candidato}`;

                        if (buscarCombinatoria(tablero)) {
                            return true;
                        } else {
                            tablero[fila][columna] = '.';
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////

function actualizarArray() {
    celdasArray = valoresTextarea.value.split('');
}

function actualizarTextarea() {
    valoresTextarea.value = celdasArray.toString();
}

function solucionar() {

    // Convertir vector 1D en 2D.
    const vector2D = [];
    while (celdasArray.length) vector2D.push(celdasArray.splice(0, 9));

    // Llamar al solucionador con parámetro vector 2D.
    buscarCombinatoria(vector2D);
    celdasArray = [...vector2D];

    // Actualizar.
    actualizarTextarea();
}

const limpiar = () => {
    return valoresTextarea.value = '';
}

////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {

    // INICIALIZADORES
    valoresTextarea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

    // LISTENERS
    Array.from(celdasArray).forEach(celda =>
        celda.addEventListener('input', e => {
            actualizarTextarea;
        })
    );
    valoresTextarea.addEventListener('input', actualizarArray);
    botonSoluciona.addEventListener('click', solucionar);
    botonLimpia.addEventListener('click', limpiar);

    // INICIALIZADORES
    actualizarArray();
});

////////////////////////////////////////////////////////////////////////////////

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
    module.exports = {

    }
} catch (e) { }


/////////////////////////////////////////////////////////////////////// TEMPORAL

/*
var extratitles = document.getElementsByClassName('sudoku-input');
var str = '';

for (var i = 0; i < extratitles.length; i++) {
    str = str + '|' + extratitles.item(i).value;
} 

console.log(str);
*/