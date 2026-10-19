/* ==========================================================================
   DailyBuddy - Beginner-Friendly Task Planner Script
   Vanilla JavaScript with detailed comments explaining every step.
   ========================================================================== */

// ---------------------------------------------------------------------------
// 1. Storage Keys & Initial State
// ---------------------------------------------------------------------------
// We use localStorage so tasks and settings remain even after refreshing.
const STORAGE_KEY_TASKS = 'dailybuddy_tasks';
const STORAGE_KEY_THEME = 'dailybuddy_theme';

// This array holds all our task objects in memory.
// Format of each task: { id: number, text: string, category: string, completed: boolean, createdAt: string }
let tasks = [];

// Current filter state: 'all' | 'active' | 'completed'
let currentFilter = 'all';

// ---------------------------------------------------------------------------
// 2. DOM Elements (Finding HTML items so we can interact with them)
// ---------------------------------------------------------------------------
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const formErrorMessage = document.getElementById('formErrorMessage');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const emptyStateTitle = document.getElementById('emptyStateTitle');
const emptyStateText = document.getElementById('emptyStateText');

// Progress Bar elements
const progressBarFill = document.getElementById('progressBarFill');
const progressBar = document.getElementById('progressBar');
const progressSubtext = document.getElementById('progressSubtext');
const progressPercentBadge = document.getElementById('progressPercentBadge');
const motivationQuote = document.getElementById('motivationQuote');

// Filter Tab buttons & Badges
const filterTabs = document.querySelectorAll('.filter-tab');
const countAllBadge = document.getElementById('countAll');
const countActiveBadge = document.getElementById('countActive');
const countCompletedBadge = document.getElementById('countCompleted');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

// Date & Theme elements
const currentDateText = document.getElementById('currentDateText');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');

// ---------------------------------------------------------------------------
// 3. Date Formatting
// ---------------------------------------------------------------------------
// Displays today's date nicely, like: "Monday, Oct 19, 2026"
function displayCurrentDate() {
  const now = new Date();
  const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
  currentDateText.textContent = now.toLocaleDateString(undefined, options);
}

// ---------------------------------------------------------------------------
// 4. LocalStorage Helpers
// ---------------------------------------------------------------------------
// Saves the current `tasks` array into the browser's storage
function saveTasksToStorage() {
  localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
}

// Loads saved tasks from storage when the page opens
function loadTasksFromStorage() {
  const savedData = localStorage.getItem(STORAGE_KEY_TASKS);
  if (savedData) {
    try {
      tasks = JSON.parse(savedData);
    } catch (e) {
      console.error('Could not parse saved tasks:', e);
      tasks = [];
    }
  } else {
    // Beginner starter tasks to welcome first-time users!
    tasks = [
      {
        id: Date.now() - 2000,
        text: 'Welcome to DailyBuddy! Tap the checkbox to complete me',
        category: 'Personal',
        completed: false,
        createdAt: 'Just now'
      },
      {
        id: Date.now() - 1000,
        text: 'Try adding your own task using the box above',
        category: 'Work',
        completed: false,
        createdAt: 'Just now'
      }
    ];
    saveTasksToStorage();
  }
}

// ---------------------------------------------------------------------------
// 5. Theme Toggle (Dark / Light Mode)
// ---------------------------------------------------------------------------
function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY_THEME) || 'light';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
    themeToggleBtn.setAttribute('title', 'Switch to light mode');
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
    themeToggleBtn.setAttribute('title', 'Switch to dark mode');
  }
  localStorage.setItem(STORAGE_KEY_THEME, theme);
}

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

// ---------------------------------------------------------------------------
// 6. Validation Helpers
// ---------------------------------------------------------------------------
// Shows an error message if the user tries to submit an empty task
function showError(message) {
  formErrorMessage.textContent = message;
  formErrorMessage.classList.add('show');
  taskInput.classList.add('input-error');
  taskInput.focus();
}

// Clears the error message
function clearError() {
  formErrorMessage.textContent = '';
  formErrorMessage.classList.remove('show');
  taskInput.classList.remove('input-error');
}

// Clear error when the user starts typing
taskInput.addEventListener('input', () => {
  if (taskInput.classList.contains('input-error')) {
    clearError();
  }
});

// ---------------------------------------------------------------------------
// 7. Adding a Task
// ---------------------------------------------------------------------------
taskForm.addEventListener('submit', (event) => {
  // Prevent default page reload on form submit
  event.preventDefault();

  const rawText = taskInput.value;
  const trimmedText = rawText.trim();

  // Validation Check: ensure the task is not blank
  if (trimmedText === '') {
    showError('⚠️ Please enter a task description before adding!');
    return;
  }

  // Get selected category
  const selectedCategoryRadio = document.querySelector('input[name="taskCategory"]:checked');
  const category = selectedCategoryRadio ? selectedCategoryRadio.value : 'General';

  // Format a friendly creation time (e.g., "4:15 PM")
  const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Create the new task object
  const newTask = {
    id: Date.now(), // unique ID based on timestamp
    text: trimmedText,
    category: category,
    completed: false,
    createdAt: timeString
  };

  // Add the new task to the top of the list
  tasks.unshift(newTask);

  // Save to localStorage
  saveTasksToStorage();

  // Clear the input and any errors
  taskInput.value = '';
  clearError();

  // Re-render UI
  renderTasks();
});

// ---------------------------------------------------------------------------
// 8. Toggling Complete & Deleting Tasks
// ---------------------------------------------------------------------------
function toggleTaskComplete(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    saveTasksToStorage();
    renderTasks();
  }
}

