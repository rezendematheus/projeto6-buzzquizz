
//Funções úteis
const retornaErro = (erro) => {
    console.log(erro)
}
const retornaSucesso = (sucesso) => {
    console.log(sucesso)
}

//Tela 1


function listarQuizz(response) {
  
    quizzList()
    const list = document.querySelector(".todos-quizzes")
    console.log(response.data)
    response.data.forEach(element => {
        list.querySelector(".quizz-container").innerHTML +=
            `<div class="go-quizz" onclick="getQuizz(${element.id})">
            <img src="${element.image}" alt="">
            <p>${element.title}</p>
        </div>`
    });
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
</div> `
}

function getList() {

    axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
        .catch(retornaErro)
        .then(listarQuizz)
}

function toggleCriar(){
    if(document.querySelector(".quizz-container").innerHTML ==! ''){
       document.querySelector(".criar-quizz").classList.add("not-display")
       document.querySelector(".seus-quizzes").classList.remove("not-display") 
    }
}
//getList()


//Tela 2 

let questsNumber = 0
let counter = 0
let score = 0
let levels = []
let resetId = 0



function getQuizz(quizzId) {

    counter = 0
    score = 0

    let header = document.querySelector(".main-header")

    resetId = quizzId
    const quizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`)

    quizz.then(showQuizz)
    setTimeout(() => header.scrollIntoView({ behavior: 'smooth' }), 500)
}

