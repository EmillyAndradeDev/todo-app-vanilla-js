const taskForm = document.querySelector(".input-area");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Recupera tarefas salvas ou inicia vazio
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Renderiza a lista na tela
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(index));

    // Texto da Tarefa
    const span = document.createElement("span");
    span.textContent = task.text;
    span.style.flex = "1"; // Faz o texto ocupar o espaço disponível
    span.style.marginLeft = "10px"; // Dá um respiro do checkbox
    if (task.completed) span.classList.add("completed");

    // Container para os botões (para ficarem juntos à direita)
    const actionDiv = document.createElement("div");
    actionDiv.style.display = "flex";
    actionDiv.style.gap = "5px"; // Espaço entre os botões

    // Botão Editar
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.title = "Editar tarefa"; // Acessibilidade (tooltip)
    editBtn.addEventListener("click", () => editTask(index));

    // Botão Excluir
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.title = "Excluir tarefa";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    // Montagem
    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actionDiv);

    taskList.appendChild(li);
  });

  saveTasks();
}

// Adicionar nova tarefa
function addTask(event) {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  taskInput.value = "";
  taskInput.focus();
  renderTasks();
}

// Alternar status (concluído/não concluído)
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Editar tarefa
function editTask(index) {
  const newText = prompt("Edite a tarefa:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    renderTasks();
  }
}

// Deletar tarefa
function deleteTask(index) {
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

// Função auxiliar para salvar no LocalStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskForm.addEventListener("submit", addTask);

renderTasks();