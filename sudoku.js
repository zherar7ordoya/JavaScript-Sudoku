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

const tablero = [
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

buscarCombinatoria(tablero);
console.log(tablero);
