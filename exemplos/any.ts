let valorAny: any;

valorAny = 3;
valorAny = '';
valorAny = true;

let valorString: string = 'teste';

valorString = valorAny;
let valorString2: string = 'testao';

valorString2 = valorAny;

function somaString(string1:string, string2:string) {
    console.log(string1 + string2);
}

somaString(valorString, valorString2);
somaString('Ola','Como vai');