/*

EL SCRIPT ES LLAMADO AL FINAL DEL HTML:
Una vez invocado, los cambios se perciben a través de addEventListener y así se 
llaman a los procedimientos.

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
se utilizan sin el prefijo "on" ("clic" en lugar de "onclick" o "mousedown" en 
lugar de "onmousedown").
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


///////////////////////////////////////////////////////////// VARIABLES GLOBALES

// FCC
const textArea = document.getElementById('text-input');

const solveBtn = document.getElementById('solve-button');

const clearBtn = document.getElementById('clear-button');


// Mensaje de error (al lado de los botones)
let errorDiv = document.getElementById('error-msg');



// FCC
import { puzzlesAndSolutions } from './puzzle-strings.js';



////////////////////////////////////////////////////////////////////// FUNCIONES

// CHAI: Only the digits 1-9 are accepted as valid input for the puzzle grid
// Este chino trabaja así: el retorno es VERDADERO si se cumple la condición de
// que el número está entre los valores pedidos Y si el texto pasado no está
// vacío (¿para qué comprueba eso...?)
const validSudokuInput = str => {
    const possibleNum = parseInt(str);
    return (possibleNum >= 1 && possibleNum <= 9) && str;
}











function solve() {
    errorDiv.innerText = '';

    let input = textArea.value;
    if (input.length !== 81) {
        errorDiv.innerText = 'Error: Expected puzzle to be 81 characters long.';
        return null;
    } else {
        let startPos = input.match(/\./).index;

        let guesses = [];
        let pos = startPos;
        let counter = 0;

        while (pos >= startPos && pos < 81) {

            //console.log('looking at '+pos);
            if (counter > 10000) break; //for safety

            if (input[pos] == '.') { //needs solving
                let foundGuess = false;

                for (let i = 1; i <= 9; i++) {
                    let id = sudokuInputs[pos].id;
                    //console.log('try '+i)
                    if (!inRow(i, id) && !inCol(i, id) && !inBox(i, id) && !guesses.includes(replaceChar(valorAreaTexto, i, pos))) {
                        //valorAreaTexto[pos] = i; //strings are immutable so doesn't work //&& !guessMatrix[pos].includes(i)
                        valorAreaTexto = replaceChar(valorAreaTexto, i, pos);
                        guesses.push(valorAreaTexto);
                        foundGuess = true;
                        //console.log('found valorAreaTexto at '+pos)
                        break;
                    }
                }

                if (foundGuess) {
                    pos++;
                    //console.log('advanced to '+pos)
                }
                else { //keep backtracking until reach '.'
                    valorAreaTexto = replaceChar(valorAreaTexto, '.', pos); //need to reset valorAreaTexto
                    pos--;
                    //console.log('backtracked to '+pos)
                    while (input[pos] !== '.' && pos > 0) {
                        pos--;
                        //console.log('backtracked in while loop to '+pos)
                    }
                }

            } else {
                pos++;
            }

            counter++;
        }

        //if(valorAreaTexto==puzzlesAndSolutions[4][1]) console.log('valorAreaTexto match solution')
        //else console.log('valorAreaTextos do not match')

        textArea.value = valorAreaTexto;
        ubicarEnRejilla(valorAreaTexto);

        if (valorAreaTexto.includes('.')) errorDiv.innerText = 'No solution found';
    }

}

function replaceChar(s, char, index) {
    if (index < 80) return s.substring(0, index) + char + s.substring(index + 1);
    else return s.substring(0, index) + char;
}

function inRow(val, id) {
    let row = findRow(id[0]);
    let start = (row - 1) * 9;
    for (let i = start; i < start + 9; i++) {
        //console.log(i+": "+valorAreaTexto[i])
        if (valorAreaTexto[i] == val) return true;
    }
    return false;
}

function inCol(val, id) {
    let col = parseInt(id[1]);
    for (let i = col - 1; i < 81; i += 9) {
        //console.log(i+": "+valorAreaTexto[i])
        if (valorAreaTexto[i] == val) return true;
    }
    return false;
}

function inBox(val, id) {
    let row = findRow(id[0]);
    let col = parseInt(id[1]);
    let position = [];

    if (row <= 3 && col <= 3) position = [0, 1, 2, 9, 10, 11, 18, 19, 20];
    else if (row <= 3 && col >= 4 && col <= 6) position = [3, 4, 5, 12, 13, 14, 21, 22, 23];
    else if (row <= 3 && col >= 7) position = [6, 7, 8, 15, 16, 17, 24, 25, 26];
    else if (row >= 4 && row <= 6 && col <= 3) position = [27, 28, 29, 36, 37, 38, 45, 46, 47];
    else if (row >= 4 && row <= 6 && col >= 4 && col <= 6) position = [30, 31, 32, 39, 40, 41, 48, 49, 50];
    else if (row >= 4 && row <= 6 && col >= 7) position = [33, 34, 35, 42, 43, 44, 51, 52, 53];
    else if (row >= 7 && col <= 3) position = [54, 55, 56, 63, 64, 65, 72, 73, 74];
    else if (row >= 7 && col >= 4 && col <= 6) position = [57, 58, 59, 66, 67, 68, 75, 76, 77];
    else position = [60, 61, 62, 69, 70, 71, 78, 79, 80];

    for (let i = 0; i < position.length; i++) {
        //console.log(i+": "+valorAreaTexto[position[i]])
        if (valorAreaTexto[position[i]] == val) return true;
    }
    return false;
}

function findRow(letter) {
    switch (letter) {
        case 'A':
            return 1;
        case 'B':
            return 2;
        case 'C':
            return 3;
        case 'D':
            return 4;
        case 'E':
            return 5;
        case 'F':
            return 6;
        case 'G':
            return 7;
        case 'H':
            return 8;
        case 'I':
            return 9;
        default:
            return 0;
    }
}

function clearInput() {
    errorDiv.innerText = '';
    textArea.value = '';
    for (let i = 0; i < sudokuInputs.length; i++) {
        sudokuInputs[i].value = '';
    }
}


//////////////////////////////////////////////////// FUNCIONES LLAMADAS POR MAIN

// Variable global: Celdas del tablero (variable que contendrá las 81 celdas).
// Es decir, vector formado por la suma de los caracteres de todas las celdas de
// la rejilla (grid).
const sudokuInputs = document.getElementsByClassName('sudoku-input');

let valorAreaTexto;

/**
 * Valida el vector (matriz) ingresado por rejilla. Para ello, utiliza regex.
 * 
 * REGEX
 * 1-9 -> Un caracter simple entre 1 y 9
 * \.  -> Un punto
 * +   -> Cuantificador, entre uno e infinito *(¿PARA QUÉ?)
 * $   -> Verifica la posición al final de la cadena, o antes del terminador de
 *        línea (\ n) justo al final de la cadena *(¿PARA QUÉ?)
 * 
 * La función devuelve VERDADERO cuando: Hay coincidencia entre el texto
 * considerado y hay coincidencia entre el largo del texto de textArea y el 
 * largo del vector de la suma de los caracteres de todas las celdas de la 
 * rejilla (grid).
 * 
 * NOTA: *(¿PARA QUÉ?) la segunda condición?... Me parece que el chino verifica
 *       más de lo necesario.
 * 
 * @param {string} texto 
 */
