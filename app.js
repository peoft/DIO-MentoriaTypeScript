"use strict";
let anyEstaDeVolta;
anyEstaDeVolta = 3;
anyEstaDeVolta = 'string';
let stringTest = 'verificar';
stringTest = anyEstaDeVolta;
let unknownValor;
unknownValor = 3;
unknownValor = 'opa';
unknownValor = true;
unknownValor = 'vai sim';
let stringTest2 = 'agora vai';
// tipo unknown nao pode ser atribuido a uma string.
//stringTest2 = unknownValor;
let numero = 3;
if (typeof unknownValor === 'string') {
    stringTest2 = unknownValor;
}
