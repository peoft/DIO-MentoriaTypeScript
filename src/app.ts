let buttonTeste = document.getElementById('button');

// Optional chain - se o buttonTeste existir executa o código
// Ecmascprit 2020 - option "target" no tsconfig.json
buttonTeste?.addEventListener('click', () => {
    console.log("Funcionou")
})
