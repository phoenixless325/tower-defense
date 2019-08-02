import Tower from './models/Tower';
import Enemy from './models/Enemy';

const STEP_TIME = 3000;

class TowerDefense {
    _canvas;
    _context;
    _gameLoop;
    _monsters = [];
    _tower;
    _canvasHeight;
    _canvasWidth;
    _stepCount = 0;
    _gameOver = false;
    _enemiesDescriptions;

    constructor({ canvasId, enemiesDescription, towerRange}) {
        this._canvas = document.getElementById(canvasId);
        this._context = this._canvas.getContext('2d');
        this._context.imageSmoothingEnabled = false;
        this._enemiesDescriptions = enemiesDescription;

        // console.log(this.simulateGame(towerRange));

        this._canvasHeight = window.outerHeight;
        this._canvasWidth = window.outerWidth;

        this._tower = new Tower({
            x: this._canvasWidth / 2,
            y: this._canvasHeight / 2,
            width: 30,
            height: 30,
            imagePath: '/src/assets/tower.svg',
            damageRadius: towerRange
        });

        this._monsters = enemiesDescription.reduce((acc, val) => {
            let enemy = new Enemy({
                x: this._canvasWidth / 2,
                y: this._canvasHeight / 2,
                width: 28,
                height: 36,
                imagePath: '/src/assets/monster.png',
                speed: val.speed,
                distance: val.distance
            });
            enemy.moveTo({
                    coordinates: {
                        x: Math.random() * this._canvasWidth,
                        y: Math.random() * this._canvasHeight
                    }
                },
                val.distance);
            enemy.angle += 180;
            acc[acc.length] = enemy;
            return acc;
        }, []);
    }

    get monsters() {
        return this._monsters;
    }

    get tower() {
        return this._tower;
    }

    static StepTime(){
        return STEP_TIME;
    }
    get gameOver(){
        return this._gameOver;
    }

    setBackgroundTexture(texturePath) {
        this._canvas.style.background = `url(${texturePath})`;
        this._canvas.setAttribute('width', this._canvasWidth);
        this._canvas.setAttribute('height', this._canvasHeight);
    }
    step(){
        return new Promise((resolve, reject) => {
            if(!this._gameLoop)
                return reject(new Error('Game Loop is not active'));
            this._stepCount++;
            let nearEnemies = this._tower.findEnemies(this._monsters);
            if(nearEnemies.length)
                this._tower.fire(nearEnemies[parseInt(Math.random() * nearEnemies.length)])
                    .then(() => {
                        for(let index in this._monsters)
                            if(this._monsters[index].died)
                                this._monsters.splice(index, 1);

                        if(!this._monsters.length)
                            this.win();
                    })
                    .catch(console.error);


            for(let index in this._monsters)
                if(this._monsters[index].died)
                    this._monsters.splice(index, 1);

            if(!this._monsters.length)
                this.win();


            setTimeout(() => {
                for (let index in this._monsters){
                    this._monsters[index].distance -= this._monsters[index].speed;
                    this._monsters[index].moveTo(this._tower);
                }

                if(this._monsters.find(monster => monster.distance <= 0))
                    return resolve(this.lose());

                resolve();
            }, 1000);
        });
    }

    win() {
        this.stop();
        this._gameOver = true;
        this._context.font = "50px Arial";
        this._context.fillStyle = "red";
        this._context.textAlign = "center";
        this._context.fillText(`Chiki Briki i v Damki (${this._stepCount} steps)`, this._canvasWidth / 2, this._canvasHeight / 2);
    }

    lose() {
        this.stop();
        // const minRangeToWin = simulateGame(this.tower.towerRange, this._enemiesDescriptions); TODO
        this._gameOver = true;
        this._context.font = "50px Arial";
        this._context.fillStyle = "red";
        this._context.textAlign = "center";
        this._context.fillText('GAME OVER!!!', this._canvasWidth / 2, this._canvasHeight / 2);
    }

    startGameLoop() {
        this._gameLoop = setInterval(() => {
            this._context.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
            this._tower.draw(this._context);
            for (let index in this._monsters)
                this._monsters[index].draw(this._context);
        }, 1000 / 60);
    }

    stop() {
        clearInterval(this._gameLoop);
        this._gameLoop = null;
    }

    simulateGame(towerRange) {
        let enemies = this._enemiesDescriptions.reduce((acc, val) => acc.concat({ ...val }), []).sort((a, b) => a.distance - b.distance),
            maxDistance = enemies[enemies.length - 1].distance;
        console.log('START', enemies, this._enemiesDescriptions);
        while(true) {
            for (let index in enemies)
                if (enemies[index].distance <= towerRange) {
                    enemies.splice(index, 1);
                    break;
                }

            if(!enemies.length)
                return towerRange;

            for (let index in enemies){
                enemies[index].distance -= enemies[index].speed;
                if(enemies[index].distance <= 0) {
                    console.log('END', enemies);
                    return towerRange > maxDistance ? -1 : this.simulateGame(++towerRange);
                }
            }
        }
    };
}


export default TowerDefense;