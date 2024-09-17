// get tasks from API
fetch('/tasks')
.then(response => response.json())
.then(tasks => {
  const taskList = document.getElementById('task-list');
  tasks.forEach(task => {
    const taskListItem = document.createElement('li');
    taskListItem.textContent = task.name;
    taskList.appendChild(taskListItem);
  });
});

// create task form submission
document.getElementById('create-task-form').addEventListener('submit', event => {
event.preventDefault();
const taskName = document.getElementById('task-name').value;
fetch('/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: taskName, completed: false })
})
.then(response => response.json())
.then(task => {
  const taskList = document.getElementById('task-list');
  const taskListItem = document.createElement('li');
  taskListItem.textContent = task.name;
  taskList.appendChild(taskListItem);
});
});