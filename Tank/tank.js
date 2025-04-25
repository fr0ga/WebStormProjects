// tank.js

// Переменные для управления танками
let player = null; // Текущий игрок (green или red)
const tanks = {
    green: { x: 100, y: 100, angle: 0, element: document.getElementById('greenTank') },
    red: { x: 300, y: 300, angle: 0, element: document.getElementById('redTank') }
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

// Обработка изменения позиции танка
function updateTankPosition(player, x, y, angle) {
    const tank = tanks[player];
    tank.x = x;
    tank.y = y;
    tank.angle = angle;

    const transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
    tank.element.style.transform = transform;
}

// Инициализация управления
window.onload = () => {
    document.addEventListener('keydown', (event) => handleKeyPress(event));
};

// Обработка нажатия клавиш
function handleKeyPress(event) {
    if (!player) return;

    const tank = tanks[player];
    const speed = 5;

    switch (event.key) {
        case 'ArrowUp': // Движение вперед
            tank.y -= speed;
            break;
        case 'ArrowDown': // Движение назад
            tank.y += speed;
            break;
        case 'ArrowLeft': // Поворот влево
            tank.angle -= 5;
            break;
        case 'ArrowRight': // Поворот вправо
            tank.angle += 5;
            break;
    }

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