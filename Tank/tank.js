const tank = document.getElementById('tank');
const gameArea = document.querySelector('.game-area');
let tankPosition = { x: 100, y: 100 };
let tankAngle = 0;

// Установка начальной позиции танка
tank.style.left = `${tankPosition.x}px`;
tank.style.top = `${tankPosition.y}px`;

document.addEventListener('keydown', (e) => {
    const step = 5; // шаг движения вперед/назад
    const turnStep = 5; // шаг поворота (градусы)

    switch (e.code) {
        case 'ArrowUp':
            // Движение вперед
            tankPosition.x += step * Math.cos((tankAngle * Math.PI) / 180);
            tankPosition.y += step * Math.sin((tankAngle * Math.PI) / 180);
            break;
        case 'ArrowDown':
            // Движение назад
            tankPosition.x -= step * Math.cos((tankAngle * Math.PI) / 180);
            tankPosition.y -= step * Math.sin((tankAngle * Math.PI) / 180);
            break;
        case 'ArrowLeft':
            // Поворот против часовой стрелки
            tankAngle -= turnStep;
            break;
        case 'ArrowRight':
            // Поворот по часовой стрелке
            tankAngle += turnStep;
            break;
    }

    // Ограничение движения танка внутри игровой зоны
    tankPosition.x = Math.max(0, Math.min(gameArea.offsetWidth - tank.getBoundingClientRect().width, tankPosition.x));
    tankPosition.y = Math.max(0, Math.min(gameArea.offsetHeight - tank.getBoundingClientRect().height, tankPosition.y));

    // Обновление позиции и угла танка
    tank.style.left = `${tankPosition.x}px`;
    tank.style.top = `${tankPosition.y}px`;
    tank.style.transform = `rotate(${tankAngle}deg)`;
});