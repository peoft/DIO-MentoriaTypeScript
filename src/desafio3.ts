let botaoAtualizar = document.getElementById('atualizar-saldo') as HTMLButtonElement;
let botaoLimpar = document.getElementById('limpar-saldo') as HTMLButtonElement;
let soma = document.getElementById('soma') as HTMLInputElement;
let campoSaldo = document.getElementById('campo-saldo') as HTMLSpanElement;

if (campoSaldo != null) {
    campoSaldo.innerHTML = '';
}

function somarAoSaldo(soma: number):void {
    if (campoSaldo != null && soma != null) {
        campoSaldo.innerHTML = String(Number(campoSaldo.innerHTML) +  soma);
    }
}

function limparSaldo():void {
    if (campoSaldo != null) {
        campoSaldo.innerHTML = '';
    }
}

botaoAtualizar?.addEventListener('click', function () {
    if (soma != null){
        somarAoSaldo(Number(soma.value));
    }    
});

botaoLimpar?.addEventListener('click', function () {
    limparSaldo();
});

/**
    <h4>Valor a ser adicionado: <input id="soma"> </h4>
    <button id="atualizar-saldo">Atualizar saldo</button>
    <button id="limpar-saldo">Limpar seu saldo</button>
    <h1>"Seu saldo é: " <span id="campo-saldo"></span></h1>
 */