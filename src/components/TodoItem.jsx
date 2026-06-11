const PRIORITY_CONFIG = {
  high: { label: "High", color: "#ef4444", bg: "#fef2f2" },
  medium: { label: "Medium", color: "#f59e0b", bg: "#fffbeb" },
  low: { label: "Low", color: "#22c55e", bg: "#f0fdf4" },
};

const CAT_ICONS = {
  Personal: "👤", Work: "💼", Study: "📚",
  Health: "💪", Shopping: "🛒", Other: "📌",
};

function isOverdue(dueDate) {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

function formatDate(dueDate) {
  if (!dueDate) return null;
  const d = new Date(dueDate);
  const today = new Date(new Date().toDateString());
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
  if (d.getTime() === today.getTime()) return "Today";
  if (d.getTime() === tomorrow.getTime()) return "Tomorrow";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const p = PRIORITY_CONFIG[todo.priority] || PRIORITY_CONFIG.medium;
  const overdue = !todo.completed && isOverdue(todo.dueDate);

  return (
    <div className={`todo-card ${todo.completed ? "done" : ""} ${overdue ? "overdue" : ""}`}>
      <div className="todo-card-left">
        <button
          className={`check-btn ${todo.completed ? "checked" : ""}`}
          onClick={() => onToggle(todo.id, todo.completed)}
        >
          {todo.completed && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>

      <div className="todo-card-body">
        <div className="todo-card-top">
          <span className="todo-text">{todo.text}</span>
          <span
            className="priority-badge"
            style={{ color: p.color, background: p.bg }}
          >
            {p.label}
          </span>
        </div>

        {todo.note && <p className="todo-note">{todo.note}</p>}

        <div className="todo-card-meta">
          {todo.category && (
            <span className="meta-tag">
              {CAT_ICONS[todo.category] || "📌"} {todo.category}
            </span>
          )}
          {todo.dueDate && (
            <span className={`meta-tag due ${overdue ? "overdue-tag" : ""}`}>
              📅 {formatDate(todo.dueDate)}{overdue ? " · Overdue" : ""}
            </span>
          )}
        </div>
      </div>

      <div className="todo-card-actions">
        {!todo.completed && (
          <button className="action-btn edit" onClick={() => onEdit(todo)} title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
        )}
        <button className="action-btn delete" onClick={() => onDelete(todo.id)} title="Delete">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
