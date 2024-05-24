const container = document.querySelector(".container");
const cardList = document.getElementById("cards-list");
const addQuestionModal = document.getElementById("add-card-modal");
const saveBtn = document.getElementById("save-btn");
const addQuestionBtn = document.getElementById("add-card");
const closeBtn = document.getElementById("close-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");

let isEditing = false;
let originalId = null;
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
      if(card.id === originalId) {
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
  //renderFlashcards();
})
