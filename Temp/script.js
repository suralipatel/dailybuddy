/* ==========================================================================
   Arrow Puzzle - 14-Day Launch Plan Script
   Interactive Calendar, Priority Management (P1/P2/P3), Day-by-Day Agenda,
   Track Breakdown, Checkpoints & Progress Dashboard.
   ========================================================================== */

// ---------------------------------------------------------------------------
// 1. Storage Keys & Default 14-Day Launch Plan Data
// ---------------------------------------------------------------------------
const STORAGE_KEY_TASKS = 'arrow_puzzle_launch_plan_v2';
const STORAGE_KEY_THEME = 'arrow_puzzle_theme';

const TRACKS_METADATA = {
  A: { code: 'A', name: 'Play Console & Testing', color: '#0284c7' },
  B: { code: 'B', name: 'Game Content (Main Task)', color: '#7c3aed' },
  C: { code: 'C', name: 'Analytics & Rewarded Ads', color: '#ea580c' },
  D: { code: 'D', name: 'Website & Policy', color: '#059669' },
  E: { code: 'E', name: 'Marketing Prep', color: '#e11d48' },
  F: { code: 'F', name: 'Accounts & Legal', color: '#0d9488' }
};

const CHECKPOINTS = [
  {
    date: '2026-10-26',
    title: 'Mid-point review',
    desc: '200 levels ready, crashes fixed, ads working with test IDs'
  },
  {
    date: '2026-10-31',
    title: 'Content freeze',
    desc: 'Only bug fixes after this point'
  },
  {
    date: '2026-11-01',
    title: 'Final full test',
    desc: 'Thorough testing on real devices'
  },
  {
    date: '2026-11-02',
    title: 'Apply for production',
    desc: 'Apply for production access after 14 days'
  }
];

// All 29 exact tasks from user's Arrow Puzzle Launch Plan
const DEFAULT_LAUNCH_PLAN_TASKS = [
  // A. PLAY CONSOLE & TESTING (5 tasks)
  {
    id: 'task-a1',
    text: 'Keep all 12 testers opted in (remind every 3 days)',
    track: 'A',
    priority: 'P1',
    date: '2026-11-02',
    displayDate: '2 Nov',
    completed: false
  },
  {
    id: 'task-a2',
    text: 'Check Android Vitals; fix crashes and ANRs',
    track: 'A',
    priority: 'P1',
    date: '2026-10-24',
    displayDate: '24 Oct',
    completed: false
  },
  {
    id: 'task-a3',
    text: 'Fill app content forms (privacy, Data safety, ads declaration)',
    track: 'A',
    priority: 'P1',
    date: '2026-10-23',
    displayDate: '23 Oct',
    completed: false
  },
  {
    id: 'task-a4',
    text: 'Store listing: text, icon, screenshots, gameplay video',
    track: 'A',
    priority: 'P1',
    date: '2026-10-28',
    displayDate: '28 Oct',
    completed: false
  },
  {
    id: 'task-a5',
    text: 'Apply for production access (after day 14)',
    track: 'A',
    priority: 'P1',
    date: '2026-11-02',
    displayDate: '2 Nov',
    completed: false
  },

  // B. GAME CONTENT (MAIN TASK) (7 tasks)
  {
    id: 'task-b1',
    text: 'Send sample level + game rules to Claude',
    track: 'B',
    priority: 'P1',
    date: '2026-10-20',
    displayDate: '20 Oct',
    completed: false
  },
  {
    id: 'task-b2',
    text: 'Level generator + solver ready, first batch of levels',
    track: 'B',
    priority: 'P1',
    date: '2026-10-22',
    displayDate: '22 Oct',
    completed: false
  },
  {
    id: 'task-b3',
    text: 'Hand-tune the first 30 levels (tutorial and easy start)',
    track: 'B',
    priority: 'P1',
    date: '2026-10-25',
    displayDate: '25 Oct',
    completed: false
  },
  {
    id: 'task-b4',
    text: 'Reach 300 levels (generated + playtested)',
    track: 'B',
    priority: 'P1',
    date: '2026-10-30',
    displayDate: '30 Oct',
    completed: false
  },
  {
    id: 'task-b5',
    text: 'Reach 400-500 levels, then freeze content',
    track: 'B',
    priority: 'P1',
    date: '2026-11-01',
    displayDate: '1 Nov',
    completed: false
  },
  {
    id: 'task-b6',
    text: 'Review difficulty curve using tester feedback',
    track: 'B',
    priority: 'P2',
    date: '2026-10-31',
    displayDate: '31 Oct',
    completed: false
  },
  {
    id: 'task-b7',
    text: 'Add daily reward / daily challenge',
    track: 'B',
    priority: 'P2',
    date: '2026-10-30',
    displayDate: '30 Oct',
    completed: false
  },

  // C. ANALYTICS & REWARDED ADS (7 tasks)
  {
    id: 'task-c1',
    text: 'Turn on 2-step verification on both Google accounts',
    track: 'C',
    priority: 'P1',
    date: '2026-10-20',
    displayDate: '20 Oct',
    completed: false
  },
  {
    id: 'task-c2',
    text: 'Create AdMob account and start identity verification',
    track: 'C',
    priority: 'P1',
    date: '2026-10-21',
    displayDate: '21 Oct',
    completed: false
  },
  {
    id: 'task-c3',
    text: 'Add app (unpublished) and create rewarded ad units',
    track: 'C',
    priority: 'P1',
    date: '2026-10-22',
    displayDate: '22 Oct',
    completed: false
  },
  {
    id: 'task-c4',
    text: 'Firebase events: level start/complete/fail, rewarded shown/done',
    track: 'C',
    priority: 'P1',
    date: '2026-10-23',
    displayDate: '23 Oct',
    completed: false
  },
  {
    id: 'task-c5',
    text: 'Integrate rewarded ads: hint, life, skip, x2 reward (TEST IDs only)',
    track: 'C',
    priority: 'P1',
    date: '2026-10-27',
    displayDate: '27 Oct',
    completed: false
  },
  {
    id: 'task-c6',
    text: 'EU/UK consent message (UMP)',
    track: 'C',
    priority: 'P2',
    date: '2026-10-28',
    displayDate: '28 Oct',
    completed: false
  },
  {
    id: 'task-c7',
    text: 'Link AdMob to Firebase; Firebase to Google Ads',
    track: 'C',
    priority: 'P2',
    date: '2026-10-29',
    displayDate: '29 Oct',
    completed: false
  },

  // D. WEBSITE & POLICY (1 task)
  {
    id: 'task-d1',
    text: 'One-page website: privacy policy + app-ads.txt file',
    track: 'D',
    priority: 'P1',
    date: '2026-10-26',
    displayDate: '26 Oct',
    completed: false
  },

  // E. MARKETING PREP (7 tasks)
  {
    id: 'task-e1',
    text: "Create TikTok / Instagram / YouTube accounts, post 'coming soon'",
    track: 'E',
    priority: 'P2',
    date: '2026-10-21',
    displayDate: '21 Oct',
    completed: false
  },
  {
    id: 'task-e2',
    text: 'Record 15 raw gameplay clips',
    track: 'E',
    priority: 'P1',
    date: '2026-10-24',
    displayDate: '24 Oct',
    completed: false
  },
  {
    id: 'task-e3',
    text: 'Scripts + captions for the first 10 videos',
    track: 'E',
    priority: 'P2',
    date: '2026-10-25',
    displayDate: '25 Oct',
    completed: false
  },
  {
    id: 'task-e4',
    text: 'Edit and post 1 video per day',
    track: 'E',
    priority: 'P2',
    date: '2026-11-02',
    displayDate: '27 Oct - 2 Nov',
    startDate: '2026-10-27',
    completed: false
  },
  {
    id: 'task-e5',
    text: 'Keywords + store listing text in 5-10 languages',
    track: 'E',
    priority: 'P2',
    date: '2026-10-30',
    displayDate: '30 Oct',
    completed: false
  },
  {
    id: 'task-e6',
    text: 'List 20 puzzle creators and communities to contact',
    track: 'E',
    priority: 'P3',
    date: '2026-10-31',
    displayDate: '31 Oct',
    completed: false
  },
  {
    id: 'task-e7',
    text: 'Prepare 10 gameplay video ads for Google Ads',
    track: 'E',
    priority: 'P3',
    date: '2026-11-01',
    displayDate: '1 Nov',
    completed: false
  },

  // F. ACCOUNTS & LEGAL (2 tasks)
  {
    id: 'task-f1',
    text: 'Written agreement with friend about the Play Console account',
    track: 'F',
    priority: 'P2',
    date: '2026-10-25',
    displayDate: '25 Oct',
    completed: false
  },
  {
    id: 'task-f2',
    text: 'Start business registration + D-U-N-S request',
    track: 'F',
    priority: 'P3',
    date: '2026-11-02',
    displayDate: '2 Nov',
    completed: false
  }
];

