import { useState } from "react";

export default function Help({ role }) {
  const admin = role === "admin";
  const [openIndex, setOpenIndex] = useState(0);
  const items = [
    ["View records", "Open Students" + (admin ? " or Teachers" : "") + " from the sidebar. Use View to see full details."],
    ["Add a record", "Click the green Add button, fill in the form, and save. Errors appear under each field."],
    ["Edit or delete", "Use Edit to change a record. Delete asks you to confirm first."],
    ["Search and filter", "Type a name or email in the search box, or pick a class" + (admin ? " or subject" : "") + " from the dropdown."],
    ["Settings", "Update your name, email and preferences on the Settings page."],
  ];
  return (
    <>
      <h2 className="h4 mb-3">{admin ? "Admin" : "Teacher"} help</h2>
      <div className="accordion" style={{ maxWidth: 700 }}>
        {items.map(([title, text], i) => (
          <div className="accordion-item" key={title}>
            <h3 className="accordion-header">
              <button className={`accordion-button ${openIndex === i ? "" : "collapsed"}`} onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>{title}</button>
            </h3>
            {openIndex === i && <div className="accordion-body">{text}</div>}
          </div>
        ))}
      </div>
    </>
  );
}
