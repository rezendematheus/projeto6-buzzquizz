let id;
let quizz = {
    title: "",
    image: "",
    questions: [],
    levels: []
}
let question = {
    title: "",
    color: "",
    answers: []
}
let answer = {
    text: "",
    image: "",
    isCorrectAnswer: ""
}
let level = {
    title: "",
    image: "",
    text: "",
    minValue: ""
    }
//Funções úteis
const retornaErro = (erro) => {
    console.log(erro.status)
}
const retornaSucesso = (sucesso) => {
    console.log(sucesso.status)
}

//Tela 1
function getList() {
    axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
        .catch(retornaErro)
        .then(listarQuizz)
}

function listarQuizz(response) {
    quizzList()
    const list = document.querySelector(".todos-quizzes")
    response.data.forEach((element) => {
        list.querySelector(".quizz-container").innerHTML +=
            `<div class="go-quizz" onclick="getQuizz(${element.id})">
            <img src="${element.image}" alt="">
            <p>${element.title}</p>
        </div>`
    });
    let quizzid = localStorage.getItem("ids")
    if(quizzid !== null){
        const list = JSON.parse(quizzid)
        list.forEach((element) => {
            axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${element}`)
            .then((element) => {
                document.querySelector(".quizz-container").innerHTML +=
                    `<div class="go-quizz" onclick="getQuizz(${element.id})">
                        <img src="${element.image}" alt="">
                        <p>${element.title}</p>
                    </div>`
            })
        })
    }
}
function atualizarQuizzes() {
    const demanda = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then((response)=>{
        document.querySelector(".todos-quizzes").querySelector(".quizz-container").innerHTML = ""
        response.data.forEach((element) => {
            document.querySelector(".todos-quizzes").querySelector(".quizz-container").innerHTML +=
                `<div class="go-quizz" onclick="getQuizz(${element.id})">
                <img src="${element.image}" alt="">
                <p>${element.title}</p>
            </div>`
        })
        })
}
function quizzList() {

    let body = document.querySelector("body")

    body.innerHTML +=
        `<div class="tela-1">
        <div class="content-1">
            <div class="criar-quizz">
                <p>Você não criou nenhum quizz ainda :(</p>
                <button onclick="criarQuizz()">Criar Quizz</button>
            </div>
            <div class="seus-quizzes hidden">
                <p>Seus Quizzes <ion-icon onclick="criarQuizz()" name="add-circle"></ion-icon></p>
                <div class = "quizz-container"></div>
            </div>
            <div class="todos-quizzes">
                <p>Todos os Quizzes</p>
                <div class="quizz-container"></div>
            </div>
        </div>
    </div>`

    let mainContent = document.querySelector(".main-content")
    mainContent.classList.add("hidden")

    let header = document.querySelector(".main-header")

    header.innerHTML = `<div class="main-header-container-top">
    <h1>BuzzQuizz</h1>
</div>`
}

function toggleCriar() {
    if (document.querySelector(".quizz-container").innerHTML !== '') {
        document.querySelector(".criar-quizz").classList.add("not-display")
        document.querySelector(".seus-quizzes").classList.remove("not-display")
    }
}

getList()


//INICIO Tela 2 PEDRO


//VARIAVEIS GLOBAIS(PODEM SER ACESSADAS POR MAIS DE UMA FUNCAO)
let questsNumber = 0
let counter = 0
let score = 0
let levels = []
let resetId = 0



function getQuizz(quizzId) { // FUNCAO 1 RECEBE A REQUISICAO DA API

    counter = 0
    score = 0
    levels = []

    let header = document.querySelector(".main-header")

    resetId = quizzId
    const quizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`)

    quizz.then(showQuizz)
    setTimeout(() => header.scrollIntoView({ behavior: 'smooth' }), 500)
}

function showQuizz(quizz) { // FUNCAO 2 RENDERIZA O QUIZZ NA TELA

    levels = quizz.data.levels // atualizando array para funcao3 selectAnswer() renderizar o resultado final do quizz

    questsNumber = quizz.data.questions.length // atualizando numero de perguntas para funcao3 selectAnswer() validar o fim do quizz 

    let mainContent = document.querySelector(".main-content")
    let header = document.querySelector(".main-header")
    let screenOne = document.querySelector(".tela-1")

    screenOne.classList.add("hidden")
    mainContent.classList.remove("hidden")

    mainContent.innerHTML = ""
    header.innerHTML = `<div class="main-header-container-top">
    <h1>BuzzQuizz</h1>
</div> `


    header.innerHTML +=
        //ESTILO EM LINHA PARA RENDERIZAR IMAGEM DINAMICAMENTE
        `<div style = "background-image: linear-gradient(rgba(0, 0, 0, 0.6),
rgba(0, 0, 0, 0.6)), url(${quizz.data.image})" 
class="main-header-container-bottom">


<h1>${quizz.data.title}</h1>
</div>`

    for (i = 0; i < quizz.data.questions.length; i++) {

        // INICIO EMBARALHAR RESPOSTAS
        function comparador() {
            return Math.random() - 0.5;
        }

        let arrayAnswers = quizz.data.questions[i].answers

        arrayAnswers.sort(comparador);
        // FIM EMBARALHAR RESPOSTAS


        mainContent.innerHTML += `<div class="quest-container">
<div class="quest-title">
    <h2>${quizz.data.questions[i].title}</h2>
</div>
<div class="options-container" id = "question${i}">
`
        let questContainer = document.querySelector(`#question${i}`)

        for (j = 0; j < arrayAnswers.length; j++) {

            questContainer.innerHTML += `<div onclick="selectAnswer(this)" class="option ${arrayAnswers[j].isCorrectAnswer}">
            <img src=${arrayAnswers[j].image} alt="option">
            <p>${arrayAnswers[j].text}</p>
        </div>  `
        }
    }
}

function selectAnswer(option) { // FUNCAO 3 SELECIONA A RESPOSTA E VALIDA O FIM DO QUIZZ

    counter++
    if (option.classList.contains("true")) {
        score++
    }

    let answer1 = option.parentNode.children[0]
    let answer2 = option.parentNode.children[1]
    let answer3 = option.parentNode.children[2]
    let answer4 = option.parentNode.children[3]

    let nextQuestion = option.parentNode.parentNode.nextElementSibling // SELECIONANDO A DIV PARA SCROLLAR PAGINA PARA PROXIMA PERGUNTA


    // INICIO LOGICA PARA CLIQUE UNICO POR QUESTAO
    if (answer1.classList.contains("unselected") || answer2.classList.contains("unselected")) {
        return
    }
    if (answer3 && answer3.classList.contains("unselected")) {
        return

    }
    if (answer4 && answer4.classList.contains("unselected")) {
        return
    }
    if (answer3) {
        answer3.classList.add("unselected")
    }
    if (answer4) {
        answer4.classList.add("unselected")
    }

    answer1.classList.add("unselected")
    answer2.classList.add("unselected")
    option.classList.remove("unselected")


    if (answer1.classList.contains("true")) {
        answer1.classList.add("correct")
    }
    if (answer1.classList.contains("false")) {
        answer1.classList.add("wrong")
    }
    if (answer2.classList.contains("true")) {
        answer2.classList.add("correct")
    }
    if (answer2.classList.contains("false")) {
        answer2.classList.add("wrong")
    }
    if (answer3 && answer3.classList.contains("true")) {
        answer3.classList.add("correct")
    }
    if (answer3 && answer3.classList.contains("false")) {
        answer3.classList.add("wrong")
    }
    if (answer4 && answer4.classList.contains("true")) {
        answer4.classList.add("correct")
    }
    if (answer4 && answer4.classList.contains("false")) {
        answer4.classList.add("wrong")
    }
    // FIM LOGICA PARA CLIQUE UNICO POR QUESTAO

    if (nextQuestion) { // LOGICA PARA AVANCAR PARA A PROXIMA QUESTAO
        setTimeout(() => nextQuestion.scrollIntoView({ behavior: 'smooth' }), 2000)
    }

    // INICIO LOGICA PARA MOSTRAR RESULTADO FINAL DO QUIZZ
    if (counter == questsNumber) {

        let quizzResult = document.createElement("div")
        quizzResult.classList.add("quizz-result")

        let mainContent = document.querySelector(".main-content")
        mainContent.appendChild(quizzResult)

        let resultado = 0



        for (i = 0; i < levels.length; i++) {

            if (levels.length < 3 && score >= 2) {
                resultado = (score / questsNumber * 100).toFixed(0)
                score = 1
            }

            if (score > 2) {
                resultado = (score / questsNumber * 100).toFixed(0)
                score = 2
            }

            if (score == i) {
                if (resultado === 0) {
                    resultado = (score / questsNumber * 100).toFixed(0)
                }
                quizzResult.innerHTML = `<div class="quizz-results-header">
            <p>${resultado}% de acerto: ${levels[i].title}</p>
        </div>
        <div class="quizz-results-content">
            <img src="${levels[i].image}"> 
            <p>${levels[i].text}</p>
        </div>
   
    <button onclick="getQuizz(${resetId})"class = "reset-button">Reiniciar Quizz</button>
    <button onclick="fecharQuizz()" class = "back-button">Voltar para home</button>
     `
            }

            setTimeout(() => quizzResult.scrollIntoView({ behavior: 'smooth' }), 2000)
        }
    }
    // FIM LOGICA PARA MOSTRAR RESULTADO FINAL DO QUIZZ
}
function fecharQuizz(){
    let header = document.querySelector(".main-header-container-top").nextElementSibling
    let content = document.querySelector(".main-content")
    header.remove()
    atualizarQuizzes()
    content.innerHTML =""
    content.classList.toggle("hidden")
    document.querySelector(".tela-1").classList.toggle("hidden")
}
// FINAL TELA 2 PEDRO


//Tela 3
function criarQuizz(){
    let main = document.querySelector('.main-content');
    main.classList.remove('hidden');
    exibirCriarQuizzEtapa1();
}

function exibirCriarQuizzEtapa1() {
    console.log('exibirCriarQuizzEtapa1');
    let tela1 = document.querySelector('.tela-1');
    tela1.classList.add('hidden');
    let main = document.querySelector('.main-content');
    main.innerHTML = `
    <div id="comeco-quizz" class="tela-3">
        <h2 class="titulo-form">Comece pelo começo</h2>
        <div class="formulario comeco">
            <input class ="input-titulo" placeholder="Título do seu quizz" type="text" maxlength="65">
            <input class ="input-url" placeholder="URL da imagem do seu quizz" type="url">
            <input class ="input-qtd-perguntas" placeholder="Quantidade de perguntas do quizz" type="number">
            <input class ="input-qtd-niveis" placeholder="Quantidade de níveis do quizz" type="number">
        </div>
        <div onclick="validarValoresInputEtapa1()" class="botao-t3">Prosseguir para criar perguntas</div>
    </div>`;
}

let valoresInputEtapa1 = {
    titulo: '',
    url: '',
    quantidadePerguntas: '',
    quantidadeNiveis: ''
}

function validarValoresInputEtapa1(){
    valoresInputEtapa1.titulo = document.querySelector('.input-titulo').value;
    valoresInputEtapa1.url = document.querySelector('.input-url').value;
    valoresInputEtapa1.quantidadePerguntas = document.querySelector('.input-qtd-perguntas').value;
    valoresInputEtapa1.quantidadeNiveis = document.querySelector('.input-qtd-niveis').value;

    // (valoresInputEtapa1.titulo.length >= 20) ? '' : alert('Digite um título com no mínimo 20 caracteres');
    if(valoresInputEtapa1.titulo.length < 20){
        alert('Digite um título com no mínimo 20 caracteres');
    }    
    (valoresInputEtapa1.quantidadePerguntas >= 3) ? '' : alert('Digite uma quantidade de perguntas válida (>3)');
    (valoresInputEtapa1.quantidadeNiveis >= 2) ? '' : alert('Digite uma quantidade de níveis válida (>2)');
    if((valoresInputEtapa1.quantidadeNiveis >= 2) && (valoresInputEtapa1.quantidadePerguntas >= 3) && (valoresInputEtapa1.titulo.length >= 20)){
        registrarComeco();
        exibirCriarPerguntasQuizz();
        console.log(valoresInputEtapa1);
    }
}

function exibirCriarPerguntasQuizz() {
    let comecoQuizz = document.getElementById('comeco-quizz');
    comecoQuizz.classList.add('hidden');
    let main = document.querySelector(".main-content");
    main.innerHTML += `
    <div id="perguntas" class="tela-3">
        <h2 class="titulo-form">Crie suas perguntas</h2>
    </div>
    `;
    let listaPerguntas = document.getElementById('perguntas');
    for(i = 1; i <= valoresInputEtapa1.quantidadePerguntas; i++){
        let primeiraPerguntaAberta;
        (i === 1) ? primeiraPerguntaAberta = '' : primeiraPerguntaAberta = 'hidden';
        listaPerguntas.innerHTML += `
        <div onclick="" class="formulario perguntas">
            <div onclick="ocultarConteudo2(this)" class="header-form ">
                <h3>Pergunta ${i}</h3>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            <div class="campos ${primeiraPerguntaAberta} pergunta${i}">
                <input class = "texto-pergunta" placeholder="Título da pergunta" type="text">
                <input class = "cor-pergunta" placeholder="Cor de fundo da pergunta" type="hexadecimalx ">
                <h4>Resposta Correta</h4>
                <input class = "resposta correta" placeholder="Resposta correta" type="text">
                <input class = "url-correta" placeholder="URL da resposta correta" type="url">
                <!-- <input class = "resposta correta" placeholder="Resposta correta" type="text">
                <input class = "url" placeholder="Descrição do nível" type="text"> -->
                <h4>Respostas incorretas</h4>
                <input class = "resposta " placeholder="Resposta incorreta 1" type="text">
                <input class = "url" placeholder="URL da imagem 1" type="text">

                <input class = "resposta " placeholder="Resposta incorreta 2" type="text">
                <input class = "url" placeholder="URL da imagem 2" type="text">

                <input class = "resposta " placeholder="Resposta incorreta 3" type="text">
                <input class = "url" placeholder="URL da imagem 3" type="text">
            </div>
        </div>
        <div class="espaco-perguntas"></div>
        `;
    }
    listaPerguntas.innerHTML += `<div onclick="validarInputsPerguntas()" class="botao-t3">Prosseguir para criar níveis</div>`;
}

function validarInputsPerguntas(){
    let i = 0;
    document.querySelectorAll("perguntas").forEach((element) => {
        if((element.querySelector('.texto-pergunta').value) && (element.querySelector('.texto-pergunta').value.length >= 20)) {
            alert('Preencha os dados corretamente')
        }
        element.querySelector('.texto-pergunta').querySelectorAll("campos").forEach((element => {
            if(((element.querySelector('.correta').value != '') &&
            (element.querySelector('.url').value != '') &&
            (element.querySelector('.resposta').value != '') &&
            (element.querySelector('.url').value != '') || i < 2)){
                alert('Preencha os dados corretamente')
            }
            i++;
        }))
    })
    
    // if((document.querySelector('.texto-pergunta').value) &&
        registrarPerguntas();
    //     exibirCriarNiveisQuizz();
    // }else alert('Preencha os dados corretamente');

}

function exibirCriarNiveisQuizz() {
    let perguntasQuizz = document.getElementById('perguntas');
    perguntasQuizz.classList.add('hidden');
    let main = document.querySelector(".main-content");
    main.innerHTML += `
    <div id="niveis-quizz" class="tela-3">
        <h2 class="titulo-form">Agora, decida os níveis</h2>
    </div>`;
    for(i = 1; i <= quantidadeNiveis; i++){
        main.innerHTML += `
        <div onclick="" class="formulario nivel">
            <div class="header-form">
                <h3>Nível ${i}</h3>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            <div id="nivel${i}" class="campos nivel">
                <input class = "nivel_titulo" placeholder="Título do nível" type="text">
                <input class = "nivel_acerto" placeholder="% de acerto minimo" type="number">
                <input class = "nivel_img" placeholder="URL da imagem do nível" type="url">
                <input class = "nivel_desc" placeholder="Descrição do nível" type="text">
            </div>
        </div>`;
    }
    main.innerHTML += `<div onclick="finalizarQuizz()" class="botao-t3">Finalizar Quizz</div>`;
}

function validarInputsNiveis(){
    let nivelTitulo;
    let nivelAcerto;
    let nivelImagem;
    let nivelDescricao;
    for(i = 1; i <= quantidadeNiveis; i++){
        nivelTitulo = document.getElementById(`nivel${i}`).firstChild;
        nivelAcerto = nivelTitulo.nextSibling;
        nivelImagem = nivelAcerto.nextSibling;
        nivelDescricao = nivelImagem.nextSibling;
        if (nivelTitulo.value == '' || nivelTitulo.value.length < 10 || nivelAcerto.value == ''|| nivelAcerto.value < 0 || nivelAcerto.value > 100 || nivelImagem.value == '' || nivelDescricao.value == '' || nivelDescricao.value.length < 30){
            alert('preencha os campos corretamente');
        }
    }

}

function finalizarQuizz() {
    registrarNiveis()
    let niveisQuizz = document.getElementById("niveis-quizz");
    niveisQuizz.classList.add('hidden');
    let main = document.querySelector(".main-content");
    main.innerHTML += 'quizz criado com sucesso';
}

function ocultarConteudo(element) {
    element.parentNode.classList.add("toggleable")
    let jaTem = document.querySelector(".n-oculto")
    if (jaTem !== null) {
        jaTem.classList.add("oculto")
        jaTem.classList.remove("n-oculto")
    }
    element.parentNode.classList.remove("oculto")
    element.parentNode.classList.add("n-oculto")
}
function ocultarConteudo2(element){
    element.parentNode.querySelector('.campos').classList.toggle('hidden');
    console.log('aaa');
}
function registrarPerguntas (){
    const perguntas = document.querySelectorAll(".perguntas");
    perguntas.forEach((element) => {
        question.title = element.querySelector(".texto-pergunta").value //coloca o title da questão
        question.color = element.querySelector(".cor-pergunta").value   // coloca a cor da questão
        element.document.querySelector(".resposta").forEach((element) => { // função para adicionar as respostas da questão na questão
            answer.text = element.querySelector(".resposta") //texto da resposta
            answer.image = element.querySelector(".url").value //imagem da resposta
            if(element.classList.contains("correta")){ //se é a correta isCorrectAnswer = true e false caso contrario
                answer.isCorrectAnswer = true
            }
            else{
                answer.isCorrectAnswer = false 
            }
            perguntas.answers += answer //coloca a resposta na lista de respostas
            let answer = {
                text: "",
                image: "",
                isCorrectAnswer: ""
            }
        })
        quizz.questions += question //coloca a questão na lista de questões
    })
}
function registrarNiveis (){
    const niveis = document.querySelectorAll(".campos");
    niveis.forEach((element) => { //adicionar os niveis
        
        level.title = element.querySelector(".nivel_titulo")    //atribui valor no objeto level 
        level.image = element.querySelector(".nivel_img") //atribui valor no objeto level
        level.text = element.querySelector (".nivel_desc") //atribui valor no objeto level
        level.minValue = Number(element.querySelector(".nivel_acerto")) //atribui valor no objeto level
        quizz.levels += level // adiciona o level nos levels do quizz
    })
}
function registrarComeco(){
    const comeco = document.querySelector(".comeco");
    quizz.title = comeco.querySelector(".input-titulo").value //quizz titulo
    quizz.image = comeco.querySelector(".input-url").value //quizz img
}
function enviarQuizz() {
    axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizz)
    .then((response) => {
        id = response.data.id
        let lista = JSON.parse(localStorage.getItem("ids"))
        if(lista !== null && lista !== undefined){
            lista += id
            
        }
        else{
            localStorage.getItem("ids", JSON.stringify([id]))
        }
        let question = {
            title: "",
            color: "",
            answers: []
        }
   })
    .catch(retornaErro)
}