// ---------------------------------------------------------------------------
// 2. Application State
// ---------------------------------------------------------------------------
let tasks = [];
let currentView = 'calendar'; // 'calendar' | 'timeline' | 'priority' | 'track' | 'all'
let filterPriority = 'all';  // 'all' | 'P1' | 'P2' | 'P3'
let filterTrack = 'all';     // 'all' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
let filterStatus = 'all';    // 'all' | 'active' | 'completed'
let searchQuery = '';
let sortMode = 'date-asc';   // 'date-asc' | 'date-desc' | 'priority-p1' | 'track-az'

// Calendar State
let calendarYear = 2026;
let calendarMonth = 9; // 0-indexed: 9 = October 2026
let selectedCalendarDate = '2026-10-24'; // Default to an active day

// ---------------------------------------------------------------------------
// 3. DOM Elements Selection
// ---------------------------------------------------------------------------
// Header & Themes
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const resetPlanBtn = document.getElementById('resetPlanBtn');
const quickAddBtn = document.getElementById('quickAddBtn');

// Dashboard Elements
const overallPercent = document.getElementById('overallPercent');
const overallTasksCount = document.getElementById('overallTasksCount');
const overallProgressBar = document.getElementById('overallProgressBar');
const circleProgressPath = document.getElementById('circleProgressPath');
const launchStatusQuote = document.getElementById('launchStatusQuote');

const p1ProgressBar = document.getElementById('p1ProgressBar');
const p1CountBadge = document.getElementById('p1CountBadge');
const p2ProgressBar = document.getElementById('p2ProgressBar');
const p2CountBadge = document.getElementById('p2CountBadge');
const p3ProgressBar = document.getElementById('p3ProgressBar');
const p3CountBadge = document.getElementById('p3CountBadge');

const sprintDayBadge = document.getElementById('sprintDayBadge');
const quickSprintDays = document.getElementById('quickSprintDays');
const nextMilestoneTitle = document.getElementById('nextMilestoneTitle');
const nextMilestoneDesc = document.getElementById('nextMilestoneDesc');

// Toolbar Elements
const viewTabs = document.querySelectorAll('.view-tab');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const priorityChips = document.querySelectorAll('.chip-filter');
const trackFilterSelect = document.getElementById('trackFilterSelect');
const statusFilterSelect = document.getElementById('statusFilterSelect');
const sortSelect = document.getElementById('sortSelect');
const filterBanner = document.getElementById('filterBanner');
const filterBannerText = document.getElementById('filterBannerText');
const clearDateFilterBtn = document.getElementById('clearDateFilterBtn');

// Priority Chips Counts
const chipAllCount = document.getElementById('chipAllCount');
const chipP1Count = document.getElementById('chipP1Count');
const chipP2Count = document.getElementById('chipP2Count');
const chipP3Count = document.getElementById('chipP3Count');

