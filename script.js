
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
            <div class="seus-quizzes not-display">
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

function toggleCriar() {
    if (document.querySelector(".quizz-container").innerHTML == ! '') {
        document.querySelector(".criar-quizz").classList.add("not-display")
        document.querySelector(".seus-quizzes").classList.remove("not-display")
    }
}
getList()


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
    if (answer4.classList.contains("false")) {
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

