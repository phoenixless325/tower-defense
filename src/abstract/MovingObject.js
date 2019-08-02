import StaticObject from './StaticObject';

class MovingObject extends StaticObject{
    _speed;
    constructor({ x, y, width, height, imagePath, angle, speed }){
        super({ x, y, width, height, imagePath, angle });
        this._speed = speed;
    }

    get speed(){
        return this._speed;
    }

    moveTo(staticObject, speed = this._speed) {
        let toPlayerX = staticObject.coordinates.x - this._x;
        let toPlayerY = staticObject.coordinates.y - this._y;

        let toPlayerLength = Math.sqrt(toPlayerX * toPlayerX + toPlayerY * toPlayerY);
        toPlayerX = toPlayerX / toPlayerLength;
        toPlayerY = toPlayerY / toPlayerLength;

        this._x += toPlayerX * speed;
        this._y += toPlayerY * speed;

        this._angle = Math.atan2(toPlayerY, toPlayerX) / Math.PI * 180;
    }
    moveFrom(staticObject, speed = this._speed) {
        let toPlayerX = staticObject.coordinates.x - this._x;
        let toPlayerY = staticObject.coordinates.y - this._y;

        let toPlayerLength = Math.sqrt(toPlayerX * toPlayerX + toPlayerY * toPlayerY);
        toPlayerX = toPlayerX / toPlayerLength;
        toPlayerY = toPlayerY / toPlayerLength;

        this._x -= toPlayerX * speed;
        this._y -= toPlayerY * speed;

        this._angle = Math.atan2(toPlayerY, toPlayerX) / Math.PI * 180;
    }
}

export default MovingObject;