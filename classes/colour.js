class Colour {
    constructor(x, y, { red, green, blue }) {
        this.x  = x;
        this.y  = y;
        this.redInt     = red;
        this.greenInt   = green;
        this.blueInt    = blue
    }
    get hex() { return `${this.red}${this.green}${this.blue}`; }
    
    get highest() {
        let high = Math.max(this.redInt, this.greenInt, this.blueInt);
        if (high == this.redInt) return 0;
        if (high == this.greenInt) return 1;
        if (high == this.blueInt) return 2;
        
    }

    get red()   { return this.redInt.toString(16).padStart(2, '0');   }
    get green() { return this.greenInt.toString(16).padStart(2, '0'); }
    get blue()  { return this.blueInt.toString(16).padStart(2, '0');  }

    get colours()    { return [this.red, this.green, this.blue]; }
    get coloursInt() { return [this.redInt, this.greenInt, this.blueInt]; }
}

module.exports = Colour;