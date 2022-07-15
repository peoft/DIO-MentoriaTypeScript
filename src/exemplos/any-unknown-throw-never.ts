let anyEstaDeVolta: any;

anyEstaDeVolta = 3;
anyEstaDeVolta = 'string';

let stringTest:string = 'verificar';

stringTest = anyEstaDeVolta;

let unknownValor: unknown;

unknownValor = 3;
unknownValor = 'opa';
unknownValor = true;
unknownValor = 'vai sim';

let stringTest2:string = 'agora vai';
// tipo unknown nao pode ser atribuido a uma string.
//stringTest2 = unknownValor;

let numero: number = 3;

if (typeof unknownValor === 'string') {
    stringTest2 = unknownValor;
}

// Retorno que identifica a função que não foi finalizado/executado por completo.
// Pode ser usado em um loop infinito para ficar explícito.
function jogaErro(erro: string, codigo: number):never {
    throw { Error: erro, code: codigo }
}

jogaErro('deu erro', 500);