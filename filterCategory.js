// const response = {
//     response_code: 0,
//     results: [
//         {},
//         {}
//     ]
// }

// let datos = {};

function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value
    const questionsDifficulty = document.getElementById('questions-difficulty').value
    const questionCategory = document.getElementById('questions-category').value
    const questionType = document.getElementById('questions-type').value
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&difficulty=${questionsDifficulty}&category=${questionCategory}&type=${questionType}`)
        .then(response => response.json())
        .then(data => printCards(data.results))
}
function getCategory() {
    fetch(`https://opentdb.com/api_category.php`)
    .then(response => response.json())
    .then(data => printCategory(data.trivia_categories))
}
// console.log(datos);

function printCards(questions) {
    const container = document.getElementById('container-cards');
    container.innerHTML = '';
    questions.forEach(question => {
        const card = returnCardHTML(question);
        container.innerHTML += card;
    });
    // poner las preguntas en mi página web
}

function returnCardHTML(q,indexCard) {
    const card = `<div class="card">
                    <div class="card-body">
                    <h5 class="card-title">Type: ${q.type}</h5>
                    <h5 class="card-title">Category: ${q.category}</h5>
                    <h5 class="card-title">Difficulty: ${q.difficulty}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Question: ${q.question}</h6>
                        Responses: ${returnAnswersHTML(q.correct_answer, q.incorrect_answers, indexCard)}           
                    </div>
                </div>`
    return card;
}
function printCategory (categorys) {
    const container = document.getElementById('questions-category');
    categorys.forEach(category => {
        container.innerHTML += `<option value="${category.id}">${category.name}</option>`;})
}
function randomIndex(min, max) {
    return Math.floor((Math.random())*(max-min)+min)
    
}
function returnAnswersHTML(correct,incorrects,indexCard) {
    let indexRandom = 0;
    if(document.getElementById('questions-type').value==='boolean'){
        indexRandom=randomIndex(0,2);
    } else {
        indexRandom=randomIndex(0,4)
    }
    incorrects.splice(indexRandom,0,correct)
    let incorrectHTML = '';
    incorrects.forEach((incorrect,index) => {
        incorrectHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="choice-${indexCard}-${indexRandom}" id="answer-id-${indexCard}-${index}" value="${incorrect}" >
                            <label class="form-check-label" for="answer-id-${indexCard}-${index}">
                                ${incorrect}
                                </label>
                            </div>`;
    })


    return incorrectHTML;
}
getCategory();