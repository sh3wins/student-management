import { createContext, useContext, useState } from "react";
import { initialStudents, initialTeachers } from "../data/sampleData";

const Ctx = createContext();
export const useData = () => useContext(Ctx);

export function DataProvider({ children }) {
  const [students, setStudents] = useState(initialStudents);
  const [teachers, setTeachers] = useState(initialTeachers);
  const setters = { students: setStudents, teachers: setTeachers };

  const add = (kind, item) => setters[kind]((l) => [{ ...item, id: Date.now(), addedOn: new Date().toISOString().slice(0, 10) }, ...l]);
  const update = (kind, id, item) => setters[kind]((l) => l.map((x) => (x.id === id ? { ...x, ...item } : x)));
  const remove = (kind, id) => setters[kind]((l) => l.filter((x) => x.id !== id));

  return <Ctx.Provider value={{ students, teachers, add, update, remove }}>{children}</Ctx.Provider>;
}
