import StaticObject from '../abstract/StaticObject';

class Tower extends StaticObject{
    _damageRadius;
    _ray;

    constructor({ x = 0, y = 0, width = 10, height = 10, imagePath, angle, damageRadius }){
        super({ x, y, width, height, imagePath, angle });
        this._damageRadius = parseInt(damageRadius);
    }

    findEnemies(enemies){
        return enemies.filter(enemy => !enemy.died && Math.sqrt((enemy.coordinates.x - this._x) * (enemy.coordinates.x - this._x) + (enemy.coordinates.y - this._y) * (enemy.coordinates.y - this._y)) < this._damageRadius);
    }

    get towerRange(){
        return this._damageRadius;
    }

    fire(enemy){
        return new Promise((resolve, reject) => {
            this._ray = {
                dist: {
                    x: enemy.coordinates.x,
                    y: enemy.coordinates.y
                }
            };
            setTimeout(() => {
                this._ray = null;
                enemy.die();
                resolve();
            }, 1000);
        })
    }

    draw(canvas){
        canvas.beginPath();
        canvas.arc(this._x, this._y, this._damageRadius, 0, 2 * Math.PI, false);
        canvas.fillStyle = 'rgba(255, 0, 0, 0.1)';
        canvas.fill();
        canvas.lineWidth = 2;
        canvas.strokeStyle = 'rgba(255, 0, 0, 0.2)';
        canvas.stroke();

        if(this._ray){
            canvas.strokeStyle = 'rgb(255, 0, 0)';
            canvas.beginPath();
            canvas.moveTo(this._x, this._y);
            canvas.lineTo(this._ray.dist.x, this._ray.dist.y);
            canvas.stroke();
        }

        super.draw(canvas);
    }
}

export default Tower;