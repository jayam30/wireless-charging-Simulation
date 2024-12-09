const scooter = document.getElementById("scooter");
const parkingZone = document.getElementById("parking-zone");
const statusText = document.getElementById("status");
let position = {
  x: window.innerWidth / 3.65, // Center horizontally
  y: window.innerHeight - 300,  // Near the bottom
};

// Preload the charging image
const chargingImage = new Image();
chargingImage.src = "charging.jpg"; // Replace with the correct path to your image


// Update scooter's position on the screen
const updatePosition = () => {
  // Keep the scooter within screen boundaries
  position.x = Math.max(0, Math.min(window.innerWidth - scooter.offsetWidth, position.x));
  position.y = Math.max(0, Math.min(window.innerHeight - scooter.offsetHeight, position.y));

  scooter.style.transform = `translate(${position.x}px, ${position.y}px)`;
};

// Check if the scooter overlaps with the black box (parking zone)
const checkParking = () => {
  const scooterRect = scooter.getBoundingClientRect();
  const parkingRect = parkingZone.getBoundingClientRect();

  // Check if the rectangles overlap
  const isOverlapping =
    scooterRect.left < parkingRect.right &&
    scooterRect.right > parkingRect.left &&
    scooterRect.top < parkingRect.bottom &&
    scooterRect.bottom > parkingRect.top;

  if (isOverlapping) {
    statusText.textContent = "Parked: Initializing Charging...";

    setTimeout(() => {
      document.getElementById("simulation").style.opacity = 0;
      setTimeout(() => {
        document.body.innerHTML = `
          <div id="charging-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: black; height: 100vh;">
            <h2 style="color: white; margin-bottom: 20px;">Charging in Progress</h2>
            <div class="progress-circle">
              <div class="circle">
                <div class="inside-circle">
                  <span id="percentage">0%</span>
                </div>
              </div>
            </div>
            <div style="margin-top: 30px;">
              <img src="${chargingImage.src}" alt="Charging in Progress" style="width: 500px; height: 500px; animation: fadeIn 1s ease-in-out;">
            </div>
          </div>
          <style>
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .progress-circle {
              width: 150px;
              height: 150px;
              position: relative;
            }
            .circle {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: conic-gradient(gray 0deg, gray 360deg);
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .inside-circle {
              width: 80%;
              height: 80%;
              border-radius: 50%;
              background: #000;
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              color: white;
              font-size: 1.5rem;
              font-weight: bold;
            }
          </style>
        `;
        startChargingProgress();
      }, 1000);
    }, 1000);
  }
};

// Start the charging progress animation
const startChargingProgress = () => {
  let percentage = 0;
  const percentageText = document.getElementById("percentage");
  const circle = document.querySelector(".circle");

  const interval = setInterval(() => {
    if (percentage < 100) {
      percentage++;
      const angle = (percentage / 100) * 360;
      circle.style.background = `conic-gradient(green 0deg, green ${angle}deg, gray ${angle}deg)`;
      percentageText.textContent = `${percentage}%`;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        document.body.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background-color: black; color: white;">
            <h1>Charging Complete!</h1>
            <p>You can now unplug and start riding again.</p>
          </div>
        `;
      }, 5000);
    }
  }, 3000); // Increase by 1% every 3 seconds
};

// Handle keyboard events
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      position.y -= 10;
      break;
    case "ArrowDown":
      position.y += 10;
      break;
    case "ArrowLeft":
      position.x -= 10;
      break;
    case "ArrowRight":
      position.x += 10;
      break;
  }
  updatePosition();
  checkParking();
});

// Handle button clicks
document.getElementById("up").addEventListener("click", () => {
  position.y -= 10;
  updatePosition();
  checkParking();
});
document.getElementById("down").addEventListener("click", () => {
  position.y += 10;
  updatePosition();
  checkParking();
});
document.getElementById("left").addEventListener("click", () => {
  position.x -= 10;
  updatePosition();
  checkParking();
});
document.getElementById("right").addEventListener("click", () => {
  position.x += 10;
  updatePosition();
  checkParking();
});

// Set initial position
window.addEventListener("load", () => {
  updatePosition();
});
