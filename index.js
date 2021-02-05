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
const deleted = document.querySelector(".deleted");
const inProgress = document.querySelector(".inProgress");
const done = document.querySelector(".done");

let data = {
  todo: [],
  progress: [],
  done: [],
  del: [],
};

const addingTask = () => {
  myTasks.innerHTML = "";
  data.todo.forEach((item) => {
    myTasks.innerHTML += `<div class="todoNote">
<p> Название задачи: <span class="note__name">${item.task__name}</span></p>
<p> Описание: <span class="note__description">${item.task__description}</span></p>
<button id="editBtn"> <img src="image/karandash.png"></button>
<button id="deleteBtn"> <img src="image/urna.png"></button>
<button id="progressBtn"> <img src="image/done.png"></button>
</div>`;
  });
};

const deletedTasks = () => {
  deleted.innerHTML = "";
  data.del.forEach((item) => {
    deleted.innerHTML += `<div class="delTodo">
  <p> Название задачи: <span class="note__name">${item.task__name}</span></p>
<p> Описание: <span class="note__description">${item.task__description}</span></p>
</div>`;
  });
};

const progressTasks = () => {
  inProgress.innerHTML = "";
  data.progress.forEach((item) => {
    inProgress.innerHTML += `<div class="progressTodo">
<p> Название задачи: <span class="note__name">${item.task__name}</span></p>
<p> Описание: <span class="note__description">${item.task__description}</span></p>
<button id="progressBtn"> <img src="image/done.png"></button>
</div>`;
  });
};

const doneTasks = () => {
  done.innerHTML = "";
  data.done.forEach((item) => {
    done.innerHTML += `<div class="doneTodo">
<p> Название задачи: <span class="note__name">${item.task__name}</span></p>
<p> Описание: <span class="note__description">${item.task__description}</span></p>
</div>`;
  });
};

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const taskName = document.querySelector("#task__name");
  const taskDescription = document.querySelector("#task__description");
  data.todo.push({
    task__name: taskName.value,
    task__description: taskDescription.value,
  });
  addingTask();
  form.reset();
  console.log(data);
});

const editCard = (event) => {
  const todoNotes = event.target.closest(".todoNote");
  const noteName = todoNotes.querySelector(".note__name").textContent;
  const noteDesc = todoNotes.querySelector(".note__description").textContent;
  const modalTitle = document.querySelector("#edit-title");
  const modalDescription = document.querySelector("#edit-description");
  const index = data.todo.findIndex(
    (item) =>
      item.task__name === noteName && item.task__description === noteDesc
  );
  modalTitle.value = noteName;
  modalDescription.value = noteDesc;
  openModal();
  okBtn.addEventListener("click", (event) => handleSubmitModal(event, index));
};
const handleSubmitModal = (event, index) => {
  event.preventDefault();
  const modalNoteValue = document.querySelector("#edit-title").value;
  const modalNoteDescriptionValue = document.querySelector("#edit-description")
    .value;
  data.todo.splice(index, 1, {
    task__name: modalNoteValue,
    task__description: modalNoteDescriptionValue,
  });
  closeModal();
  addingTask();
  console.log(data.todo);
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
  const index = data.todo.findIndex(
    (item) =>
      item.task__name === noteName && item.task__description === noteDesc
  );
  data.del.push(data.todo[index]);
  data.todo.splice(index, 1);
  console.log(data);
  deletedTasks();
  addingTask();
};

const progress = (event) => {
  const todoNotes = event.target.closest(".todoNote");
  const noteName = todoNotes.querySelector(".note__name").textContent;
  const noteDesc = todoNotes.querySelector(".note__description").textContent;
  const index = data.todo.findIndex(
    (item) =>
      item.task__name === noteName && item.task__description === noteDesc
  );
  data.progress.push(data.todo[index]);
  data.todo.splice(index, 1);
  console.log(data);
  progressTasks();
  addingTask();
};

const doneCard = (event) => {
  const progressTodo = event.target.closest(".progressTodo");
  const progressName = progressTodo.querySelector(".note__name").textContent;
  const progressDesc = progressTodo.querySelector(".note__description")
    .textContent;
  const index = data.progress.findIndex(
    (item) =>
      item.task__name === progressName &&
      item.task__description === progressDesc
  );
  data.done.push(data.progress[index]);
  data.progress.splice(index, 1);
  console.log(data);
  doneTasks();
  progressTasks();
};

myTasks.addEventListener("click", (event) => {
  if (event.target.closest("#deleteBtn")) deleteCard(event);
  if (event.target.closest("#editBtn")) editCard(event);
  if (event.target.closest("#progressBtn")) progress(event);
});
inProgress.addEventListener("click", (event) => {
  if (event.target.closest("#progressBtn")) doneCard(event);
});
