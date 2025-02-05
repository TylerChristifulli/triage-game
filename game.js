class Patient {
    constructor(appearance, mentation, pulse, severity) {
        this.appearance = appearance;
        this.mentation = mentation;
        this.pulse = pulse;
        this.severity = severity;
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

        // 🎵 Load arcade music with autoplay fixes
        this.music = new Audio("https://TylerChristifulli.github.io/triage-game/arcade_music.mp3");
        this.music.loop = true;
        this.music.volume = 1.0;
        this.music.muted = false; // Ensure it's not muted
    }

    loadPatients() {
        this.patients = [
            new Patient("Car accident, unconscious, irregular breathing", "Unresponsive", "Abnormal", "Red"),
            new Patient("Severe head injury, GCS 6, irregular breathing", "Unresponsive", "Abnormal", "Red"),
            new Patient("Gunshot wound to the chest, labored breathing, weak pulse", "Unresponsive", "Abnormal", "Red"),
            new Patient("Severe burns over 50% of body, unresponsive", "Unresponsive", "Abnormal", "Red"),
            new Patient("Penetrating abdominal trauma, hypotensive, barely conscious", "Unresponsive", "Abnormal", "Red"),
            new Patient("Femur fracture, alert, strong pulses, unable to walk", "Alert", "Normal", "Yellow"),
            new Patient("Partial-thickness burns over both arms, alert", "Alert", "Normal", "Yellow"),
            new Patient("Open tibia fracture with controlled bleeding, alert", "Alert", "Normal", "Yellow"),
            new Patient("Moderate head injury, confused but responding to voice", "Voice", "Normal", "Yellow"),
            new Patient("Small laceration on hand, no significant bleeding", "Alert", "Normal", "Green"),
            new Patient("Sprained ankle, able to walk with assistance", "Alert", "Normal", "Green"),
            new Patient("Mild concussion, headache but no loss of consciousness", "Alert", "Normal", "Green"),
            new Patient("Superficial burns on forearm, no airway issues", "Alert", "Normal", "Green"),
            new Patient("Bruised ribs, normal vitals, able to walk", "Alert", "Normal", "Green"),
            new Patient("Crushed chest, no pulse, not breathing", "Unresponsive", "No Pulse", "Black"),
            new Patient("Massive head trauma, brain matter exposed, no response", "Unresponsive", "No Pulse", "Black"),
            new Patient("Full cardiac arrest, asystole, no signs of life", "Unresponsive", "No Pulse", "Black"),
            new Patient("Severe burn injuries covering entire body, no response", "Unresponsive", "No Pulse", "Black"),
            new Patient("Hanging victim, no pulse, rigor mortis present", "Unresponsive", "No Pulse", "Black")
        ];
    }

    shufflePatients() {
        for (let i = this.patients.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.patients[i], this.patients[j]] = [this.patients[j], this.patients[i]];
        }
    }

    startGame() {
        let playerName = document.getElementById("player-name").value.trim();

        if (!playerName) {
            alert("Please enter your name before starting!");
            return;
        }

        this.playerName = playerName;

        // Hide the name input and start button
        document.getElementById("player-input").style.display = "none";

        this.score = 0;
        this.timer = 30;
        this.currentPatientIndex = 0;

        // Shuffle patient order for randomness
        this.shufflePatients();

        // Reset UI
        document.getElementById("timer").textContent = `Time Left: ${this.timer}s`;
        document.getElementById("score").textContent = `Score: ${this.score}`;
        document.getElementById("high-score").textContent = `High Score: ${this.highScore}`;
        document.getElementById("leaderboard").innerHTML = "";

        // 🎵 Ensure the music is unmuted and play after user interaction
        this.music.muted = false;
        this.music.volume = 1.0;
        this.music.play().then(() => {
            console.log("Music started successfully! 🎶");
        }).catch(error => {
            console.error("Music play blocked by browser:", error);
            alert("Click anywhere on the page to start the music!");
            
            // Listen for a user interaction and retry
            document.body.addEventListener("click", () => {
                this.music.play();
            }, { once: true });
        });

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
            this.currentPatientIndex = 0;
        }

        const patient = this.patients[this.currentPatientIndex];
        document.getElementById("patient-info").innerHTML = `
            <p style="font-size: 22px; color: #ffcc00;"><strong>📝 Appearance:</strong> ${patient.appearance}</p>
            <p style="font-size: 20px; color: #ff6666;"><strong>🧠 Mentation:</strong> ${patient.mentation}</p>
            <p style="font-size: 20px; color: #66ff66;"><strong>❤️ Pulse:</strong> ${patient.pulse}</p>
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

        this.leaderboard.push({ name: this.playerName, score: percentage.toFixed(2) + "%" });
        this.leaderboard.sort((a, b) => b.score - a.score);
        localStorage.setItem("leaderboard", JSON.stringify(this.leaderboard));

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem("highScore", this.highScore);
        }

        let leaderboardHTML = `<h2>🏆 Leaderboard</h2>`;
        this.leaderboard.forEach(entry => {
            leaderboardHTML += `<p>${entry.name}: ${entry.score}</p>`;
        });

        document.getElementById("leaderboard").innerHTML = leaderboardHTML;
        document.getElementById("patient-info").innerHTML = `<h2>🎉 Time's Up! Final Score: ${this.score}</h2>`;
        document.getElementById("high-score").textContent = `High Score: ${this.highScore}`;

        // 🎵 Stop the music when the game ends
        this.music.pause();
        this.music.currentTime = 0;

        document.getElementById("player-input").style.display = "block";
    }
}

const game = new TriageGame();
window.game = game;
