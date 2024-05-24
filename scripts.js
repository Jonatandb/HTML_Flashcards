const container = document.querySelector(".container");
const addQuestionModal = document.getElementById("add-card-modal");
const cardBtn = document.getElementById("save-btn");
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
  if(isEditing) {
    isEditing = false;
  }
});


