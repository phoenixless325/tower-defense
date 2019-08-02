class StaticObject{
    _x;
    _y;
    _width;
    _height;
    _image;
    _angle;

    constructor({ x, y, width, height, imagePath, angle }){
        if(!imagePath || typeof imagePath !== 'string')
            throw new TypeError('imagePath is required and must be a String type');

        if (new.target === StaticObject)
            throw new TypeError('Cannot construct object instances directly');

        this._width = Math.abs(parseInt(width));
        this._height = Math.abs(parseInt(height));
        this._x = Math.abs(parseInt(x));
        this._y = Math.abs(parseInt(y));
        this._angle = parseInt(angle);

        this._image = new Image();
        this._image.src = imagePath;
    }

    get coordinates() {
        return {
            x: this._x,
            y: this._y
        };
    }
    get size(){
        return {
            width: this._width,
            height: this._height
        }
    }
    get angle(){
        return this._angle;
    }

    set angle(val){
        if(typeof val !== 'number')
            throw new TypeError('angle must be number type');
        this._angle = val;
    }

    draw(canvas){
        canvas.translate(this._x, this._y);
        canvas.rotate(this._angle * Math.PI / 180);
        canvas.drawImage(this._image, -(this._width / 2), -(this._height), this._width, this._height);
        canvas.rotate(-this._angle * Math.PI / 180);
        canvas.translate(-this._x, -this._y);
    }
}

export default StaticObject;