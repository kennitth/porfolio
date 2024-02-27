const player = document.getElementById('player');
const spike1 = document.getElementById('spike1');
const spike2 = document.getElementById('spike2');
const scoreElement = document.getElementById('score');
const levelMeter = document.getElementById('level-meter');
const healthMeter = document.getElementById('health-meter');

let playerPosition = 0;
let isJumping = false;
let isMovingLeft = false;
let isMovingRight = false;

let spike1Position = 0;
let spike2Position = 300; // Initial position on the opposite side
let spikeSpeed = 2;
let score = 0;
let level = 1; // Initialize the level
let health = 100; // Initialize player health

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyRelease);

function handleKeyPress(event) {
    if (event.code === 'Space' && !isJumping) {
        isJumping = true;
        jumpUp();
    } else if (event.code === 'ArrowLeft' && !isMovingRight) {
        isMovingLeft = true;
        moveLeft();
    } else if (event.code === 'ArrowRight' && !isMovingLeft) {
        isMovingRight = true;
        moveRight();
    } else if (event.code === 'KeyD') {
        dash();
    }
}

function handleKeyRelease(event) {
    if (event.code === 'ArrowLeft') {
        isMovingLeft = false;
    } else if (event.code === 'ArrowRight') {
        isMovingRight = false;
    }
}

function jumpUp() {
    let jumpHeight = 100;
    let jumpInterval = setInterval(() => {
        if (jumpHeight <= 0) {
            clearInterval(jumpInterval);
            jumpDown();
        } else {
            playerPosition += 5;
            jumpHeight -= 5;
            updatePlayerPosition();
        }
    }, 20);
}

function jumpDown() {
    let fallInterval = setInterval(() => {
        if (playerPosition > 0) {
            playerPosition -= 5;
            updatePlayerPosition();
        } else {
            isJumping = false;
            clearInterval(fallInterval);
        }
    }, 20);
}

function moveLeft() {
    if (!isMovingLeft) return;
    let moveLeftInterval = setInterval(() => {
        if (player.offsetLeft > 0 && isMovingLeft) {
            player.style.left = player.offsetLeft - 5 + 'px';
        } else {
            clearInterval(moveLeftInterval);
        }
    }, 20);
}

function moveRight() {
    if (!isMovingRight) return;
    let moveRightInterval = setInterval(() => {
        if (player.offsetLeft < (600 - player.offsetWidth) && isMovingRight) {
            player.style.left = player.offsetLeft + 5 + 'px';
        } else {
            clearInterval(moveRightInterval);
        }
    }, 20);
}

function dash() {
    let dashDistance = 50;
    let dashSpeed = 10;

    if (isMovingLeft) {
        let dashLeftInterval = setInterval(() => {
            if (player.offsetLeft > 0 && dashDistance > 0) {
                player.style.left = player.offsetLeft - dashSpeed + 'px';
                dashDistance -= dashSpeed;
            } else {
                clearInterval(dashLeftInterval);
            }
        }, 20);
    } else if (isMovingRight) {
        let dashRightInterval = setInterval(() => {
            if (player.offsetLeft < (600 - player.offsetWidth) && dashDistance > 0) {
                player.style.left = player.offsetLeft + dashSpeed + 'px';
                dashDistance -= dashSpeed;
            } else {
                clearInterval(dashRightInterval);
            }
        }, 20);
    }
}

function updatePlayerPosition() {
    player.style.bottom = playerPosition + 'px';
}

function updateSpikePositions() {
    spike1Position += spikeSpeed + level; // Increase spike speed based on the level
    spike2Position -= spikeSpeed + level;

    if (spike1Position >= 600) {
        spike1Position = 0;
        score++;

        if (score % 10 === 0) {
            levelUp();
        }
    }

    if (spike2Position <= 0) {
        spike2Position = 600;
        score++;

        if (score % 10 === 0) {
            levelUp();
        }
    }

    spike1.style.left = spike1Position + 'px';
    spike2.style.left = spike2Position + 'px';

    checkCollision();
}

function levelUp() {
    level++;
    updateLevelMeter();
}

function updateLevelMeter() {
    levelMeter.textContent = 'Level: ' + level;
}

function checkCollision() {
    // Check collision with spikes
    if (
        playerPosition <= 30 &&
        playerPosition >= 0 &&
        ((player.offsetLeft >= spike1.offsetLeft && player.offsetLeft <= spike1.offsetLeft + 30) ||
        (player.offsetLeft + 50 >= spike1.offsetLeft && player.offsetLeft + 50 <= spike1.offsetLeft + 30))
    ) {
        reduceHealth();
    }

    if (
        playerPosition <= 30 &&
        playerPosition >= 0 &&
        ((player.offsetLeft >= spike2.offsetLeft && player.offsetLeft <= spike2.offsetLeft + 30) ||
        (player.offsetLeft + 50 >= spike2.offsetLeft && player.offsetLeft + 50 <= spike2.offsetLeft + 30))
    ) {
        reduceHealth();
    }

    updateScore();
    updateHealthMeter();
}

function reduceHealth() {
    health -= 10; // Reduce health by 10 on collision
    if (health <= 0) {
        endGame();
    }
}

function updateHealthMeter() {
    healthMeter.textContent = 'Health: ' + health + '%';
}

function updateScore() {
    scoreElement.textContent = 'Score: ' + score;
}

function endGame() {
    alert('Game Over! You ran out of health.');
    location.reload(); // Reload the page to restart the game
}

// Update spike positions every 20 milliseconds
setInterval(updateSpikePositions, 20);
