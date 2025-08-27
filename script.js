console.log('Jump!');

// Henter id fra HTML
let canvas = document.querySelector('#canvas');

let context;
context = canvas.getContext('2d');

// Velger størrelse på canvas med 400px
canvas.width = 400;
canvas.height = 400;

// Startposisjon til spilleren
let playerX = 0;
let playerY = 375;

// Brukeren sin bevegelse
let velocityX = 0;
let velocityY = 0;

// Hinder object
let obstacleX = 0;
let obstacleY = 0;
let obstacleSize = 25;
let obstacleSpeed = 5;
let obstaclesArray = [];

// Oppdateringshastighet og hopp
let updateSpeed = 20;
let jumpSpeed = 5;

// Unngå dobbelthopp
let isJumping = false;

// Bruker counting for å begrense høyden
let counting = 0;

// Oppdaterer spillet ved bruk av setInterval
let gameUpdating = setInterval(update, updateSpeed);

function update() {
  // Gjør malekosten svart
  context.fillStyle = 'black';
  // Fyller inn canvas
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Endring av posisjonen til spiller hver gang den oppdateres
  playerX += velocityX;
  playerY += velocityY;

  // Endrer kosten til rød
  context.fillStyle = 'red';
  // Lager et kvadrat nede til høyre som blir spilleren
  context.fillRect(playerX, playerY, 25, 25);

  // Obstacles bevegelse
  if (obstaclesArray.length > 0) {
    for (let i = 0; i < obstaclesArray.length; i++) {
      obstaclesArray[i][0] -= obstacleSpeed

      // Endrer penselen til gul 
      context.fillStyle = "yellow"
      context.fillRect(obstaclesArray[i][0], obstaclesArray[i][1], obstacleSize, obstacleSize)
      console.log(obstaclesArray[i])
      // Hvis den obstacle er utenfor rekkevidde fjernes den
      if (obstaclesArray[i][0] < -50) {
        obstaclesArray.splice(i,1);
        i--;
      }
      // Hvis obstaclesArray x og y rører spiller vises game over.
      if (obstaclesArray[i][0] >= playerX && obstaclesArray[i][0] <= (playerX + 25) 
      && obstaclesArray[i][1] >= playerY && obstaclesArray[i][1] <= (playerY + 25)) {
        console.log("Game Over!")
        clearInterval(gameUpdating)
        setTimeout(() => {
          location.reload();
        }, 2000);
        }

      }
  }
}

// Lager eventlistener hvor en knapp er trykket kjører funksjonen jump
document.addEventListener('keydown', jump);

// Jump funksjon med en e som kalles event
function jump(e) {
  if (e.code === 'ArrowUp' && !isJumping) {
    // Endrer isjumping til true for å unngå dobbelthopp
    isJumping = true;

    // Lager interval som teller opp counting og gjør jumpspeed negativ
    let timerID = setInterval(() => {
      velocityY = -jumpSpeed;
      counting += 1;

      // Når counting har telt til 15 skal den komme ned igjen
      if (counting === 20) {
        clearInterval(timerID);

        velocityY = 0;
        // Her faller boksen igjen
        let fallingTimerID = setInterval(() => {
          velocityY = +jumpSpeed;
          counting -= 1;
          // Resetter når counting = 0 og gjør isJumping til false igjen
          if (counting === 0) {
            clearInterval(fallingTimerID);
            velocityY = 0;
            isJumping = false;
          }
        }, updateSpeed);
      }
    }, updateSpeed);
  }
}

// Pusher arrayen ut til html
function createObstacle() {
  obstaclesArray.push([canvas.width, (canvas.height - obstacleSize)])
  console.log(obstaclesArray[0][0])
}

// Kaller på funksjonen i intervall
setInterval(createObstacle, 2000);