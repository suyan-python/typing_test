const SENTENCES = [
  "The patient was admitted to the hospital with symptoms of fever and fatigue.",
  "Medical records must be reviewed carefully to ensure accuracy and completeness.",
  "The doctor prescribed a course of antibiotics for the infection.",
  "A healthy diet and regular exercise can prevent many chronic diseases.",
  "The nurse recorded the patient vital signs every four hours.",
  "Clinical documentation plays a vital role in quality patient care.",
  "The laboratory results indicated elevated white blood cell counts.",
  "Discharge summaries must include all diagnoses, medications, and follow-up instructions.",
  "The therapist assessed the range of motion of the patient after surgery.",
  "Proper hand hygiene is the most effective way to prevent the spread of infection.",
  "The radiology report showed no signs of internal bleeding.",
  "Progress notes are updated by the physician after each patient visit.",
  "Insurance claims require detailed and accurate medical documentation.",
  "The pharmacist reviewed the prescription before dispensing the medication.",
  "Regular audits help identify gaps in documentation and clinical practice.",
  "The history of diabetes was noted in the patient intake form.",
  "Accurate coding ensures proper reimbursement and compliance with regulations.",
  "The multidisciplinary team met to discuss the care plan for the patient.",
  "Electronic health records have transformed the way medical data is stored.",
  "The surgery was completed successfully with no major complications reported.",
  "Informed consent must be obtained before any invasive procedure is performed.",
  "The attending physician reviewed all test results before making a diagnosis.",
  "Patient confidentiality is a fundamental principle of medical ethics.",
  "The intake coordinator scheduled follow-up appointments for the patient.",
  "Effective communication between departments improves overall patient outcomes.",
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
