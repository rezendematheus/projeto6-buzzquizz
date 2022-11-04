
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
getList()


//Tela 2 
function getQuizz(quizzId) {

    const quizz = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`)

    quizz.then(showQuizz)
}

function showQuizz(quizz) {
    let header = document.querySelector(".main-header")
    let mainContent = document.querySelector(".main-content")
    let screenOne = document.querySelector(".tela-1")

    screenOne.classList.add("hidden")
    mainContent.classList.remove("hidden")

    mainContent.innerHTML = ""
    header.innerHTML += `<div style = "background-image: linear-gradient(rgba(0, 0, 0, 0.6),
rgba(0, 0, 0, 0.6)), url(${quizz.data.image})" class="main-header-container-bottom">
<h1>${quizz.data.title}</h1>
</div>
`

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
<div class="options-container  ">
    <div onclick="selectAnswer(this)" class="option ${arrayAnswers[0].isCorrectAnswer}">
        <img src=${arrayAnswers[0].image} alt="option">
        <p>${arrayAnswers[0].text}</p>
        
    </div>
    <div onclick="selectAnswer(this)" class="option  ${arrayAnswers[1].isCorrectAnswer}">
        <img src=${arrayAnswers[1].image} alt="option">
        <p>${arrayAnswers[1].text}</p>
        
    </div>
    <div onclick="selectAnswer(this)" class="option ${arrayAnswers[2].isCorrectAnswer}">
        <img src=${arrayAnswers[2].image} alt="option">
        <p>${arrayAnswers[2].text}</p>
        
    </div>
    <div onclick="selectAnswer(this)" class="option  ${arrayAnswers[3].isCorrectAnswer}">
        <img src=${arrayAnswers[3].image} alt="option">
        <p>${arrayAnswers[3].text}</p>
        
    </div>
</div>  `
    }
    console.log(quizz)
}

function selectAnswer(option) {

    let answer1 = option.parentNode.children[0]
    let answer2 = option.parentNode.children[1]
    let answer3 = option.parentNode.children[2]
    let answer4 = option.parentNode.children[3]

if ( answer1.classList.contains ("unselected") || answer2.classList.contains ("unselected") || answer3.classList.contains ("unselected") || answer4.classList.contains ("unselected")) { 
    return
}


    answer1.classList.add("unselected")
    answer2.classList.add("unselected")
    answer3.classList.add("unselected")
    answer4.classList.add("unselected")

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


}

//Tela 3

function niveis(){
    tela_3 = document.querySelector(".tela_3");
    tela_3.innerHTML += ""
}

