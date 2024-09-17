const taskForm = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");
const taskList = document.getElementById("task-list");

// Charger les tâches depuis l'API
function loadTasks() {
    fetch("/tasks")
        .then((response) => response.json())
        .then((tasks) => {
            taskList.innerHTML = ""; // Clear existing tasks
            tasks.forEach((task) => {
                const taskItem = createTaskElement(task);
                taskList.appendChild(taskItem);
            });
        })
        .catch((error) =>
            console.error("Erreur lors du chargement des tâches:", error)
        );
}

// Créer un élément de tâche
function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
        <span>${task.name}</span>
        <div class="actions">
            <button onclick="toggleTask(${task.id}, ${!task.completed})">${
        task.completed ? "Reprendre" : "Terminer"
    }</button>
            <button onclick="deleteTask(${task.id})">Supprimer</button>
        </div>
    `;
    return li;
}

// Ajouter une tâche
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newTask = {
        name: taskNameInput.value,
        completed: false,
    };

    fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
    })
        .then((response) => response.json())
        .then((task) => {
            const taskItem = createTaskElement(task);
            taskList.appendChild(taskItem);
            taskNameInput.value = "";
        })
        .catch((error) =>
            console.error("Erreur lors de l'ajout de la tâche:", error)
        );
});

// Terminer ou reprendre une tâche
function toggleTask(id, completed) {
    fetch(`/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
    })
        .then(() => loadTasks())
        .catch((error) =>
            console.error("Erreur lors de la mise à jour de la tâche:", error)
        );
}

// Supprimer une tâche
function deleteTask(id) {
    fetch(`/tasks/${id}`, {
        method: "DELETE",
    })
        .then(() => loadTasks())
        .catch((error) =>
            console.error("Erreur lors de la suppression de la tâche:", error)
        );
}

// Charger les tâches au démarrage
loadTasks();
