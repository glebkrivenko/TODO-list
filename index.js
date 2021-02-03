const submitBtn = document.querySelector("#submitBtn");
const form = document.querySelector("form");
const myTasks = document.querySelector(".my__tasks");
const editBtn = document.querySelector("#editBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const list = document.querySelector(".list");
const progressBtn = document.querySelector("#progressBtn");
const modalWrapper = document.querySelector(".modal__wrapper");
const closeBtn = document.querySelector("#closeBtn");
const okBtn = document.querySelector("#okBtn");
let array = {
  todo: [],
  progress: [],
  done: [],
  del: [],
};

const addingTask = () => {
  myTasks.innerHTML = "";
  array.todo.forEach((item) => {
    myTasks.innerHTML += `<div class="todoNote">
<p> Название задачи: <span class="note__name">${item.task__name}</span></p>
<p> Описание: <span class="note__description">${item.task__description}</span></p>
<button id="editBtn"> <img src="image/karandash.png"></button>
<button id="deleteBtn"> <img src="image/urna.png"></button>
<button id="progressBtn"> <img src="image/done.png"></button>
</div>`;
  });
};

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const taskName = document.querySelector("#task__name");
  const taskDescription = document.querySelector("#task__description");
  array.todo.push({
    task__name: taskName.value,
    task__description: taskDescription.value,
  });
  addingTask();
  form.reset();
  console.log(array);
});

const editCard = (event) => {
  const todoNotes = event.target.closest(".todoNote");
  const noteName = todoNotes.querySelector(".note__name").textContent;
  const noteDesc = todoNotes.querySelector(".note__description").textContent;
  const modalTitle = document.querySelector("#edit-title");
  const modalDescription = document.querySelector("#edit-description");
  const index = array.todo.findIndex(
    (item) =>
      item.task__name === noteName && item.task__description === noteDesc
  );
  modalTitle.value = array.todo[index].noteName;
  modalDescription.value = array.todo[index].noteDesc;
  openModal();
  okBtn.addEventListener("click", (event) => handleSubmitModal(event, index));
};
const handleSubmitModal = (event, index) => {
  event.preventDefault();
  const modalNoteValue = document.querySelector("#edit-title").value;
  const modalNoteDescriptionValue = document.querySelector("#edit-description")
    .value;
  array.todo.splice(index, 1, {
    noteName: modalNoteValue,
    noteDesc: modalNoteDescriptionValue,
  });
  closeModal();
  //   addingTask();
};
const openModal = () => {
  modalWrapper.style.display = "block";
};
const closeModal = () => {
  modalWrapper.style.display = "none";
};

const deleteCard = (event) => {
  const todoNotes = event.target.closest(".todoNote");
  const noteName = todoNotes.querySelector(".note__name").textContent;
  const noteDesc = todoNotes.querySelector(".note__description").textContent;
  const index = array.todo.findIndex(
    (item) =>
      item.task__name === noteName && item.task__description === noteDesc
  );
  array.todo.splice(index, 1);
  addingTask();
};

list.addEventListener("click", (event) => {
  if (event.target.closest("#deleteBtn")) deleteCard(event);
  if (event.target.closest("#editBtn")) editCard(event);
});
closeBtn.addEventListener("click", () => {
  closeModal();
});