// View Panels
const viewCalendar = document.getElementById('viewCalendar');
const viewTimeline = document.getElementById('viewTimeline');
const viewPriority = document.getElementById('viewPriority');
const viewTrack = document.getElementById('viewTrack');
const viewAll = document.getElementById('viewAll');
const noMatchEmptyState = document.getElementById('noMatchEmptyState');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');

// Calendar View DOM
const calendarMonthTitle = document.getElementById('calendarMonthTitle');
const calendarDaysGrid = document.getElementById('calendarDaysGrid');
const prevMonthBtn = document.getElementById('prevMonthBtn');
const nextMonthBtn = document.getElementById('nextMonthBtn');
const launchWindowBtn = document.getElementById('launchWindowBtn');
const selectedDayHeading = document.getElementById('selectedDayHeading');
const selectedDayCount = document.getElementById('selectedDayCount');
const selectedDayTaskList = document.getElementById('selectedDayTaskList');
const addTaskForSelectedDayBtn = document.getElementById('addTaskForSelectedDayBtn');

// Timeline, Priority, Track, Master List DOM
const timelineContainer = document.getElementById('timelineContainer');
const p1TaskList = document.getElementById('p1TaskList');
const p2TaskList = document.getElementById('p2TaskList');
const p3TaskList = document.getElementById('p3TaskList');
const p1BoardCount = document.getElementById('p1BoardCount');
const p2BoardCount = document.getElementById('p2BoardCount');
const p3BoardCount = document.getElementById('p3BoardCount');
const trackSectionsContainer = document.getElementById('trackSectionsContainer');
const masterTaskList = document.getElementById('masterTaskList');
const masterListSubtitle = document.getElementById('masterListSubtitle');
const clearCompletedAllBtn = document.getElementById('clearCompletedAllBtn');

// Modal DOM
const taskModal = document.getElementById('taskModal');
const modalTitle = document.getElementById('modalTitle');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const modalTaskForm = document.getElementById('modalTaskForm');
const modalTaskId = document.getElementById('modalTaskId');
const modalTaskText = document.getElementById('modalTaskText');
const modalTextError = document.getElementById('modalTextError');
const modalTrackSelect = document.getElementById('modalTrackSelect');
const modalDateInput = document.getElementById('modalDateInput');
const modalDisplayDateInput = document.getElementById('modalDisplayDateInput');
const quickDateChips = document.getElementById('quickDateChips');

// Footer & Utilities
const toastContainer = document.getElementById('toastContainer');
const exportJsonBtn = document.getElementById('exportJsonBtn');
const importJsonBtn = document.getElementById('importJsonBtn');
const importFileInput = document.getElementById('importFileInput');
const printPlanBtn = document.getElementById('printPlanBtn');

// ---------------------------------------------------------------------------
// 4. Initialization & Storage
// ---------------------------------------------------------------------------
function initApp() {
  loadTheme();
  loadTasks();
  buildSprintDaySelector();
  setupEventListeners();
  renderApp();
}

function loadTheme() {
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

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  applyTheme(isDark ? 'light' : 'dark');
}

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY_TASKS);
  if (stored) {
    try {
      tasks = JSON.parse(stored);
    } catch (e) {
      console.error('Error loading tasks:', e);
      tasks = JSON.parse(JSON.stringify(DEFAULT_LAUNCH_PLAN_TASKS));
    }
  } else {
    tasks = JSON.parse(JSON.stringify(DEFAULT_LAUNCH_PLAN_TASKS));
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
}

function resetToDefaultPlan() {
  const confirmed = confirm('Are you sure you want to reset all tasks to the original 14-day Launch Plan (29 tasks)? Any custom additions will be replaced.');
  if (confirmed) {
    tasks = JSON.parse(JSON.stringify(DEFAULT_LAUNCH_PLAN_TASKS));
    saveTasks();
    showToast('Plan reset to original 14-day checklist! 🏹', 'info');
    renderApp();
  }
}

// ---------------------------------------------------------------------------
// 5. Sprint Days Quick Selector Bar (19 Oct - 2 Nov)
// ---------------------------------------------------------------------------
function buildSprintDaySelector() {
  quickSprintDays.innerHTML = '';
  // 19 Oct to 2 Nov 2026: 15 dates total
  const startDate = new Date(2026, 9, 19); // Oct 19, 2026
  for (let i = 0; i <= 14; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    const iso = formatDateISO(d);
    const dayNum = d.getDate();
    const monthShort = d.toLocaleString('en-US', { month: 'short' });
    const isCheckpoint = CHECKPOINTS.some(c => c.date === iso);

    const btn = document.createElement('button');
    btn.className = `sprint-day-chip ${isCheckpoint ? 'checkpoint-day' : ''}`;
    btn.setAttribute('data-date', iso);
    btn.innerHTML = `${dayNum} ${monthShort}`;
    btn.title = `Day ${i + 1} (${dayNum} ${monthShort}) ${isCheckpoint ? '★ Milestone' : ''}`;

    btn.addEventListener('click', () => {
      selectedCalendarDate = iso;
      calendarYear = d.getFullYear();
      calendarMonth = d.getMonth();
      showDateFilterBanner(iso);
      renderApp();
    });

    quickSprintDays.appendChild(btn);
  }
}

