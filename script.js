// ------------------ Seleção de elementos HTML ------------------

// Campo de texto para digitar a nova tarefa
const taskInput = document.getElementById("taskInput");

// Botão "Adicionar" para criar nova tarefa
const addTaskBtn = document.getElementById("addTask");

// Lista onde as tarefas serão exibidas
const taskList = document.getElementById("taskList");

// ------------------ Carregamento inicial ------------------

// Recupera tarefas salvas no localStorage, ou cria array vazio
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ------------------ Funções principais ------------------

// Renderiza todas as tarefas na tela
function renderTasks() {
  taskList.innerHTML = ""; // limpa lista antes de renderizar

  tasks.forEach((task, index) => {
    // Cria elemento <li> para cada tarefa
    const li = document.createElement("li");

    // ------------------ Checkbox ------------------
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";       // define tipo checkbox
    checkbox.checked = task.completed; // marca se tarefa concluída
    // Evento: ao clicar no checkbox, alterna conclusão da tarefa
    checkbox.addEventListener("change", () => toggleTask(index));

    // ------------------ Texto da tarefa ------------------
    const span = document.createElement("span");
    span.textContent = task.text; // define texto da tarefa
    if (task.completed) span.classList.add("completed"); // risca se concluída

    // ------------------ Botão de editar ------------------
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️"; // ícone de lápis
    // Evento: editar tarefa ao clicar
    editBtn.addEventListener("click", () => editTask(index));

    // ------------------ Botão de excluir ------------------
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️"; // ícone de lixeira
    // Evento: deletar tarefa ao clicar
    deleteBtn.addEventListener("click", () => deleteTask(index));

    // ------------------ Montagem do <li> ------------------
    li.appendChild(checkbox);  // adiciona checkbox
    li.appendChild(span);      // adiciona texto
    li.appendChild(editBtn);   // adiciona botão editar
    li.appendChild(deleteBtn); // adiciona botão deletar

    // Adiciona <li> na lista de tarefas
    taskList.appendChild(li);
  });

  // Atualiza o localStorage com a lista atualizada
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Adiciona uma nova tarefa
function addTask() {
  const text = taskInput.value.trim(); // pega texto do input
  if (text === "") return; // ignora se estiver vazio

  // Cria objeto de tarefa com texto e status "não concluída"
  tasks.push({ text, completed: false });

  // Limpa campo de input
  taskInput.value = "";

  // Renderiza novamente a lista
  renderTasks();
}

// Alterna entre "concluída" e "não concluída" ao marcar/desmarcar checkbox
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks(); // redesenha lista atualizada
}

// Edita uma tarefa existente
function editTask(index) {
  const newText = prompt("Edite a tarefa:", tasks[index].text); // abre prompt
  if (newText !== null && newText.trim() !== "") { // verifica se não cancelou ou vazio
    tasks[index].text = newText.trim(); // atualiza texto
    renderTasks(); // redesenha lista
  }
}

// Deleta uma tarefa
function deleteTask(index) {
  tasks.splice(index, 1); // remove do array
  renderTasks();           // redesenha lista
}

// ------------------ Eventos ------------------

// Clique no botão "Adicionar"
addTaskBtn.addEventListener("click", addTask);

// Pressionar Enter dentro do input também adiciona tarefa
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Renderiza tarefas salvas ao carregar a página
renderTasks();