function validarTexto(texto) {
    let regex = /^[1-9\.]+$/;
    return regex.test(texto) && texto.length == sudokuInputs.length;
}


function ubicarEnRejilla(texto) {
    if (validarTexto(texto)) {
        for (let i = 0; i < sudokuInputs.length; i++) {
            if (texto[i] != '.') sudokuInputs[i].value = texto[i];
        }
    }
}


function setTextArea(char, id) {
    let regex = /[1-9]/;
    let result = "";
    for (let i = 0; i < sudokuInputs.length; i++) {
        if (sudokuInputs[i].id == id) {
            if (regex.test(char)) {
                result += char;
            } else {
                result += '.';
            }
        } else {
            if (regex.test(sudokuInputs[i].value)) {
                result += sudokuInputs[i].value;
            } else {
                result += '.';
            }
        }
    }
    textArea.value = result;
}



/////////////////////////////////////////////////////////////////////////// MAIN

document.addEventListener('DOMContentLoaded', () => {

    // Cargar un juego (precarga constantes)
    textArea.value = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

    // QUEDA POR DEFINIR QUÉ COSA HACE ESTA VARIABLE GLOBAL
    valorAreaTexto = textArea.value;

    
    ubicarEnRejilla(textArea.value);

    textArea.addEventListener('input', e => {
        ubicarEnRejilla(e.target.value);
    })

    Array.from(sudokuInputs).forEach(input => input.addEventListener('input', e => {
        setTextArea(e.data, e.target.id)
    }));

    //console.log(inRow(9,'F5'))
    //console.log(inCol(4,'A4'))
    //console.log(inBox(6,'I8'))
    //console.log(sudokuInputs[2].value)

    solveBtn.addEventListener('click', solve);
    clearBtn.addEventListener('click', clearInput);
});


/////////////////////////////////////////////////////////////////////// TEMPORAL

//to pass tests

const validatePuzzle = str => {
    valorAreaTexto = str;
    //valorAreaTexto = replaceChar(valorAreaTexto, '.', 0);
    ubicarEnRejilla(valorAreaTexto);
    //console.log(sudokuInputs[1].value)
    for (let i = 0; i < valorAreaTexto.length; i++) {
        let val = sudokuInputs[i].value;
        let id = sudokuInputs[i].id;
        valorAreaTexto = replaceChar(valorAreaTexto, '.', i);
        //console.log('val: '+val+', id: '+id);
        if (inRow(val, id) || inCol(val, id) || inBox(val, id)) {
            //if(inRow(val,id)) console.log('repeat value in same row');
            //if(inCol(val,id)) console.log('repeat value in same col');
            //if(inBox(val,id)) console.log('repeat value in same box');
            //console.log('failed at position '+i+' with value of '+val+' and id of '+id);
            return false;
        }
        valorAreaTexto = replaceChar(valorAreaTexto, val, i);
    }
    return true;
}

///////////////////////////////////////////////////////////////////////// SALIDA

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
    module.exports = {
        ubicarEnRejilla,
        setTextArea,
        solve,
        clearInput,
        validarTexto,
        validSudokuInput,
        inRow,
        inCol,
        inBox,
        validatePuzzle
    }
} catch (e) { }
