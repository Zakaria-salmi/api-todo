const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("newTaskInput");
const addTaskButton = document.getElementById("addTaskButton");

let tasks = [];

fetch("/tasks")
    .then((response) => response.json())
    .then((fetchTasks) => {
        tasks = fetchTasks;
        renderTasks(tasks);
        console.log(tasks);
    })
    .catch((error) => console.error("Error fetching tasks:", error));

addTaskButton.addEventListener("click", () => {
    if (newTaskInput.value.trim() !== "") {
        const newTask = {
            name: newTaskInput.value,
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
                tasks.push(task);
                renderTasks(tasks);
                newTaskInput.value = "";
            })
            .catch((error) => console.error("Error adding task:", error));
    }
});

function renderTasks(tasks) {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.id = task.id;

        const span = document.createElement("span");
        span.textContent = task.name;

        li.appendChild(span);

        li.addEventListener("click", (e) => {
            toggleTaskCompletion(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteTask(task.id);
        });

        li.appendChild(deleteButton);

        taskList.appendChild(li);

        if (task.completed) {
            span.classList.add("completed");
        }
    });
}

function toggleTaskCompletion(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    fetch(`/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: task.name,
            completed: !task.completed,
        }),
    })
        .then((response) => response.json())
        .then((updatedTask) => {
            const taskIndex = tasks.findIndex((t) => t.id === taskId);
            if (taskIndex !== -1) {
                tasks[taskIndex] = updatedTask;
            }
            renderTasks(tasks);
        })
        .catch((error) =>
            console.error("Error toggling task completion:", error)
        );
}

function deleteTask(taskId) {
    fetch(`/tasks/${taskId}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then(() => {
            tasks = tasks.filter((task) => task.id !== taskId);
            renderTasks(tasks);
        })
        .catch((error) => console.error("Error deleting task:", error));
}
