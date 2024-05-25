const container = document.querySelector(".container");
const cardsList = document.querySelector(".cards-list");
const addQuestionModal = document.getElementById("add-card-modal");
const saveBtn = document.getElementById("save-btn");
const addQuestionBtn = document.getElementById("add-card");
const closeBtn = document.getElementById("close-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");

let isEditing = false;
let cardId = null;
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

addQuestionBtn.addEventListener("click", () => {
  container.classList.add('hide');
  addQuestionModal.classList.remove('hide');
  question.value = "";
  question.focus();
  answer.value = "";
});

closeBtn.addEventListener("click", () => {
  container.classList.remove('hide');
  addQuestionModal.classList.add('hide');
  errorMessage.classList.add("hidden");
  if(isEditing) {
    isEditing = false;
  }
});

saveBtn.addEventListener("click", () => {
  let questionText = question.value.trim();
  let answerText = answer.value.trim();
  if(questionText === "" || answerText === "") {
    errorMessage.classList.remove("hidden");
    return;
  }
  errorMessage.classList.add("hidden");
  if(isEditing) {

    flashcards = flashcards.map(card => {
      if(card.id === cardId) {
        card.question = questionText;
        card.answer = answerText;
      }
      return card;
    });
    isEditing = false;
  } else {
    flashcards.push({
      id: Date.now(),
      question: questionText,
      answer: answerText
    });
  }
  localStorage.setItem('flashcards', JSON.stringify(flashcards));
  container.classList.remove('hide');
  addQuestionModal.classList.add('hide');
  renderFlashcards();
})

function renderFlashcards() {
  const flashCards = JSON.parse(localStorage.getItem('flashcards')) || [];
  cardsList.innerHTML = "";
  flashCards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.innerHTML = `
      <p class="question-text">${card.question}</p>
      <p class="answer-text hidden">${card.answer}</p>
      <button class="show-hide-btn" title="Show/Hide">Show/Hide</button>
      <div class="btns-con">
        <button class="edit" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete" title="Delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    cardDiv.setAttribute('data-id', card.id);
    const answerText = cardDiv.querySelector('.answer-text');
    const showHideBtn = cardDiv.querySelector('.show-hide-btn');
    const editBtn = cardDiv.querySelector('.edit');
    const deleteBtn = cardDiv.querySelector('.delete');
    showHideBtn.addEventListener('click', () => {
      answerText.classList.toggle('hidden');
    });

    editBtn.addEventListener('click', () => {
      isEditing = true;
      addQuestionModal.classList.remove('hide');
      container.classList.add('hide');
      modifyCard(cardDiv);
    });

    deleteBtn.addEventListener('click', () => {
      modifyCard(cardDiv);
    });

    cardsList.appendChild(cardDiv);
  });
}

function modifyCard(cardDiv) {
  cardId = Number(cardDiv.attributes['data-id'].value);
  if(isEditing) {
    question.value = cardDiv.querySelector('.question-text').textContent;
    answer.value = cardDiv.querySelector('.answer-text').textContent;
    question.focus();
  } else {
    if(confirm("Are you sure you want to delete this card?")) {
      flashcards = flashcards.filter(card => card.id !== cardId);
      localStorage.setItem('flashcards', JSON.stringify(flashcards));
      renderFlashcards();
    }
  }
}

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  let now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

document.addEventListener('DOMContentLoaded', renderFlashcards);
