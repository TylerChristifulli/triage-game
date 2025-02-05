class Patient {
    constructor(symptoms, mentation, pulse, severity) {
        this.symptoms = symptoms;
        this.mentation = mentation;
        this.pulse = pulse;
        this.severity = severity; // Correct triage category
    }
}

class TriageGame {
    constructor() {
        this.patients = [];
        this.loadPatients();
        this.currentPatientIndex = 0;
        this.score = 0;
        this.timer = 30; // 30-second timer
        this.timerInterval = null;
        this.highScore = localStorage.getItem("highScore") || 0; // Store high score in browser
    }

    loadPatients() {
        this.patients.push(new Patient("Car accident, unconscious, irregular breathing", "Unresponsive", "Abnormal", "Red"));
        this.patients.push(new Patient("Walking with minor cuts, talking normally", "Alert", "Normal", "Green"));
        this.patients.push(new Patient("Severe burns, groaning but responsive to voice", "Voice", "Abnormal", "Yellow"));
        this.patients.push(new Patient("Crushed chest, no pulse, not breathing", "Unresponsive", "Abnormal", "Black"));
    }

    displayPatient() {
        if (this.currentPatientIndex >= this.patients.length) {
            this.currentPatientIndex = 0; // Loop back to the start of patients
        }

        const patient = this.patients[this.currentPatientIndex];
        document.getElementById("patient-info").innerHTML = `
            <p><strong>📝 Symptoms:</strong> ${patient.symptoms}</p>
            <p><strong>🧠 Mentation:</strong> ${patient.mentation}</p>
            <p><strong>❤️ Pulse:</strong> ${patient.pulse}</p>
        `;
    }

    startGame() {
        this.score = 0;
        this.timer = 30;
        this.currentPatientIndex = 0;
        document.getElementById("score").textContent = `Score: ${this.score}`;
        document.getElementById("high-score").textContent = `High Score: ${this.highScore}`;
        this.displayPatient();
        this.startTimer();
    }

    startTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            this.timer--;
            document.getElementById("timer").textContent = `Time Left: ${this.timer}s`;

            if (this.timer <= 0) {
                clearInterval(this.timerInterval);
                this.endGame();
            }
        }, 1000);
    }

    triage(severity) {
        if (this.timer <= 0) return; // Prevent scoring after time runs out

        const patient = this.patients[this.currentPatientIndex];

        if (severity === patient.severity) {
            this.score += 10;
            document.getElementById("score").textContent = `Score: ${this.score}`;
        }

        this.currentPatientIndex++;
        this.displayPatient();
    }

    endGame() {
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem("highScore", this.highScore);
        }

        document.getElementById("patient-info").innerHTML = `<h2>🎉 Time's Up! Final Score: ${this.score}</h2>`;
        document.getElementById("high-score").textContent = `High Score: ${this.highScore}`;
    }
}

const game = new TriageGame();
game.startGame();
