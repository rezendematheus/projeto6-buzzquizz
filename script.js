
function getQuizz(){
const quizz = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1')

quizz.then(showQuizz)
}

function showQuizz(quizz){
let header = document.querySelector(".main-header")
let mainContent = document.querySelector(".main-content")

header.innerHTML += `<div style = "background-image: url(${quizz.data.image})" class="main-header-container-bottom">

<h1>${quizz.data.title}</h1>
</div>
`

for ( i = 0; i < quizz.data.questions.length; i++){
    mainContent.innerHTML += `<div class="quest-container">
<div class="quest-title">
    <h2>${quizz.data.questions[i].title}</h2>
</div>
<div class="options-container">
    <div onclick="selectAnswer(this,${quizz.data.questions[i].answers[0].isCorrectAnswer} )" class="option">
        <img src=${quizz.data.questions[i].answers[0].image} alt="option">
        <p>${quizz.data.questions[i].answers[0].text}</p>
        
    </div>
    <div onclick="selectAnswer(this,${quizz.data.questions[i].answers[1].isCorrectAnswer})" class="option">
        <img src=${quizz.data.questions[i].answers[1].image} alt="option">
        <p>${quizz.data.questions[i].answers[1].text}</p>
        
    </div>
    <div onclick="selectAnswer(this,${quizz.data.questions[i].answers[2].isCorrectAnswer})" class="option">
        <img src=${quizz.data.questions[i].answers[2].image} alt="option">
        <p>${quizz.data.questions[i].answers[2].text}</p>
        
    </div>
    <div onclick="selectAnswer(this,${quizz.data.questions[i].answers[3].isCorrectAnswer})" class="option">
        <img src=${quizz.data.questions[i].answers[3].image} alt="option">
        <p>${quizz.data.questions[i].answers[3].text}</p>
        
    </div>
</div>  `
}
    console.log(quizz)
}

function selectAnswer(option, isCorrectAnswer){

    if (isCorrectAnswer){
    option.classList.add("correct")
    } else {
    option.classList.add("wrong")
    }
   
  console.log(isCorrectAnswer)
}
getQuizz()