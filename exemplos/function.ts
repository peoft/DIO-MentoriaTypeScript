function somarValoresNumericosETratar(input1:number, input2: number, callback: (numero: number) => number):number {
    let resultado = input1 + input2;
    return callback(resultado);
}

function printaValoresNumericos(numero1: number, numero2: number):void {
    console.log(numero1 + numero2);
}

function aoQuadrado(numero: number):number{
    return numero * numero;
}

function dividirPorEleMesmo(numero: number):number {
    return numero / numero;
}

console.log(somarValoresNumericosETratar(5, 3, aoQuadrado));
console.log(somarValoresNumericosETratar(5, 3, dividirPorEleMesmo));