// ---------------------------------------------------------------------------
// 6. Metrics & Progress Calculation
// ---------------------------------------------------------------------------
function updateMetrics() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const overallPct = total === 0 ? 0 : Math.round((completed / total) * 100);

  overallPercent.textContent = `${overallPct}%`;
  overallTasksCount.textContent = `${completed} of ${total} completed`;
  overallProgressBar.style.width = `${overallPct}%`;

  // Circular progress SVG calculation (dasharray max 100)
  circleProgressPath.setAttribute('stroke-dasharray', `${overallPct}, 100`);

  // P1, P2, P3 Stats
  const p1Tasks = tasks.filter(t => t.priority === 'P1');
  const p1Done = p1Tasks.filter(t => t.completed).length;
  const p1Pct = p1Tasks.length === 0 ? 0 : Math.round((p1Done / p1Tasks.length) * 100);
  p1CountBadge.textContent = `${p1Done}/${p1Tasks.length}`;
  p1ProgressBar.style.width = `${p1Pct}%`;

  const p2Tasks = tasks.filter(t => t.priority === 'P2');
  const p2Done = p2Tasks.filter(t => t.completed).length;
  const p2Pct = p2Tasks.length === 0 ? 0 : Math.round((p2Done / p2Tasks.length) * 100);
  p2CountBadge.textContent = `${p2Done}/${p2Tasks.length}`;
  p2ProgressBar.style.width = `${p2Pct}%`;

  const p3Tasks = tasks.filter(t => t.priority === 'P3');
  const p3Done = p3Tasks.filter(t => t.completed).length;
  const p3Pct = p3Tasks.length === 0 ? 0 : Math.round((p3Done / p3Tasks.length) * 100);
  p3CountBadge.textContent = `${p3Done}/${p3Tasks.length}`;
  p3ProgressBar.style.width = `${p3Pct}%`;

  // Update Toolbar Badges
  chipAllCount.textContent = total;
  chipP1Count.textContent = p1Tasks.length;
  chipP2Count.textContent = p2Tasks.length;
  chipP3Count.textContent = p3Tasks.length;

  p1BoardCount.textContent = `${p1Done}/${p1Tasks.length} done`;
  p2BoardCount.textContent = `${p2Done}/${p2Tasks.length} done`;
  p3BoardCount.textContent = `${p3Done}/${p3Tasks.length} done`;

  // Motivational quote based on P1 blockers
  const remainingP1 = p1Tasks.length - p1Done;
  if (completed === total && total > 0) {
    launchStatusQuote.textContent = '🚀 Phenomenal! 100% of launch requirements completed! Ready for 1M downloads!';
  } else if (remainingP1 === 0 && p1Tasks.length > 0) {
    launchStatusQuote.textContent = '✨ All P1 Must-Dos complete! Your app is safe to apply for production!';
  } else if (remainingP1 > 0) {
    launchStatusQuote.textContent = `🎯 ${remainingP1} critical P1 blocker${remainingP1 > 1 ? 's' : ''} left before production submission.`;
  } else {
    launchStatusQuote.textContent = 'Keep your tester cohort active & opt-in intact!';
  }

  // Update Sprint Countdown Day
  const today = new Date();
  const sprintStart = new Date(2026, 9, 19);
  const sprintEnd = new Date(2026, 10, 2);
  const diffDays = Math.ceil((today - sprintStart) / (1000 * 60 * 60 * 24));
  if (diffDays >= 1 && diffDays <= 14) {
    sprintDayBadge.textContent = `Day ${diffDays} of 14`;
  } else if (diffDays > 14) {
    sprintDayBadge.textContent = `Post-Sprint`;
  } else {
    sprintDayBadge.textContent = `Day 1 of 14`;
  }

  // Next Milestone determination
  const nextCheckpoint = CHECKPOINTS.find(c => {
    return tasks.some(t => t.date === c.date && !t.completed);
  }) || CHECKPOINTS[0];

  if (nextCheckpoint) {
    const formatted = formatDisplayDate(nextCheckpoint.date);
    nextMilestoneTitle.textContent = `Upcoming: ${nextCheckpoint.title}`;
    nextMilestoneDesc.textContent = `${formatted}: ${nextCheckpoint.desc}`;
  }

  // Update active chip in Sprint Day Bar
  const chips = quickSprintDays.querySelectorAll('.sprint-day-chip');
  chips.forEach(c => {
    if (c.getAttribute('data-date') === selectedCalendarDate) {
      c.classList.add('active');
    } else {
      c.classList.remove('active');
    }
  });
}

// ---------------------------------------------------------------------------
// 7. Filtering & Sorting Logic
// ---------------------------------------------------------------------------
function getFilteredTasks() {
  return tasks.filter(task => {
    // Priority Filter
    if (filterPriority !== 'all' && task.priority !== filterPriority) {
      return false;
    }
    // Track Filter
    if (filterTrack !== 'all' && task.track !== filterTrack) {
      return false;
    }
    // Status Filter
    if (filterStatus === 'active' && task.completed) {
      return false;
    }
    if (filterStatus === 'completed' && !task.completed) {
      return false;
    }
    // Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const textMatch = task.text.toLowerCase().includes(q);
      const trackMatch = (TRACKS_METADATA[task.track]?.name || '').toLowerCase().includes(q);
      const dateMatch = (task.displayDate || task.date).toLowerCase().includes(q);
      const prioMatch = task.priority.toLowerCase().includes(q);
      if (!textMatch && !trackMatch && !dateMatch && !prioMatch) {
        return false;
      }
    }
    return true;
  }).sort(sortComparator);
}

function sortComparator(a, b) {
  if (sortMode === 'date-asc') {
    return a.date.localeCompare(b.date);
  }
  if (sortMode === 'date-desc') {
    return b.date.localeCompare(a.date);
  }
  if (sortMode === 'priority-p1') {
    const order = { P1: 1, P2: 2, P3: 3 };
    const pDiff = (order[a.priority] || 4) - (order[b.priority] || 4);
    if (pDiff !== 0) return pDiff;
    return a.date.localeCompare(b.date);
  }
  if (sortMode === 'track-az') {
    const tDiff = a.track.localeCompare(b.track);
    if (tDiff !== 0) return tDiff;
    return a.date.localeCompare(b.date);
  }
  return 0;
}

// ---------------------------------------------------------------------------
// 8. Main Render Function
// ---------------------------------------------------------------------------
function renderApp() {
  updateMetrics();

  const filteredTasks = getFilteredTasks();

  // Handle Global Empty Filter State
  if (filteredTasks.length === 0 && tasks.length > 0) {
    noMatchEmptyState.style.display = 'flex';
  } else {
    noMatchEmptyState.style.display = 'none';
  }

  // Render the currently active View panel
  if (currentView === 'calendar') {
    renderCalendarView(filteredTasks);
  } else if (currentView === 'timeline') {
    renderTimelineView(filteredTasks);
  } else if (currentView === 'priority') {
    renderPriorityView(filteredTasks);
  } else if (currentView === 'track') {
    renderTrackView(filteredTasks);
  } else if (currentView === 'all') {
    renderMasterListView(filteredTasks);
  }
}

