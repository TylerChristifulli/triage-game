class Patient {
  constructor(symptoms, mentation, pulse, severity) {
    this.symptoms = symptoms;
    this.mentation = mentation; // Alert, Voice, Pain, Unresponsive
    this.pulse = pulse; // Normal or Abnormal
    this.severity = severity; // Correct triage category (Red, Yellow, Green, Black)
  }
}

class TriageGame {
  constructor() {
    this.patients = [];
    this.loadPatients();
    this.currentPatientIndex = 0;
    this.score = 0;
  }

  loadPatients() {
    this.patients.push(new Patient("Car accident, unconscious, irregular breathing", "Unresponsive", "Abnormal", "Red"));
    this.patients.push(new Patient("Walking with minor cuts, talking normally", "Alert", "Normal", "Green"));
    this.patients.push(new Patient("Severe burns, groaning but responsive to voice", "Voice", "Abnormal", "Yellow"));
    this.patients.push(new Patient("Crushed chest, no pulse, not breathing", "Unresponsive", "Abnormal", "Black"));
  }

  displayPatient() {
    const patient = this.patients[this.currentPatientIndex];
    document.getElementById("patient-info").innerHTML = 
        `<p><strong>Symptoms:</strong> ${patient.symptoms}</p>
         <p><strong>Mentation:</strong> ${patient.mentation}</p>
         <p><strong>Pulse:</strong> ${patient.pulse}</p>`;
  }

  triage(severity) {
    const patient = this.patients[this.currentPatientIndex];
    if (severity === patient.severity) {
      alert("✅ Correct triage!");
      this.score += 10;
    } else {
      alert(`❌ Incorrect! The correct category was ${patient.severity}.`);
    }
    this.currentPatientIndex++;
    if (this.currentPatientIndex < this.patients.length) {
      this.displayPatient();
    } else {
      alert(`🎉 Game Over! Total score: ${this.score}`);
      document.getElementById("patient-info").innerHTML = "<h2>Game Complete!</h2>";
    }
  }
}

const game = new TriageGame();
game.displayPatient();

