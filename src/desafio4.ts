// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

let apiKey: string = 'bcccfcfb7dc6fc125a72e19d361d31e8';
let requestToken:string;
let username: string;
let password: string;
let sessionId:string;
let listId: string = '7101979';

interface IResults {
    poster_path: string,
    adult: boolean,
    overview: string,
    release_date: Date,
    genre_ids: [
        number
    ],
    id: number,
    original_title: string,
    original_language: string,
    title: string,
    backdrop_path: string,
    popularity: number,
    vote_count: number,
    video: boolean,
    vote_average: number
}

interface IResponseSearch {
    page: number,
    results: [IResults];
};


let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button') as HTMLButtonElement;
let searchContainer = document.getElementById('search-container') as HTMLDivElement;

loginButton?.addEventListener('click', async () => {
    await criarRequestToken();
    await logar();
    await criarSessao();
})

searchButton?.addEventListener('click', async () => {
    let lista = document.getElementById("lista") as HTMLDataListElement;
    if (lista) {
        lista.outerHTML = "";
    }
    let search = document.getElementById('search') as HTMLInputElement;
    if (search != null) {
        let ret:unknown;
        let listaDeFilmes:IResponseSearch;
        let query = search.value;
        await procurarFilme(query).then( (result) => {
            ret = result as IResponseSearch;
        });
        listaDeFilmes = ret as IResponseSearch;

        let ul = document.createElement('ul');
        ul.id = "lista"
        for (const item of listaDeFilmes.results) {
            let li = document.createElement('li');
            li.appendChild(document.createTextNode(item.original_title))
            ul.appendChild(li)
        }
        console.log(listaDeFilmes);
        searchContainer.appendChild(ul);    
    }
})

function preencherSenha() {
    let htmlElement = document.getElementById('senha') as HTMLInputElement;

    if (htmlElement !=  null) {
        password = htmlElement.value;
        validateLoginButton();
    }
}

function preencherLogin() {
    let htmlElement = document.getElementById('login')  as HTMLInputElement;

    if (htmlElement !=  null) {
        username = htmlElement.value;
        validateLoginButton();
    }
}

function preencherApi() {
    let htmlElement = document.getElementById('api-key')  as HTMLInputElement;
    if (htmlElement !=  null) {
        apiKey = htmlElement.value;
        validateLoginButton();    
    }
}

function validateLoginButton() {
    if (password && username && apiKey) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
}

class HttpClient {
    static async get( { url, method, body = null }: { url: string, method:string, body?: any}) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open(method, url, true);

            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    })
                }
            }
            request.onerror = () => {
                reject({
                    status: request.status,
                    statusText: request.statusText
                })
            }

            if (body) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                body = JSON.stringify(body);
            }
            request.send(body);
        })
    }
}

async function procurarFilme(query:string){
    let response = {} ;

    query = encodeURI(query)
    console.log(query)
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
        method: "GET"
    }).then((result) => {
        response = result as IResponseSearch;

    })
    return response;
}

async function adicionarFilme(filmeId:string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
        method: "GET"
    })
    console.log(result);
}

async function criarRequestToken() {
    interface IResponseToken {
        success: boolean,
        expires_at: Date,
        request_token: string
    }
    
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: "GET"    
    }).then ( (result) => {
        let response = result as IResponseToken;        
        requestToken = response.request_token;
    })

}

async function logar() {
    await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        method: "POST",
        body: {
            username: `${username}`,
            password: `${password}`,
            request_token: `${requestToken}`
        }
    })
}

async function criarSessao() {    
    interface IResponseSession {
        success: boolean,
        session_id: string
    }

    await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        method: "GET"
    }).then ( (result) => {
        let response = result as IResponseSession;        
        sessionId = response.session_id;
    })
}

async function criarLista(nomeDaLista:string, descricao:string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            name: nomeDaLista,
            description: descricao,
            language: "pt-br"
        }
    })
    console.log(result);
}

async function adicionarFilmeNaLista(filmeId:BigInteger, listaId:string) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            media_id: filmeId
        }
    })
    console.log(result);
}

async function pegarLista() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
        method: "GET"
    })
    console.log(result);
}

{/* <div style="display: flex;">
  <div style="display: flex; width: 300px; height: 100px; justify-content: space-between; flex-direction: column;">
      <input id="login" placeholder="Login" onchange="preencherLogin(event)">
      <input id="senha" placeholder="Senha" type="password" onchange="preencherSenha(event)">
      <input id="api-key" placeholder="Api Key" onchange="preencherApi()">
      <button id="login-button" disabled>Login</button>
  </div>
  <div id="search-container" style="margin-left: 20px">
      <input id="search" placeholder="Escreva...">
      <button id="search-button">Pesquisar Filme</button>
  </div>
</div>*/}