// ---------------------------------------------------------------------------
// 9. View 1: Calendar View Rendering
// ---------------------------------------------------------------------------
function renderCalendarView(filteredTasks) {
  // Update Month Header
  const dateObj = new Date(calendarYear, calendarMonth, 1);
  const monthName = dateObj.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  calendarMonthTitle.textContent = monthName;

  calendarDaysGrid.innerHTML = '';

  const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();
  // Adjust so Monday is 0, Sunday is 6
  const startOffset = (firstDayIndex + 6) % 7;

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const prevMonthDays = new Date(calendarYear, calendarMonth, 0).getDate();

  // Days from previous month to fill the first row
  for (let x = startOffset; x > 0; x--) {
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell other-month';
    const dayNum = prevMonthDays - x + 1;
    cell.innerHTML = `
      <div class="cal-cell-top">
        <span class="cal-day-number">${dayNum}</span>
      </div>
    `;
    calendarDaysGrid.appendChild(cell);
  }

  // Days of current month
  for (let i = 1; i <= daysInMonth; i++) {
    const currentDayDate = new Date(calendarYear, calendarMonth, i);
    const isoDate = formatDateISO(currentDayDate);

    // Is it inside the 14-day launch sprint? (19 Oct to 2 Nov 2026)
    const inSprint = (calendarYear === 2026 && calendarMonth === 9 && i >= 19) ||
                     (calendarYear === 2026 && calendarMonth === 10 && i <= 2);

    // Tasks on this day (from all tasks or filtered)
    const dayTasks = tasks.filter(t => t.date === isoDate);
    const dayFilteredTasks = filteredTasks.filter(t => t.date === isoDate);

    const isCheckpoint = CHECKPOINTS.find(c => c.date === isoDate);
    const isSelected = selectedCalendarDate === isoDate;

    const cell = document.createElement('div');
    let cellClasses = 'cal-day-cell';
    if (inSprint) cellClasses += ' in-sprint';
    if (dayTasks.length > 0) cellClasses += ' has-tasks';
    if (isSelected) cellClasses += ' selected';
    if (isCheckpoint) cellClasses += ' checkpoint-day';

    // Dots for priorities
    let dotsHtml = '';
    const hasP1 = dayTasks.some(t => t.priority === 'P1');
    const hasP2 = dayTasks.some(t => t.priority === 'P2');
    const hasP3 = dayTasks.some(t => t.priority === 'P3');

    if (hasP1) dotsHtml += '<span class="cal-dot dot-p1" title="P1 Tasks"></span>';
    if (hasP2) dotsHtml += '<span class="cal-dot dot-p2" title="P2 Tasks"></span>';
    if (hasP3) dotsHtml += '<span class="cal-dot dot-p3" title="P3 Tasks"></span>';

    const flagHtml = isCheckpoint ? `<span class="cal-day-checkpoint-flag" title="${isCheckpoint.title}">🚩</span>` : '';
    const taskBadgeHtml = dayTasks.length > 0 ? `<span class="cal-cell-badge">${dayTasks.length} task${dayTasks.length > 1 ? 's' : ''}</span>` : '';

    cell.className = cellClasses;
    cell.setAttribute('data-date', isoDate);

    cell.innerHTML = `
      <div class="cal-cell-top">
        <span class="cal-day-number">${i}</span>
        ${flagHtml}
      </div>
      <div class="cal-cell-dots">
        ${dotsHtml}
      </div>
      ${taskBadgeHtml}
    `;

    // Click on date to select it and update focus panel
    cell.addEventListener('click', () => {
      selectedCalendarDate = isoDate;
      renderCalendarView(filteredTasks);
      showDateFilterBanner(isoDate);
    });

    calendarDaysGrid.appendChild(cell);
  }

  // Days from next month to fill remaining grid cells to complete week
  const totalCells = startOffset + daysInMonth;
  const remainingCells = (7 - (totalCells % 7)) % 7;
  for (let j = 1; j <= remainingCells; j++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day-cell other-month';
    cell.innerHTML = `
      <div class="cal-cell-top">
        <span class="cal-day-number">${j}</span>
      </div>
    `;
    calendarDaysGrid.appendChild(cell);
  }

  // Render Selected Day Focus Panel
  renderSelectedDayPanel(filteredTasks);
}

function renderSelectedDayPanel(filteredTasks) {
  if (!selectedCalendarDate) {
    selectedCalendarDate = '2026-10-24';
  }

  const dateParts = selectedCalendarDate.split('-');
  const d = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
  const fullDateText = d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

  selectedDayHeading.textContent = fullDateText;

  const checkpointForDay = CHECKPOINTS.find(c => c.date === selectedCalendarDate);
  const tasksForDay = filteredTasks.filter(t => t.date === selectedCalendarDate);

  if (checkpointForDay) {
    selectedDayHeading.innerHTML = `${fullDateText} <span class="badge p2-badge" style="font-size:0.75rem; vertical-align:middle;">🚩 ${checkpointForDay.title}</span>`;
  }

  selectedDayCount.textContent = `${tasksForDay.length} task${tasksForDay.length === 1 ? '' : 's'} scheduled`;

  selectedDayTaskList.innerHTML = '';
  if (tasksForDay.length === 0) {
    selectedDayTaskList.innerHTML = `
      <li class="empty-state" style="padding: 24px 16px; border: 1px dashed var(--bg-border);">
        <span style="font-size: 1.6rem;">📅</span>
        <p style="font-size: 0.85rem; margin-top: 4px;">No tasks scheduled for ${fullDateText}.</p>
      </li>
    `;
  } else {
    tasksForDay.forEach(task => {
      selectedDayTaskList.appendChild(createTaskElement(task));
    });
  }
}

