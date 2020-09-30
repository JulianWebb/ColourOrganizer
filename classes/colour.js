class Colour {
    constructor(x, y, { red, green, blue }) {
        this.x      = x;
        this.y      = y;
        this.red    = red;
        this.green  = green;
        this.blue   = blue;
    }
    get hex() {
        return `${this.red}${this.green}${this.blue}`;
    }
}

module.exports = Colour;