startGame() {
    let playerName = document.getElementById("player-name").value.trim();
    
    // Ensure a name is entered before starting the game
    if (!playerName) {
        alert("Please enter your name before starting!");
        return;
    }

    this.score = 0;
    this.timer = 30;
    this.currentPatientIndex = 0;
    
    // Hide the name input and start button after starting
    document.getElementById("player-input").style.display = "none";

    // Reset UI elements
    document.getElementById("timer").textContent = `Time Left: ${this.timer}s`;
    document.getElementById("score").textContent = `Score: ${this.score}`;
    document.getElementById("high-score").textContent = `High Score: ${this.highScore}`;
    
    // Start the game mechanics
    this.startTimer();
    this.displayPatient();
}