// ---------------------------------------------------------------------------
// 10. View 2: Timeline / Day-by-Day Agenda
// ---------------------------------------------------------------------------
function renderTimelineView(filteredTasks) {
  timelineContainer.innerHTML = '';

  // Get all unique dates from the tasks, sorted ascending
  const allDates = Array.from(new Set(tasks.map(t => t.date))).sort();

  if (allDates.length === 0) {
    timelineContainer.innerHTML = '<p class="empty-state">No timeline dates available.</p>';
    return;
  }

  allDates.forEach((dateStr, idx) => {
    const dayTasks = filteredTasks.filter(t => t.date === dateStr);
    const checkpoint = CHECKPOINTS.find(c => c.date === dateStr);

    // Skip showing empty days in timeline if search/priority filter active
    if (dayTasks.length === 0 && (searchQuery || filterPriority !== 'all' || filterTrack !== 'all')) {
      return;
    }

    const dateParts = dateStr.split('-');
    const d = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
    const dayFormatted = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    const block = document.createElement('div');
    block.className = 'timeline-day-block';

    let checkpointHtml = '';
    if (checkpoint) {
      checkpointHtml = `
        <div class="timeline-checkpoint-alert">
          <span>🚩</span>
          <strong>MILESTONE:</strong> ${checkpoint.title} — ${checkpoint.desc}
        </div>
      `;
    }

    block.innerHTML = `
      <div class="timeline-day-header">
        <div class="timeline-date-title">
          <span class="timeline-date-circle">${dayFormatted}</span>
          <h3 class="timeline-day-name">${dayName}</h3>
        </div>
        <span class="badge" style="background:var(--bg-muted); color:var(--text-secondary);">${dayTasks.length} task${dayTasks.length !== 1 ? 's' : ''}</span>
      </div>
      ${checkpointHtml}
      <ul class="task-list day-task-list"></ul>
    `;

    const ul = block.querySelector('.day-task-list');
    if (dayTasks.length === 0) {
      ul.innerHTML = `<li style="font-size:0.8rem; color:var(--text-muted); font-style:italic;">No tasks match the active filters for this day.</li>`;
    } else {
      dayTasks.forEach(task => {
        ul.appendChild(createTaskElement(task));
      });
    }

    timelineContainer.appendChild(block);
  });
}

// ---------------------------------------------------------------------------
// 11. View 3: Priority Boards (P1, P2, P3)
// ---------------------------------------------------------------------------
function renderPriorityView(filteredTasks) {
  p1TaskList.innerHTML = '';
  p2TaskList.innerHTML = '';
  p3TaskList.innerHTML = '';

  const p1Items = filteredTasks.filter(t => t.priority === 'P1');
  const p2Items = filteredTasks.filter(t => t.priority === 'P2');
  const p3Items = filteredTasks.filter(t => t.priority === 'P3');

  if (p1Items.length === 0) {
    p1TaskList.innerHTML = '<li class="empty-state" style="padding:16px;">No P1 tasks</li>';
  } else {
    p1Items.forEach(t => p1TaskList.appendChild(createTaskElement(t)));
  }

  if (p2Items.length === 0) {
    p2TaskList.innerHTML = '<li class="empty-state" style="padding:16px;">No P2 tasks</li>';
  } else {
    p2Items.forEach(t => p2TaskList.appendChild(createTaskElement(t)));
  }

  if (p3Items.length === 0) {
    p3TaskList.innerHTML = '<li class="empty-state" style="padding:16px;">No P3 tasks</li>';
  } else {
    p3Items.forEach(t => p3TaskList.appendChild(createTaskElement(t)));
  }
}

// ---------------------------------------------------------------------------
// 12. View 4: Track / Category View (A to F)
// ---------------------------------------------------------------------------
function renderTrackView(filteredTasks) {
  trackSectionsContainer.innerHTML = '';

  const trackKeys = ['A', 'B', 'C', 'D', 'E', 'F'];

  trackKeys.forEach(trackKey => {
    // If a track filter is active, skip other tracks
    if (filterTrack !== 'all' && filterTrack !== trackKey) return;

    const meta = TRACKS_METADATA[trackKey];
    const trackTasks = filteredTasks.filter(t => t.track === trackKey);
    const completedCount = trackTasks.filter(t => t.completed).length;

    const trackCard = document.createElement('div');
    trackCard.className = 'track-card';

    trackCard.innerHTML = `
      <div class="track-header-banner track-${trackKey}">
        <div class="track-header-title">
          <span>${trackKey}.</span>
          <span>${meta.name.toUpperCase()}</span>
        </div>
        <span class="track-task-count">${completedCount}/${trackTasks.length} Done</span>
      </div>
      <div class="track-body">
        <ul class="task-list track-tasks-list"></ul>
      </div>
    `;

    const ul = trackCard.querySelector('.track-tasks-list');
    if (trackTasks.length === 0) {
      ul.innerHTML = `<li style="font-size:0.8rem; color:var(--text-muted); font-style:italic;">No tasks matching active filters in Track ${trackKey}.</li>`;
    } else {
      trackTasks.forEach(task => {
        ul.appendChild(createTaskElement(task));
      });
    }

    trackSectionsContainer.appendChild(trackCard);
  });
}

// ---------------------------------------------------------------------------
// 13. View 5: Master All Tasks List
// ---------------------------------------------------------------------------
function renderMasterListView(filteredTasks) {
  masterTaskList.innerHTML = '';
  masterListSubtitle.textContent = `Displaying ${filteredTasks.length} of ${tasks.length} total launch plan items`;

  if (filteredTasks.length === 0) {
    masterTaskList.innerHTML = '<li class="empty-state">No tasks to display.</li>';
    return;
  }

  filteredTasks.forEach(task => {
    masterTaskList.appendChild(createTaskElement(task));
  });
}