function deleteTask(taskId, taskElement) {
  // Add a smooth sliding exit animation before removing
  taskElement.classList.add('removing');

  setTimeout(() => {
    // Filter out the deleted task from our array
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasksToStorage();
    renderTasks();
  }, 220); // Matches the CSS transition duration
}

// ---------------------------------------------------------------------------
// 9. Filtering & Clear Completed
// ---------------------------------------------------------------------------
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active state from all tabs
    filterTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });

    // Set active state on clicked tab
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    currentFilter = tab.getAttribute('data-filter');
    renderTasks();
  });
});

clearCompletedBtn.addEventListener('click', () => {
  const completedCount = tasks.filter(t => t.completed).length;
  if (completedCount === 0) return;

  const confirmClear = confirm(`Are you sure you want to remove all ${completedCount} completed task(s)?`);
  if (confirmClear) {
    tasks = tasks.filter(t => !t.completed);
    saveTasksToStorage();
    renderTasks();
  }
});

// ---------------------------------------------------------------------------
// 10. Updating Progress Bar & Badges
// ---------------------------------------------------------------------------
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const active = total - completed;

  // Update filter badge counts
  countAllBadge.textContent = total;
  countActiveBadge.textContent = active;
  countCompletedBadge.textContent = completed;

  // Enable/disable Clear Completed button
  clearCompletedBtn.style.opacity = completed > 0 ? '1' : '0.5';
  clearCompletedBtn.style.pointerEvents = completed > 0 ? 'auto' : 'none';

  // Calculate percentage
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Update Progress DOM elements
  progressBarFill.style.width = `${percentage}%`;
  progressBar.setAttribute('aria-valuenow', percentage);
  progressPercentBadge.textContent = `${percentage}%`;
  progressSubtext.textContent = `${completed} of ${total} tasks completed`;

  // Dynamic motivational quotes based on progress
  if (total === 0) {
    motivationQuote.textContent = "Start your day by adding your first task!";
  } else if (completed === total) {
    motivationQuote.textContent = "🌟 High five! All tasks are finished for today!";
  } else if (percentage >= 50) {
    motivationQuote.textContent = "🔥 Halfway there! You're making tremendous progress!";
  } else if (completed > 0) {
    motivationQuote.textContent = "🌱 Off to a great start! Keep the momentum going!";
  } else {
    motivationQuote.textContent = "💪 Ready when you are! Tap a checkbox once done.";
  }
}

// ---------------------------------------------------------------------------
// 11. Rendering the Task List
// ---------------------------------------------------------------------------
function renderTasks() {
  // First, update progress and stats
  updateProgress();

  // Filter tasks based on selected tab
  let filteredTasks = tasks;
  if (currentFilter === 'active') {
    filteredTasks = tasks.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(t => t.completed);
  }

  // Clear current list in DOM
  taskList.innerHTML = '';

  // Handle Empty State
  if (filteredTasks.length === 0) {
    emptyState.classList.add('show');
    if (tasks.length === 0) {
      emptyStateTitle.textContent = 'No tasks yet';
      emptyStateText.innerHTML = 'Type something in the box above and tap <strong>Add Task</strong> to kick off your day!';
    } else if (currentFilter === 'active') {
      emptyStateTitle.textContent = 'All caught up!';
      emptyStateText.textContent = 'You have no pending tasks right now. Great job! 🎉';
    } else if (currentFilter === 'completed') {
      emptyStateTitle.textContent = 'No completed tasks yet';
      emptyStateText.textContent = 'Check off a task to see it listed here.';
    }
  } else {
    emptyState.classList.remove('show');
  }

  // Render each filtered task item
  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);

    // Pick tag style based on category
    const categoryClass = `tag-${task.category.toLowerCase()}`;

    li.innerHTML = `
      <label class="task-checkbox-label" title="${task.completed ? 'Mark as incomplete' : 'Mark as complete'}">
        <input 
          type="checkbox" 
          class="task-checkbox-input" 
          ${task.completed ? 'checked' : ''}
          aria-label="Mark task '${escapeHtml(task.text)}' as ${task.completed ? 'incomplete' : 'complete'}"
        >
        <span class="custom-checkbox" aria-hidden="true"></span>
      </label>

      <div class="task-content">
        <span class="task-text">${escapeHtml(task.text)}</span>
        <div class="task-meta">
          <span class="task-category-pill ${categoryClass}">${escapeHtml(task.category)}</span>
          <span class="task-time">${task.createdAt || ''}</span>
        </div>
      </div>

      <button class="btn-delete" title="Delete task" aria-label="Delete task '${escapeHtml(task.text)}'">
        <span aria-hidden="true">🗑️</span>
      </button>
    `;

    // Event listener for checkbox
    const checkbox = li.querySelector('.task-checkbox-input');
    checkbox.addEventListener('change', () => {
      toggleTaskComplete(task.id);
    });

    // Event listener for delete button
    const deleteBtn = li.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => {
      deleteTask(task.id, li);
    });

    taskList.appendChild(li);
  });
}

// ---------------------------------------------------------------------------
// 12. Security Helper (Prevent HTML injection in task text)
// ---------------------------------------------------------------------------
function escapeHtml(string) {
  if (!string) return '';
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ---------------------------------------------------------------------------
// 13. Application Initialization
// ---------------------------------------------------------------------------
function initApp() {
  displayCurrentDate();
  initTheme();
  loadTasksFromStorage();
  renderTasks();
  registerServiceWorker();
}

// Registers the Service Worker for Android PWA & Offline Support
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('DailyBuddy Service Worker registered successfully:', reg.scope);
        })
        .catch((err) => {
          console.log('Service Worker registration skipped or failed:', err);
        });
    });
  }
}

// Run init when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

