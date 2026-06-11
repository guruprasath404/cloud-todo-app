import { useState } from "react";

const CATEGORIES = ["Personal", "Work", "Study", "Health", "Shopping", "Other"];
const PRIORITIES = [
  { value: "high", label: "High", color: "#ef4444" },
  { value: "medium", label: "Medium", color: "#f59e0b" },
  { value: "low", label: "Low", color: "#22c55e" },
];

export default function AddTaskModal({ onClose, onAdd, editTask }) {
  const [text, setText] = useState(editTask?.text || "");
  const [priority, setPriority] = useState(editTask?.priority || "medium");
  const [category, setCategory] = useState(editTask?.category || "Personal");
  const [dueDate, setDueDate] = useState(editTask?.dueDate || "");
  const [note, setNote] = useState(editTask?.note || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onAdd({ text: text.trim(), priority, category, dueDate, note });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3>{editTask ? "Edit Task" : "New Task"}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="field">
            <label>Task</label>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label>Priority</label>
              <div className="priority-btns">
                {PRIORITIES.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    className={`priority-btn ${priority === p.value ? "active" : ""}`}
                    style={{ "--pc": p.color }}
                    onClick={() => setPriority(p.value)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div className="field">
            <label>Category</label>
            <div className="category-btns">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`cat-btn ${category === c ? "active" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label>Note <span className="optional">(optional)</span></label>
            <textarea
              placeholder="Any extra details..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-confirm">
              {editTask ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
