export const CLASSES = ["Form 1", "Form 2", "Form 3", "Form 4"];
export const SUBJECTS = ["Mathematics", "English", "Science", "History", "Computer Studies"];

const sNames = ["Amina Otieno","Brian Kamau","Cynthia Wanjiru","David Mwangi","Esther Njeri","Felix Ouma","Grace Achieng","Hassan Ali","Irene Chebet","James Kiprop","Kevin Mutua","Lucy Wambui"];
const tNames = ["Mr. Peter Njoroge","Ms. Faith Akinyi","Mr. Daniel Rotich","Mrs. Mary Wafula","Mr. Samuel Kariuki","Ms. Joy Muthoni"];
const mail = (n) => n.replace(/^(Mr|Ms|Mrs)\.\s/, "").split(" ")[0].toLowerCase() + "@brightpath.test";

export const initialStudents = sNames.map((name, i) => ({
  id: i + 1, name, email: mail(name), className: CLASSES[i % 4], grade: ["A", "B", "C"][i % 3],
  phone: "07" + String(10000000 + i * 1111111), addedOn: `2026-09-${String(28 - i).padStart(2, "0")}`,
}));

export const initialTeachers = tNames.map((name, i) => ({
  id: 100 + i, name, email: mail(name), subject: SUBJECTS[i % 5],
  phone: "07" + String(20000000 + i * 1234567), addedOn: `2026-0${1 + i}-15`,
}));

export const KINDS = {
  students: {
    label: "Student", plural: "Students", filterKey: "className", filterOptions: CLASSES, filterLabel: "All classes",
    fields: [["name","Full name","text"],["email","Email","email"],["className","Class","select",CLASSES],["grade","Grade","select",["A","B","C","D"]],["phone","Phone (10 digits)","tel"]],
  },
  teachers: {
    label: "Teacher", plural: "Teachers", filterKey: "subject", filterOptions: SUBJECTS, filterLabel: "All subjects",
    fields: [["name","Full name","text"],["email","Email","email"],["subject","Subject","select",SUBJECTS],["phone","Phone (10 digits)","tel"]],
  },
};
