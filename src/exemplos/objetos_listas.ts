// objeto
const pessoa = {
    nome: 'Mariana',
    idade: 28,
    profissaoTeste: 'desenvolvedora'
}

const andre : {nome: string, idade: number, profissaoTeste: string} = {
    nome: 'Andre',
    idade: 25,
    profissaoTeste: 'pintor'
}

const paula : {nome: string, idade: number, profissaoTeste: string} = {
    nome: 'Paula',
    idade: 25,
    profissaoTeste: 'Desenvolvedora'
}

enum ProfissaoTeste {
    ProfessoraTeste,
    AtrizTeste,
    DesenvolvedoraTeste,
    JogadoraDeFutebolTeste
}

interface IPessoaTeste {
    nome: string, 
    idade: number,
    // profissão não é obrigatória
    profissaoTeste?: ProfissaoTeste
}

interface IEstudante  extends IPessoaTeste {
    materias: string[]    
}

const vanessa: IPessoaTeste = {
    nome: 'Vanessa',
    idade: 23,
    profissaoTeste: ProfissaoTeste.DesenvolvedoraTeste
}

const jessica: IEstudante = {
    nome: 'Jessica',
    idade: 28,
    profissaoTeste: ProfissaoTeste.DesenvolvedoraTeste,
    materias: ['Matematica discreta', 'Programação']
}

const monica: IEstudante = {
    nome: 'Monica',
    idade: 28,
    materias: ['Matematica discreta', 'Programação']
}

function listar(lista: string []) {
    for (const item of lista) {
        console.log('- ', item);
    }
}

listar(monica.materias);