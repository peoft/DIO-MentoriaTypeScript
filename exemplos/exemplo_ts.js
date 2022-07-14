"use strict";
let button = document.getElementById('button');
let input1 = document.getElementById('input1');
let input2 = document.getElementById('input2');
function somaNumeros(numero1, numero2, devPrintar, frase) {
    let resultado = numero1 + numero2;
    if (devPrintar) {
        console.log(frase + resultado);
    }
    return resultado;
}
let devPrintar = true;
// Typescript pode inferir o tipo ou 
// Pode ser definido explicitamente.
let frase;
frase = "O valor é: ";
if (button) {
    button.addEventListener('click', () => {
        if (input1 && input2) {
            somaNumeros(Number(input1.value), Number(input2.value), devPrintar, frase);
        }
    });
}
