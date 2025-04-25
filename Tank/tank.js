// tank.js

let player = null; // Текущий игрок (green или red)
const tanks = {
    green: { x: 100, y: 100, angle: 0, element: document.getElementById('greenTank') },
    red: { x: 100, y: 200, angle: 0, element: document.getElementById('redTank') }
};

// Подключение к серверу WebSocket
const ws = new WebSocket('ws://localhost:80');

ws.onopen = () => {
    console.log('WebSocket connection established.');
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received:', data);

    // Обновление позиции танков
    if (data.type === 'update') {
        updateTankPosition(data.player, data.x, data.y, data.angle);
    }

    // Назначение игрока
    if (data.type === 'assign') {
        player = data.player;
        console.log(`You are ${player} tank.`);
    }

    // Обработка ошибок
    if (data.type === 'error') {
        console.error('Error:', data.message);
    }
};

// Обновление позиции танка
function updateTankPosition(player, x, y, angle) {
    const tank = tanks[player];
    tank.x = x;
    tank.y = y;
    tank.angle = angle;

    tank.element.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
}

// Инициализация управления
window.onload = () => {
    document.addEventListener('keydown', (event) => handleKeyPress(event));
};

// Обработка нажатия клавиш
function handleKeyPress(event) {
    if (!player) return;

    const tank = tanks[player];
    const step = 5;

    switch (event.key) {
        case 'ArrowUp': // Движение вперед
            tank.y -= step;
            break;
        case 'ArrowDown': // Движение назад
            tank.y += step;
            break;
        case 'ArrowLeft': // Поворот влево
            tank.angle -= 5;
            break;
        case 'ArrowRight': // Поворот вправо
            tank.angle += 5;
            break;
    }

    // Ограничение движения танка внутри игрового поля
    const gameArea = document.querySelector('.game-area');
    const gameAreaRect = gameArea.getBoundingClientRect();

    tank.x = Math.max(gameAreaRect.left, Math.min(gameAreaRect.left + gameAreaRect.width - 50, tank.x));
    tank.y = Math.max(0, Math.min(gameAreaRect.height - 50, tank.y));

    // Отправка новых координат на сервер
    ws.send(JSON.stringify({
        type: 'move',
        player: player,
        x: tank.x,
        y: tank.y,
        angle: tank.angle
    }));

    updateTankPosition(player, tank.x, tank.y, tank.angle);
}