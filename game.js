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
        this.highScore = localStorage.getItem("highScore") || 0; // Retrieve stored high score
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
        document.getElementById("timer").textContent = `Time Left: ${this.timer}s`;
        this.displayPatient();
        this.startTimer();
    }

    startTimer() {
        clearInterval(this.timerInterval); // Clear any existing timers
        this.timerInterval = setInterval(() => {
            if (this.timer > 0) {
                this.timer--;
                document.getElementById("timer").textContent = `Time Left: ${this.timer}s`;
            } else {
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
        clearInterval(this.timerInterval); // Stop the timer when the game ends
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem("highScore", this.highScore);
        }

        document.getElementById("patient-info").innerHTML = `<h2>🎉 Time's Up! Final Score: ${this.score}</h2>`;
        document.getElementById("high-score").textContent = `High Score: ${this.highScore}`;
    }
}

// Ensure the game starts when the page loads
window.onload = () => {
    const game = new TriageGame();
    game.startGame();
    window.game = game; // Ensure `game` is accessible globally
};
