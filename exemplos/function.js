"use strict";
function somarValoresNumericosETratar(input1, input2, callback) {
    let resultado = input1 + input2;
    return callback(resultado);
}
function printaValoresNumericos(numero1, numero2) {
    console.log(numero1 + numero2);
}
function aoQuadrado(numero) {
    return numero * numero;
}
function dividirPorEleMesmo(numero) {
    return numero / numero;
}
console.log(somarValoresNumericosETratar(5, 3, aoQuadrado));
console.log(somarValoresNumericosETratar(5, 3, dividirPorEleMesmo));
