const SENTENCES = [
  "Patients with mild symptoms are advised to rest and stay hydrated.",
  "Vital signs were recorded before the doctor began the examination.",
  "A follow up visit is scheduled to review the patient condition.",
  "Medical staff ensured that all reports were updated correctly.",
  "The doctor reviewed the case and suggested further tests.",
  "Regular monitoring helps track progress during recovery.",
  "The patient reported slight pain after the procedure.",
  "Accurate records are important for effective treatment plans.",
  "A nurse assisted the patient during the routine checkup.",
  "The test results were discussed during the consultation.",
  "Maintaining hygiene reduces the risk of infection in clinics.",
  "The physician explained the next steps in simple terms.",
  "Patient history was checked before starting treatment.",
  "The clinic handled several cases throughout the day.",
  "A quick response helped stabilize the patient condition.",
  "Medical reports were verified before final submission.",
  "The patient showed signs of improvement after medication.",
  "Staff members followed all safety guidelines carefully.",
  "The treatment plan was adjusted based on new findings.",
  "Clear communication improves coordination among teams.",
  "The patient arrived early for the scheduled appointment.",
  "Routine checkups help detect health issues early.",
  "Doctors rely on accurate data for proper diagnosis.",
  "The nurse monitored recovery progress during the shift.",
  "Timely care can prevent complications in many cases.",
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
