import { useState, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "../components/TodoItem";
import AddTaskModal from "../components/AddTaskModal";

const CATEGORIES = ["All", "Personal", "Work", "Study", "Health", "Shopping", "Other"];
const CAT_ICONS = {
  All: "◈", Personal: "👤", Work: "💼", Study: "📚",
  Health: "💪", Shopping: "🛒", Other: "📌",
};

export default function TodoPage({ darkMode, setDarkMode }) {
  const { user, logout } = useAuth();
  const { todos, loading, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleAdd = (data) => addTodo(data);
  const handleEdit = async (data) => {
    await updateTodo(editTask.id, data);
    setEditTask(null);
  };

  const filtered = useMemo(() => {
    return todos.filter((t) => {
      const matchSearch = t.text.toLowerCase().includes(search.toLowerCase()) ||
        (t.note || "").toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || t.category === activeCategory;
      const matchFilter =
        activeFilter === "all" ? true :
        activeFilter === "active" ? !t.completed :
        activeFilter === "completed" ? t.completed :
        activeFilter === "high" ? t.priority === "high" :
        activeFilter === "overdue" ? (!t.completed && t.dueDate && new Date(t.dueDate) < new Date(new Date().toDateString())) : true;
      return matchSearch && matchCat && matchFilter;
    });
  }, [todos, search, activeCategory, activeFilter]);

  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
    high: todos.filter(t => t.priority === "high" && !t.completed).length,
    overdue: todos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date(new Date().toDateString())).length,
  }), [todos]);

  const initials = user?.displayName
    ? user.displayName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0].toUpperCase();

  return (
    <div className="app-shell">
      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-brand">
          <span className="brand-icon-sm">✦</span>
          {sidebarOpen && <span className="brand-text">Taskly</span>}
        </div>

        {sidebarOpen && (
          <>
            <div className="sidebar-section-label">Filters</div>
            {[
              { key: "all", label: "All Tasks", icon: "◈" },
              { key: "active", label: "Active", icon: "⬡" },
              { key: "completed", label: "Completed", icon: "✓" },
              { key: "high", label: "High Priority", icon: "▲" },
              { key: "overdue", label: "Overdue", icon: "⚠" },
            ].map((f) => (
              <button
                key={f.key}
                className={`sidebar-item ${activeFilter === f.key ? "active" : ""}`}
                onClick={() => setActiveFilter(f.key)}
              >
                <span className="si-icon">{f.icon}</span>
                <span className="si-label">{f.label}</span>
                {counts[f.key] > 0 && <span className="si-count">{counts[f.key]}</span>}
              </button>
            ))}

            <div className="sidebar-section-label" style={{ marginTop: 24 }}>Categories</div>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`sidebar-item ${activeCategory === c ? "active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >
                <span className="si-icon">{CAT_ICONS[c]}</span>
                <span className="si-label">{c}</span>
              </button>
            ))}
          </>
        )}

        <div className="sidebar-bottom">
          <button className="sidebar-item" onClick={() => setDarkMode(!darkMode)}>
            <span className="si-icon">{darkMode ? "☀" : "◐"}</span>
            {sidebarOpen && <span className="si-label">{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
          <button className="sidebar-item logout-btn" onClick={logout}>
            <span className="si-icon">⇥</span>
            {sidebarOpen && <span className="si-label">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main-area">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="toggle-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <span /><span /><span />
            </button>
            <div className="search-wrap">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              {search && <button className="search-clear" onClick={() => setSearch("")}>✕</button>}
            </div>
          </div>

          <div className="topbar-right">
            <button className="btn-new-task" onClick={() => setShowModal(true)}>
              <span>+</span> New Task
            </button>
            <div className="avatar" title={user?.email}>{initials}</div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="content">
          <div className="content-header">
            <div>
              <h2 className="page-title">
                {activeFilter === "all" ? "All Tasks" :
                 activeFilter === "active" ? "Active Tasks" :
                 activeFilter === "completed" ? "Completed" :
                 activeFilter === "high" ? "High Priority" : "Overdue"}
                {activeCategory !== "All" && <span className="cat-label"> · {activeCategory}</span>}
              </h2>
              <p className="page-sub">{filtered.length} task{filtered.length !== 1 ? "s" : ""}</p>
            </div>
            <div className="progress-wrap">
              {todos.length > 0 && (
                <>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${Math.round((counts.completed / todos.length) * 100)}%` }}
                    />
                  </div>
                  <span className="progress-label">
                    {Math.round((counts.completed / todos.length) * 100)}% done
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="task-list">
            {loading ? (
              <div className="empty-state">
                <div className="loading-dots"><span/><span/><span/></div>
                <p>Loading your tasks...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  {search ? "🔍" : activeFilter === "completed" ? "🎉" : "✦"}
                </div>
                <p className="empty-title">
                  {search ? "No tasks match your search" :
                   activeFilter === "completed" ? "No completed tasks yet" :
                   "No tasks here"}
                </p>
                <p className="empty-sub">
                  {search ? "Try different keywords" : "Click 'New Task' to add one"}
                </p>
              </div>
            ) : (
              filtered.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={(t) => { setEditTask(t); setShowModal(true); }}
                />
              ))
            )}
          </div>
        </main>
      </div>

      {showModal && (
        <AddTaskModal
          onClose={() => { setShowModal(false); setEditTask(null); }}
          onAdd={editTask ? handleEdit : handleAdd}
          editTask={editTask}
        />
      )}
    </div>
  );
}
