document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTask');
  const taskList = document.getElementById('taskList');

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    taskList.innerHTML = '';
    tasks.forEach(task => {
      addTaskToDOM(task);
    });
  }

  // Save tasks to localStorage
  function saveTasks() {
    const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Add task to DOM
  function addTaskToDOM(taskText) {
    const li = document.createElement('li');
    li.className = 'task-item';
    
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
      li.remove();
      saveTasks();
    };

    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }

  // Add new task
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTaskToDOM(taskText);
      taskInput.value = '';
      saveTasks();
    }
  }

  // Event listeners
  addTaskButton.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });

  // Load tasks on startup
  loadTasks();
});