<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>RAMP Triage Training Game</title>
    <style>
        /* Background Image with Opacity Effect */
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            text-align: center;
            font-family: Arial, sans-serif;
            background: url('background.jpg') no-repeat center center fixed;
            background-size: cover;
            position: relative;
            color: white;
            overflow: hidden;
        }

        /* Overlay to Reduce Brightness */
        body::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1); /* 10% opacity black overlay */
            z-index: -1; /* Sends the overlay behind content */
        }

        /* Game Container */
        #game-container {
            background: rgba(0, 0, 0, 0.7); /* Dark transparent background */
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            width: 50%;
            position: relative;
        }

        /* Style patient info */
        #patient-info {
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            color: black;
        }

        /* Triage Buttons */
        .triage-button {
            font-size: 18px;
            padding: 12px 24px;
            margin: 10px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.3s;
            font-weight: bold;
        }

        /* Button Colors */
        .red { background-color: red; color: white; }
        .yellow { background-color: yellow; color: black; }
        .green { background-color: green; color: white; }
        .black { background-color: black; color: white; }

        /* Hover Effect */
        .triage-button:hover {
            opacity: 0.8;
            transform: scale(1.05);
        }

    </style>
</head>
<body>
    <div id="game-container">
        <h1>🚑 RAMP Triage Training Game</h1>
        
        <!-- Display Patient Information -->
        <div id="patient-info"></div>

        <!-- Triage Buttons -->
        <h2>Select the Correct Triage Category</h2>
        <button class="triage-button red" onclick="game.triage('Red')">🔴 Red (Immediate)</button>
        <button class="triage-button yellow" onclick="game.triage('Yellow')">🟡 Yellow (Delayed)</button>
        <button class="triage-button green" onclick="game.triage('Green')">🟢 Green (Minimal)</button>
        <button class="triage-button black" onclick="game.triage('Black')">⚫ Black (Expectant)</button>
    </div>

    <!-- Load JavaScript File -->
    <script src="game.js"></script>
</body>
</html>

const game = new TriageGame();
game.displayPatient();