// ---------------------------------------------------------------------------
// 14. Task Element Builder (Reusable across all views)
// ---------------------------------------------------------------------------
function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = `task-item ${task.completed ? 'completed' : ''}`;
  li.setAttribute('data-id', task.id);

  const trackMeta = TRACKS_METADATA[task.track] || { name: task.track, code: task.track };
  const prioClass = `${task.priority.toLowerCase()}-badge`;
  const prioTitle = task.priority === 'P1' ? 'Must do (Blocker)' : task.priority === 'P2' ? 'Should do' : 'Nice to have';

  li.innerHTML = `
    <label class="task-checkbox-label" title="${task.completed ? 'Mark incomplete' : 'Mark completed'}">
      <input type="checkbox" class="task-checkbox-input" ${task.completed ? 'checked' : ''} aria-label="Toggle task completion">
      <span class="custom-checkbox"></span>
    </label>

    <div class="task-content">
      <span class="task-text">${escapeHtml(task.text)}</span>
      <div class="task-meta-row">
        <!-- Clickable priority badge to quickly cycle priority -->
        <span class="badge ${prioClass} clickable-priority" title="Click to cycle priority (${prioTitle})">
          ${task.priority} ${task.priority === 'P1' ? 'Must do' : task.priority === 'P2' ? 'Should do' : 'Nice to have'}
        </span>
        <span class="task-track-pill track-pill-${task.track}">
          ${task.track}. ${trackMeta.name}
        </span>
        <span class="task-date-pill">
          📅 ${task.displayDate || formatDisplayDate(task.date)}
        </span>
      </div>
    </div>

    <div class="task-actions">
      <button class="task-btn edit-btn" title="Edit Task" aria-label="Edit Task">✏️</button>
      <button class="task-btn delete-btn" title="Delete Task" aria-label="Delete Task">🗑️</button>
    </div>
  `;

  // Checkbox Event
  const checkbox = li.querySelector('.task-checkbox-input');
  checkbox.addEventListener('change', () => {
    toggleTaskCompleted(task.id);
  });

  // Cycle Priority on badge click (P1 -> P2 -> P3 -> P1)
  const priorityBadge = li.querySelector('.clickable-priority');
  priorityBadge.addEventListener('click', (e) => {
    e.stopPropagation();
    cycleTaskPriority(task.id);
  });

  // Edit Button Event
  const editBtn = li.querySelector('.edit-btn');
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openEditModal(task);
  });

  // Delete Button Event
  const deleteBtn = li.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  });

  return li;
}

// ---------------------------------------------------------------------------
// 15. Task Actions (Toggle, Priority Cycle, Delete, Add, Edit)
// ---------------------------------------------------------------------------
function toggleTaskCompleted(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  task.completed = !task.completed;
  saveTasks();
  renderApp();

  if (task.completed) {
    showToast(`✓ Completed: "${task.text.substring(0, 32)}..."`, 'success');
  }
}

function cycleTaskPriority(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  const nextPriority = { P1: 'P2', P2: 'P3', P3: 'P1' };
  task.priority = nextPriority[task.priority] || 'P1';
  saveTasks();
  renderApp();
  showToast(`Updated to ${task.priority}`, 'info');
}

function deleteTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  const confirmed = confirm(`Are you sure you want to remove this task?\n\n"${task.text}"`);
  if (!confirmed) return;

  tasks = tasks.filter(t => t.id !== taskId);
  saveTasks();
  renderApp();
  showToast('Task removed', 'info');
}

function clearCompletedTasks() {
  const count = tasks.filter(t => t.completed).length;
  if (count === 0) {
    showToast('No completed tasks to clear', 'info');
    return;
  }
  const confirmed = confirm(`Remove all ${count} completed task(s)?`);
  if (confirmed) {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderApp();
    showToast(`Cleared ${count} completed task(s)`, 'success');
  }
}

// ---------------------------------------------------------------------------
// 16. Modal Dialog Handlers (Add & Edit)
// ---------------------------------------------------------------------------
function openAddModal(defaultDate = null) {
  modalTitle.textContent = 'Add New Launch Task';
  modalTaskId.value = '';
  modalTaskText.value = '';
  modalTextError.textContent = '';
  modalTrackSelect.value = 'A';
  modalDisplayDateInput.value = '';

  const prioRadio = document.querySelector('input[name="modalPriority"][value="P1"]');
  if (prioRadio) prioRadio.checked = true;

  if (defaultDate) {
    modalDateInput.value = defaultDate;
  } else if (selectedCalendarDate) {
    modalDateInput.value = selectedCalendarDate;
  } else {
    modalDateInput.value = '2026-10-24';
  }

  taskModal.classList.add('show');
  modalTaskText.focus();
}

function openEditModal(task) {
  modalTitle.textContent = 'Edit Launch Task';
  modalTaskId.value = task.id;
  modalTaskText.value = task.text;
  modalTextError.textContent = '';
  modalTrackSelect.value = task.track;
  modalDateInput.value = task.date;
  modalDisplayDateInput.value = task.displayDate || '';

  const prioRadio = document.querySelector(`input[name="modalPriority"][value="${task.priority}"]`);
  if (prioRadio) prioRadio.checked = true;

  taskModal.classList.add('show');
  modalTaskText.focus();
}

function closeModal() {
  taskModal.classList.remove('show');
}

modalTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const text = modalTaskText.value.trim();
  if (!text) {
    modalTextError.textContent = 'Please enter a task description';
    modalTaskText.focus();
    return;
  }

  const selectedPriority = document.querySelector('input[name="modalPriority"]:checked')?.value || 'P1';
  const track = modalTrackSelect.value;
  const date = modalDateInput.value;
  const customDisplay = modalDisplayDateInput.value.trim();

  const existingId = modalTaskId.value;
  if (existingId) {
    // Update existing task
    const task = tasks.find(t => t.id === existingId);
    if (task) {
      task.text = text;
      task.priority = selectedPriority;
      task.track = track;
      task.date = date;
      task.displayDate = customDisplay || formatDisplayDate(date);
    }
    showToast('Task updated successfully', 'success');
  } else {
    // Add new task
    const newTask = {
      id: 'task-' + Date.now(),
      text: text,
      track: track,
      priority: selectedPriority,
      date: date,
      displayDate: customDisplay || formatDisplayDate(date),
      completed: false
    };
    tasks.unshift(newTask);
    showToast('New launch task created', 'success');
  }

  saveTasks();
  closeModal();
  renderApp();
});

