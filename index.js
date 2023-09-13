// Get DOM elements
const inputField = document.getElementById('inputField');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');
const sortSelect = document.getElementById('sortSelect');
const filterSelect = document.getElementById('filterSelect');

// Task data array
let tasks = [];

// Function to render tasks
function renderTasks() {
  todoList.innerHTML = '';

  const sortedTasks = tasks.slice(); // Create a copy of tasks to avoid modifying the original array

  // Apply sorting based on select option
  if (sortSelect.value === 'oldest') {
    sortedTasks.sort((a, b) => a.dueDate - b.dueDate);
  } else if (sortSelect.value === 'newest') {
    sortedTasks.sort((a, b) => b.dueDate - a.dueDate);
  }

  // Apply filtering based on select option
  const filteredTasks = sortedTasks.filter(task => {
    if (filterSelect.value === 'all') {
      return true;
    } else if (filterSelect.value === 'completed') {
      return task.completed;
    } else if (filterSelect.value === 'active') {
      return !task.completed;
    }
  });

  filteredTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.className = 'item';
    taskItem.innerHTML = `
      <div class="content">
        <input type="text" class="text" value="${task.title}" readonly>
      </div>
      <div class="actions">
        <button class="btn btn-primary edit-button">Edit</button>
        <button class="btn btn-danger delete-button">Delete</button>
        <button class="btn btn-success complete-button">${task.completed ? 'Incomplete' : 'Complete'}</button>
      </div>
    `;
x
  localStorage.setItem('task',JSON.stringify(tasks));
  let retrieve=JSON.parse(localStorage.getItem('task'));
  console.log(retrieve);

    const editButton = taskItem.querySelector('.edit-button');
    const deleteButton = taskItem.querySelector('.delete-button');
    const completeButton = taskItem.querySelector('.complete-button');

    editButton.addEventListener('click', () => {
      // Implement edit functionality here
    });

    deleteButton.addEventListener('click', () => {
      // Implement delete functionality here
    });

    completeButton.addEventListener('click', () => {
      // Implement complete functionality here
    });

    todoList.appendChild(taskItem);
  });
}

document.querySelector('#searchField').addEventListener('input', function() {
  var searchValue = this.value.toLowerCase();
  var taskItems = document.querySelectorAll('.item');

  taskItems.forEach(function(taskItem) {
    var taskName = taskItem.querySelector('.text').value.toLowerCase();
    if (taskName.includes(searchValue)) {
      taskItem.style.display = ''; // Show the task item
    } else {
      taskItem.style.display = 'none'; // Hide the task item
    }
  });
});


// Add task function
function addTask(title) {
  const task = {
    title: title,
    dueDate: new Date(), // Add dueDate property
    category: '', // Add category property
    completed: false,
  };

  tasks.push(task);
  renderTasks();
}

// Add button click event
addButton.addEventListener('click', () => {
  if (inputField.value.trim() !== '') {
    addTask(inputField.value);
    inputField.value = '';
  }
});

renderTasks();


// Edit task function
function editTask(index, newTitle) {
    tasks[index].title = newTitle;
    renderTasks();
  }
  
  // Delete task function
  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }
  
  // Toggle completion status function
  function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }
  
  // Add button click event
  addButton.addEventListener('click', () => {
    if (inputField.value.trim() !== '') {
      addTask(inputField.value);
      inputField.value = '';
    }
  });
  
  // Event for edit, delete, and complete buttons
  todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-button')) {
      const taskItem = event.target.closest('.item');
      const index = Array.from(todoList.children).indexOf(taskItem);
      const newTitle = prompt('Enter the new task title:', tasks[index].title);
      if (newTitle !== null) {
        editTask(index, newTitle);
      }
    } else if (event.target.classList.contains('delete-button')) {
      const taskItem = event.target.closest('.item');
      const index = Array.from(todoList.children).indexOf(taskItem);
      if (confirm('Are you sure you want to delete this task?')) {
        deleteTask(index);
      }
    } else if (event.target.classList.contains('complete-button')) {
      const taskItem = event.target.closest('.item');
      const index = Array.from(todoList.children).indexOf(taskItem);
      toggleCompletion(index);
    }
  });
  // Function to sort tasks
function sortTasksBy(sortOption) {
    if (sortOption === 'dueDate') {
      tasks.sort((a, b) => a.dueDate - b.dueDate);
    } else if (sortOption === 'completionStatus') {
      tasks.sort((a, b) => a.completed - b.completed);
    } else if (sortOption === 'category') {
      tasks.sort((a, b) => a.category.localeCompare(b.category));
    }
    renderTasks();
  }
  
  // Function to filter tasks
  function filterTasksBy(filterOption) {
    if (filterOption === 'completed') {
      const completedTasks = tasks.filter(task => task.completed);
      renderTasks(completedTasks);
    } else if (filterOption === 'active') {
      const activeTasks = tasks.filter(task => !task.completed);
      renderTasks(activeTasks);
    } else if (filterOption === 'all') {
      renderTasks(tasks); // Display all tasks
    }
  }


  
  // Sorting select change event
  sortSelect.addEventListener('change', () => {
    sortTasksBy(sortSelect.value);
  });
  
  // Filtering select change event
  filterSelect.addEventListener('change', () => {
    filterTasksBy(filterSelect.value);
  });