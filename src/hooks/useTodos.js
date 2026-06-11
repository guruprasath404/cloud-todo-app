import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, query, where, orderBy, onSnapshot, serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "./useAuth";

export function useTodos() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "todos"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snap) => {
      setTodos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsub;
  }, [user]);

  const addTodo = (data) =>
    addDoc(collection(db, "todos"), {
      ...data,
      completed: false,
      uid: user.uid,
      createdAt: serverTimestamp(),
    });

  const updateTodo = (id, data) => updateDoc(doc(db, "todos", id), data);
  const deleteTodo = (id) => deleteDoc(doc(db, "todos", id));
  const toggleTodo = (id, completed) => updateTodo(id, { completed: !completed });

  return { todos, loading, addTodo, updateTodo, deleteTodo, toggleTodo };
}