// ---------------------------------------------------------------------------
// 17. Filter Banner & Date Filter Management
// ---------------------------------------------------------------------------
function showDateFilterBanner(dateStr) {
  filterBanner.style.display = 'flex';
  const formatted = formatDisplayDate(dateStr);
  const taskCount = tasks.filter(t => t.date === dateStr).length;
  filterBannerText.textContent = `Showing tasks for ${formatted} (${taskCount} scheduled)`;
}

function clearDateFilter() {
  filterBanner.style.display = 'none';
  selectedCalendarDate = null;
  renderApp();
}

// ---------------------------------------------------------------------------
// 18. Event Listeners Setup
// ---------------------------------------------------------------------------
function setupEventListeners() {
  // Theme Toggle
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Reset Plan
  resetPlanBtn.addEventListener('click', resetToDefaultPlan);

  // Quick Add Button
  quickAddBtn.addEventListener('click', () => openAddModal());

  // Modal Close & Cancel
  closeModalBtn.addEventListener('click', closeModal);
  cancelModalBtn.addEventListener('click', closeModal);
  taskModal.addEventListener('click', (e) => {
    if (e.target === taskModal) closeModal();
  });

  // Quick Date Chips inside Modal
  quickDateChips.addEventListener('click', (e) => {
    if (e.target.classList.contains('date-chip-btn')) {
      modalDateInput.value = e.target.getAttribute('data-date');
    }
  });

  // View Switcher Tabs
  viewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      viewTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      currentView = tab.getAttribute('data-view');

      // Hide all panels
      document.querySelectorAll('.view-panel').forEach(p => p.classList.remove('active'));

      // Show selected panel
      if (currentView === 'calendar') viewCalendar.classList.add('active');
      if (currentView === 'timeline') viewTimeline.classList.add('active');
      if (currentView === 'priority') viewPriority.classList.add('active');
      if (currentView === 'track') viewTrack.classList.add('active');
      if (currentView === 'all') viewAll.classList.add('active');

      renderApp();
    });
  });

  // Search Input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
    renderApp();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderApp();
  });

  // Priority Chips
  priorityChips.forEach(chip => {
    chip.addEventListener('click', () => {
      priorityChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterPriority = chip.getAttribute('data-priority');
      renderApp();
    });
  });

  // Track Select Filter
  trackFilterSelect.addEventListener('change', (e) => {
    filterTrack = e.target.value;
    renderApp();
  });

  // Status Select Filter
  statusFilterSelect.addEventListener('change', (e) => {
    filterStatus = e.target.value;
    renderApp();
  });

  // Sort Select
  sortSelect.addEventListener('change', (e) => {
    sortMode = e.target.value;
    renderApp();
  });

  // Clear Date Filter
  clearDateFilterBtn.addEventListener('click', clearDateFilter);

  // Reset Filters Empty State
  resetFiltersBtn.addEventListener('click', () => {
    filterPriority = 'all';
    filterTrack = 'all';
    filterStatus = 'all';
    searchQuery = '';
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';

    priorityChips.forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-priority') === 'all');
    });
    trackFilterSelect.value = 'all';
    statusFilterSelect.value = 'all';

    renderApp();
  });

  // Calendar Controls
  prevMonthBtn.addEventListener('click', () => {
    calendarMonth--;
    if (calendarMonth < 0) {
      calendarMonth = 11;
      calendarYear--;
    }
    renderCalendarView(getFilteredTasks());
  });

  nextMonthBtn.addEventListener('click', () => {
    calendarMonth++;
    if (calendarMonth > 11) {
      calendarMonth = 0;
      calendarYear++;
    }
    renderCalendarView(getFilteredTasks());
  });

  launchWindowBtn.addEventListener('click', () => {
    calendarYear = 2026;
    calendarMonth = 9; // October 2026
    selectedCalendarDate = '2026-10-24';
    renderApp();
  });

  addTaskForSelectedDayBtn.addEventListener('click', () => {
    openAddModal(selectedCalendarDate);
  });

  clearCompletedAllBtn.addEventListener('click', clearCompletedTasks);

  // Export JSON
  exportJsonBtn.addEventListener('click', exportTasksJson);

  // Import JSON
  importJsonBtn.addEventListener('click', () => importFileInput.click());
  importFileInput.addEventListener('change', handleImportFile);

  // Print Plan
  printPlanBtn.addEventListener('click', () => window.print());
}

// ---------------------------------------------------------------------------
// 19. Utilities: Date Formats, Toast, Export/Import
// ---------------------------------------------------------------------------
function formatDateISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDisplayDate(isoString) {
  if (!isoString) return '';
  const parts = isoString.split('-');
  if (parts.length !== 3) return isoString;
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  const day = d.getDate();
  const month = d.toLocaleString('en-US', { month: 'short' });
  return `${day} ${month}`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

function exportTasksJson() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(tasks, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `arrow_puzzle_launch_plan_${formatDateISO(new Date())}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Plan exported to JSON file', 'success');
}

function handleImportFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported)) {
        tasks = imported;
        saveTasks();
        renderApp();
        showToast(`Successfully imported ${imported.length} tasks!`, 'success');
      } else {
        alert('Invalid file format. Expected a JSON array of tasks.');
      }
    } catch (err) {
      alert('Error parsing JSON file: ' + err.message);
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// ---------------------------------------------------------------------------
// 20. App Boot
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', initApp);
