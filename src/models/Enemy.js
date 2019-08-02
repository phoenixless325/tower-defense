import MovingObject from '../abstract/MovingObject';

class Enemy extends MovingObject{
    _name;
    _distance;
    _die = false;
    constructor({ x = 0, y = 0, width = 10, height = 10, imagePath, angle, name = 'Monster', speed = 10, distance }){
        super({ x, y, width, height, imagePath, angle, speed });
        this._name = name;
        this._distance = distance;
    }

    set distance(val){
        if(typeof val !== 'number')
            throw new TypeError('distance value must be number type');
        this._distance = val;
    }
    get distance(){
        return this._distance;
    }
    get died(){
        return this._die;
    }

    moveTo(staticObject, speed = this._speed){
        if(this._distance <= 0){
            this._x = staticObject.coordinates.x;
            this._y = staticObject.coordinates.y;
        } else
            super.moveTo(staticObject, speed)


    }
    draw(canvas) {
        if(!this._die)
            super.draw(canvas);
    }

    die(){
        this._die = true;
    }
}

export default Enemy;