function showQuizz(quizz) {

    levels = quizz.data.levels

    let mainContent = document.querySelector(".main-content")
    questsNumber = quizz.data.questions.length

    let header = document.querySelector(".main-header")

    let screenOne = document.querySelector(".tela-1")

    screenOne.classList.add("hidden")
    mainContent.classList.remove("hidden")

    mainContent.innerHTML = ""
    header.innerHTML = `<div class="main-header-container-top">
    <h1>BuzzQuizz</h1>
</div> `
    header.innerHTML += `<div style = "background-image: linear-gradient(rgba(0, 0, 0, 0.6),
rgba(0, 0, 0, 0.6)), url(${quizz.data.image})" class="main-header-container-bottom">
<h1>${quizz.data.title}</h1>
</div>
`
    console.log(quizz)
    for (i = 0; i < quizz.data.questions.length; i++) {


        function comparador() {
            return Math.random() - 0.5;
        }

        let arrayAnswers = quizz.data.questions[i].answers

        arrayAnswers.sort(comparador);

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

function selectAnswer(option) {
    counter++
    if (option.classList.contains("true")) {
        score++
    }

    console.log(score, counter)
    let answer1 = option.parentNode.children[0]
    let answer2 = option.parentNode.children[1]
    let answer3 = option.parentNode.children[2]
    let answer4 = option.parentNode.children[3]

    let nextQuestion = option.parentNode.parentNode.nextElementSibling



    if (answer1.classList.contains("unselected") || answer2.classList.contains("unselected")) {
        return
    }
    if (answer3 !== undefined) {
        if (answer3.classList.contains("unselected")) {
            return
        }
    }
    if (answer4 !== undefined) {
        if (answer4.classList.contains("unselected")) {
            return
        }
    }
    if (answer3 !== undefined) {
        answer3.classList.add("unselected")
    }
    if (answer4 !== undefined) {
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
    if (answer3.classList.contains("true")) {
        answer3.classList.add("correct")
    }
    if (answer3.classList.contains("false")) {
        answer3.classList.add("wrong")
    }
    if (answer4.classList.contains("true")) {
        answer4.classList.add("correct")
    }
    if (answer4 && answer4.classList.contains("false")) {
        answer4.classList.add("wrong")
    }
    setTimeout(() => nextQuestion.scrollIntoView({ behavior: 'smooth' }), 2000)

    if (counter == questsNumber) {

        let quizzResult = document.createElement("div")
        quizzResult.classList.add("quizz-result")

        let mainContent = document.querySelector(".main-content")
        mainContent.appendChild(quizzResult)

        let resultado = 0

        console.log(mainContent, quizzResult)

        if (score > 2) {
            resultado = (score / questsNumber * 100).toFixed(0)
            score = 2
        }

        for (i = 0; i < levels.length; i++) {
            if (score == i) {
                resultado = (score / questsNumber * 100).toFixed(0)
                quizzResult.innerHTML = `<div class="quizz-results-header">
            <p>${resultado}% de acerto: ${levels[i].title}</p>
        </div>
        <div class="quizz-results-content">
            <img src="${levels[i].image}"> 
            <p>${levels[i].text}</p>
        </div>
   
    <button onclick="getQuizz(${resetId})"class = "reset-button">Reiniciar Quizz</button>
    <button onclick="getList()" class = "back-button">Voltar para home</button>
    
        `
            }

            setTimeout(() => quizzResult.scrollIntoView({ behavior: 'smooth' }), 2000)
        }
    }
}

//Tela 3

function exibirCriarQuizzEtapa1(){
    let main = document.querySelector('.main-content');
    main.innerHTML = `
    <div class="tela-3">
        <h2 class="titulo-form">Comece pelo começo</h2>
        <div class="formulario comeco">
            <input class ="input-titulo" placeholder="Título do seu quizz" type="text">
            <input class ="input-url" placeholder="URL da imagem do seu quizz" type="text">
            <input class ="input-qtd-perguntas" placeholder="Quantidade de perguntas do quizz" type="text">
            <input class ="input-qtd-niveis" placeholder="Quantidade de níveis do quizz" type="text">
        </div>
        <div onclick="exibirCriarPerguntasQuizz()" class="botao-t3">Prosseguir para criar perguntas</div>
    </div>`;
    console.log(document.querySelector('body'));
}

function exibirCriarPerguntasQuizz(){
    let main = document.querySelector(".main-content");
    main.innerHTML = `
    <div class="tela-3">
        <h2 class="titulo-form">Crie suas perguntas</h2>
        <div onclick="" class="formulario perguntas oculto">
            <div onclick="ocultarConteudo(this)" class="header-form ">
                <h3>Pergunta 1</h3>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            <div class="campos">
                <input class = "texto-pergunta" placeholder="Título do nível" type="text">
                <input class = "cor-pergunta" placeholder="% de acerto minimo" type="text">
                <h4>Resposta Correta</h4>
                <input class = "resposta-correta" placeholder="Resposta correta" type="text">
                <input class = "url-correta" placeholder="Descrição do nível" type="text">
                <h4>Respostas incorretas</h4>
                <input class = "resposta-incorreta1" placeholder="Resposta incorreta 1" type="text">
                <input class = "url-incorreta1" placeholder="URL da imagem 1" type="text">

                <input class = "resposta-incorreta2" placeholder="Resposta incorreta 2" type="text">
                <input class = "url-incorreta2" placeholder="URL da imagem 2" type="text">

                <input class = "resposta-incorreta3" placeholder="Resposta incorreta 3" type="text">
                <input class = "url-incorreta3" placeholder="URL da imagem 3" type="text">
            </div>
        </div> 
        <div onclick="exibirCriarNiveisQuizz()" class="botao-t3">Prosseguir para criar níveis</div>
    </div>`;
}

function exibirCriarNiveisQuizz(){
    let main = document.querySelector(".main-content");
    main.innerHTML = `
    <div class="tela-3">
        <h2 class="titulo-form">Agora, decida os níveis</h2>
        <div onclick="" class="formulario nivel">
            <div class="header-form">
                <h3>Nível 1</h3>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            <div class="campos">
                <input class = "nivel_titulo" placeholder="Título do nível" type="text">
                <input class = "nivel_acerto" placeholder="% de acerto minimo" type="text">
                <input class = "nivel_img" placeholder="URL da imagem do nível" type="text">
                <input class = "nivel_desc" placeholder="Descrição do nível" type="text">
            </div>
        </div>
        <div onclick="" class="formulario nivel">
            <div class="header-form">
                <h3>Nível 2</h3>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            <div class="campos">
                <input class = "nivel_titulo" placeholder="Título do nível" type="text">
                <input class = "nivel_acerto" placeholder="% de acerto minimo" type="text">
                <input class = "nivel_img" placeholder="URL da imagem do nível" type="text">
                <input class = "nivel_desc" placeholder="Descrição do nível" type="text">
            </div>
        </div>
        <div onclick="ocultarConteudo()" class="formulario nivel">
            <div class="header-form">
                <h3>Nível 3</h3>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            <div class="campos">
                <input class = "nivel_titulo" placeholder="Título do nível" type="text">
                <input class = "nivel_acerto" placeholder="% de acerto minimo" type="text">
                <input class = "nivel_img" placeholder="URL da imagem do nível" type="text">
                <input class = "nivel_desc" placeholder="Descrição do nível" type="text">
            </div>
        </div>
        <div onclick="finalizarQuizz()" class="botao-t3">Finalizar Quizz</div>
    </div>`
}
function finalizarQuizz(){
    let main = document.querySelector(".main-content");
    main.innerHTML = 'quizz criado com sucesso';
}

function ocultarConteudo (element){
    element.parentNode.classList.add("toggleable")
    let jaTem = document.querySelector(".n-oculto")
    if(jaTem !== null){
        jaTem.classList.add("oculto")
        jaTem.classList.remove("n-oculto")
    }
    element.parentNode.classList.remove("oculto")
    element.parentNode.classList.add("n-oculto")
}
function enviarQuizz (){
    const comeco = document.querySelector(".comeco");
    const perguntas = document.querySelector(".perguntas");
    const niveis = document.querySelector(".nivel")
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
                    isCorrectAnswer: Boolean
    }
    let level = {
                    title: "",
                    image: "",
                    text: "",
                    minValue: Number
    }
}

