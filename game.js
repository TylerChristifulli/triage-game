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
        this.timer = 30;
        this.timerInterval = null;
        this.playerName = "";
        this.highScore = localStorage.getItem("highScore") || 0;
        this.leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    }

    loadPatients() {
        this.patients.push(new Patient("Car accident, unconscious, irregular breathing", "Unresponsive", "Abnormal", "Red"));
        this.patients.push(new Patient("Walking with minor cuts, talking normally", "Alert", "Normal", "Green"));
        this.patients.push(new Patient("Severe burns, groaning but responsive to voice", "Voice", "Abnormal", "Yellow"));
        this.patients.push(new Patient("Crushed chest, no pulse, not breathing", "Unresponsive", "Abnormal", "Black"));
    }

    startGame() {
        let playerName = document.getElementById("player-name").value.trim();

        if (!playerName) {
            alert("Please enter your name before starting!");
            return;
        }

        this.playerName = playerName; // Store player name

        // Hide the name input and start button after starting
        document.getElementById("player-input").style.display = "none";

        this.score = 0;
        this.timer = 30;
        this.currentPatientIndex = 0;
        
        // Reset UI
        document.getElementById("timer").textContent = `Time Left: ${this.timer}s`;
        document.getElementById("score").textContent = `Score: ${this.score}`;
        document.getElementById("high-score").textContent = `High Score: ${this.highScore}`;
        document.getElementById("leaderboard").innerHTML = ""; // Clear leaderboard display

        this.startTimer();
        this.displayPatient();
    }

    startTimer() {
        clearInterval(this.timerInterval);
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

    displayPatient() {
        if (this.currentPatientIndex >= this.patients.length) {
            this.currentPatientIndex = 0; // Loop back to start of patients
        }

        const patient = this.patients[this.currentPatientIndex];
        document.getElementById("patient-info").innerHTML = `
            <p><strong>📝 Symptoms:</strong> ${patient.symptoms}</p>
            <p><strong>🧠 Mentation:</strong> ${patient.mentation}</p>
            <p><strong>❤️ Pulse:</strong> ${patient.pulse}</p>
        `;
    }

    triage(severity) {
        if (this.timer <= 0) return;

        const patient = this.patients[this.currentPatientIndex];

        if (severity === patient.severity) {
            this.score += 10;
            document.getElementById("score").textContent = `Score: ${this.score}`;
        }

        this.currentPatientIndex++;
        this.displayPatient();
    }

    endGame() {
        clearInterval(this.timerInterval);

        let percentage = (this.score / 100) * 100;

        // Save to leaderboard
        this.leaderboard.push({ name: this.playerName, score: percentage.toFixed(2) + "%" });
        this.leaderboard.sort((a, b) => b.score - a.score);
        localStorage.setItem("leaderboard", JSON.stringify(this.leaderboard));

        // Save high score if it's the best
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem("highScore", this.highScore);
        }

        // Display leaderboard
        let leaderboardHTML = `<h2>🏆 Leaderboard</h2>`;
        this.leaderboard.forEach(entry => {
            leaderboardHTML += `<p>${entry.name}: ${entry.score}</p>`;
        });

        document.getElementById("leaderboard").innerHTML = leaderboardHTML;
        document.getElementById("patient-info").innerHTML = `<h2>🎉 Time's Up! Final Score: ${this.score}</h2>`;
        document.getElementById("high-score").textContent = `High Score: ${this.highScore}`;
        
        // Show the input box and start button again for a new game
        document.getElementById("player-input").style.display = "block";
    }
}

const game = new TriageGame();
window.game = game; // Make game accessible globally
