import TowerDefense from './TowerDefense';

document.addEventListener('DOMContentLoaded', () => {
    window.towerDefense = new TowerDefense({
        canvasId: 'towerDefense',
        towerRange: 200,
        enemiesDescription: [
            {
                distance: 250,
                speed: 90
            },
            {
                distance: 200,
                speed: 90
            },
            {
                distance: 300,
                speed: 80
            },
            {
                distance: 300,
                speed: 150
            }
        ]
    });

    towerDefense.setBackgroundTexture('/src/assets/grass.jpeg');
    towerDefense.startGameLoop();

    let game = setInterval(() => {
        if(towerDefense.gameOver)
            clearInterval(game);
        else
            towerDefense.step();
    }, 3000);
});


