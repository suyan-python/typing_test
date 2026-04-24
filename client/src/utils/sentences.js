const SENTENCES = [
  "Patients with mild signs should rest and drink enough water.",
  "Vital signs were checked before the exam began.",
  "A follow-up visit is set to review the patient status.",
  "Medical staff updated all reports with care.",
  "The doctor checked the case and advised more tests.",
  "Regular checks help track healing progress.",
  "The patient felt mild pain after the procedure.",
  "Clear records help build better treatment plans.",
  "A nurse helped the patient during a routine check.",
  "Test results were explained during the visit.",
  "Good hygiene lowers the risk of infection.",
  "The doctor explained the next steps clearly.",
  "Patient history was reviewed before treatment.",
  "The clinic managed many cases that day.",
  "Quick action helped stabilize the patient.",
  "Reports were checked before final approval.",
  "The patient improved after taking medicine.",
  "Staff followed all safety rules carefully.",
  "The plan was updated based on new results.",
  "Clear communication helps team coordination.",
  "The patient arrived early for the visit.",
  "Routine exams help find issues early.",
  "Doctors depend on correct data for diagnosis.",
  "The nurse tracked recovery during the shift.",
];

export function buildPassage(minLength = 600) {
  const pool = [...SENTENCES].sort(() => Math.random() - 0.5);
  let text = "";
  while (text.length < minLength) {
    for (const s of pool) {
      text += (text ? " " : "") + s;
      if (text.length >= minLength) break;
    }
  }
  return text.trim();
}
