const scooter = document.getElementById('scooter');
const parkingZone = document.getElementById('parking-zone');
const statusText = document.getElementById('status');
let position = { x: 0, y: 0 };

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

// Check if the scooter is in the parking zone
const checkParking = () => {
  const scooterRect = scooter.getBoundingClientRect();
  const parkingRect = parkingZone.getBoundingClientRect();

  if (
    scooterRect.right > parkingRect.left &&
    scooterRect.left < parkingRect.right &&
    scooterRect.bottom > parkingRect.top &&
    scooterRect.top < parkingRect.bottom
  ) {
    statusText.textContent = 'Parked: Initializing Charging...';
    setTimeout(() => {
      document.getElementById('simulation').style.opacity = 0;
      setTimeout(() => {
        document.body.innerHTML = `
          <div id="box" style="display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: black">
            <h2> Charging </h2>
            </div>
            <div id="charging" style="
              width: 100%; 
              height: 40%; 
              display: flex;
              flex-direction: column;
              align-items: center; 
              justify-content: center; 
              background-color: black; 
              animation: fadeIn 1s ease-in-out;">
              <img src="${chargingImage.src}" alt="Charging in Progress" style="width: 600px; height: 
              500px;">
            </div>
          <style>
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          </style>
        `;
      }, 1000);
    }, 1000);
  }
};

// Handle keyboard events
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      position.y -= 10;
      break;
    case 'ArrowDown':
      position.y += 10;
      break;
    case 'ArrowLeft':
      position.x -= 10;
      break;
    case 'ArrowRight':
      position.x += 10;
      break;
  }
  updatePosition();
  checkParking();
});

// Handle button clicks
document.getElementById('up').addEventListener('click', () => {
  position.y -= 10;
  updatePosition();
  checkParking();
});
document.getElementById('down').addEventListener('click', () => {
  position.y += 10;
  updatePosition();
  checkParking();
});
document.getElementById('left').addEventListener('click', () => {
  position.x -= 10;
  updatePosition();
  checkParking();
});
document.getElementById('right').addEventListener('click', () => {
  position.x += 10;
  updatePosition();
  checkParking();
});
