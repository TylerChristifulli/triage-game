class TriageGame {
    constructor() {
        this.patients = [];
        this.loadPatients();
        this.currentPatientIndex = 0;
        this.score = 0;
        this.timer = 30;
        this.timerInterval = null;
        this.highScore = localStorage.getItem("highScore") || 0;
        this.leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    }

    loadPatients() {
        this.patients.push(new Patient("Car accident, unconscious, irregular breathing", "Unresponsive", "Abnormal", "Red"));
        this.patients.push(new Patient("Walking with minor cuts, talking normally", "Alert", "Normal", "Green"));
    }

    startGame() {
        this.score = 0;
        this.timer = 30;
        this.currentPatientIndex = 0;
        document.getElementById("timer").textContent = `Time Left: ${this.timer}s`;
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

    triage(severity) {
        if (this.timer <= 0) return;
        if (severity === this.patients[this.currentPatientIndex].severity) {
            this.score += 10;
            document.getElementById("score").textContent = `Score: ${this.score}`;
        }
        this.currentPatientIndex++;
        this.displayPatient();
    }

    endGame() {
        let playerName = document.getElementById("player-name").value || "Anonymous";
        let percentage = (this.score / 100) * 100;
        this.leaderboard.push({ name: playerName, score: percentage.toFixed(2) + "%" });
        this.leaderboard.sort((a, b) => b.score - a.score);
        localStorage.setItem("leaderboard", JSON.stringify(this.leaderboard));
        
        let leaderboardHTML = `<h2>🏆 Leaderboard</h2>`;
        this.leaderboard.forEach(entry => {
            leaderboardHTML += `<p>${entry.name}: ${entry.score}</p>`;
        });
        document.getElementById("leaderboard").innerHTML = leaderboardHTML;
    }
}

const game = new TriageGame();

